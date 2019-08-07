<?php declare(strict_types=1);

namespace Modules\Main\Services\Cashier;

use Carbon\Carbon;

class SubscriptionBuilder
{
    /**
     * The model that is subscribing.
     *
     * @var \Illuminate\Database\Eloquent\Model
     */
    protected $owner;

    /**
     * The name of the subscription.
     *
     * @var string
     */
    protected $name;

    /**
     * The id of the plan being subscribed to.
     *
     * @var string
     */
    protected $plan_id;

    /**
     * The quantity of the subscription.
     *
     * @var int
     */
    protected $quantity = 1;

    /**
     * The date and time the trial will expire.
     *
     * @var \Carbon\Carbon|\Carbon\CarbonInterface
     */
    protected $trialExpires;

    /**
     * Indicates that the trial should end immediately.
     *
     * @var bool
     */
    protected $skipTrial = false;

    /**
     * The coupon code being applied to the customer.
     *
     * @var string|null
     */
    protected $coupon;

    /**
     * Create a new subscription builder instance.
     *
     * @param mixed $owner
     * @param string $name
     * @param string $plan_id
     * @return void
     */
    public function __construct($owner, $name, $plan_id)
    {
        $this->name = $name;
        $this->plan_id = $plan_id;
        $this->owner = $owner;
    }

    /**
     * Specify the number of days of the trial.
     *
     * @param int $trialDays
     * @return $this
     */
    public function trialDays($trialDays)
    {
        $this->trialExpires = Carbon::now()->addDays($trialDays);

        return $this;
    }

    /**
     * Specify the ending date of the trial.
     *
     * @param \Carbon\Carbon|\Carbon\CarbonInterface $trialUntil
     * @return $this
     */
    public function trialUntil($trialUntil)
    {
        $this->trialExpires = $trialUntil;

        return $this;
    }

    /**
     * Force the trial to end immediately.
     *
     * @return $this
     */
    public function skipTrial()
    {
        $this->skipTrial = true;

        return $this;
    }

    /**
     * The coupon to apply to a new subscription.
     *
     * @param string $coupon
     * @return $this
     */
    public function withCoupon($coupon)
    {
        $this->coupon = $coupon;

        return $this;
    }

    /**
     * Add a new Stripe subscription to the owner model.
     */
    public function add()
    {
        return $this->create();
    }

    /**
     * Create a new subscription.
     */
    public function create()
    {
        /**
         * Fake payment method
         */
        $payment = (new Omnipay())->purchase([]);

        if (!$payment) {
            return new \Exception('Payment not yet');
        }

        if ($this->skipTrial) {
            $trialEndsAt = null;
            $trialStart = null;
            $trialEnd = null;
        } else {
            $trialEndsAt = $this->trialExpires;
            $trialStart = now();
            $trialEnd = $trialEndsAt;
        }

        return $this->owner->subscriptions()->create([
            'name'          => $this->name,
            'plan_id'       => $this->plan_id,
            'trial_ends_at' => $trialEndsAt,
            'trial_end'     => $trialStart,
            'trial_start'   => $trialEnd,
            'ends_at'       => null,
        ]);
    }

    /**
     * Get the trial ending date for the Stripe payload.
     *
     * @return int|null
     */
    protected function getTrialEndForPayload()
    {
        if ($this->skipTrial) {
            return 'now';
        }

        if ($this->trialExpires) {
            return $this->trialExpires->getTimestamp();
        }
    }
}
