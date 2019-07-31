<?php

namespace Modules\Main\Services\Cashier;

use Carbon\Carbon;
use DateTimeInterface;

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
     * The date on which the billing cycle should be anchored.
     *
     * @var int|null
     */
    protected $billingCycleAnchor = null;

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
     * Specify the quantity of the subscription.
     *
     * @param int $quantity
     * @return $this
     */
    public function quantity($quantity)
    {
        $this->quantity = $quantity;

        return $this;
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
     * Change the billing cycle anchor on a plan creation.
     *
     * @param \DateTimeInterface|int $date
     * @return $this
     */
    public function anchorBillingCycleOn($date)
    {
        if ($date instanceof DateTimeInterface) {
            $date = $date->getTimestamp();
        }

        $this->billingCycleAnchor = $date;

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
     * Add a new Stripe subscription to the Stripe model.
     *
     * @param array $options
     * @return \Laravel\Cashier\Subscription
     */
    public function add()
    {
        return $this->create();
    }

    /**
     * Create a new subscription.
     *
     * @return \Laravel\Cashier\Subscription
     */
    public function create()
    {
        /**
         * Payment method
         */

        $params = [
            'amount' => 1,
            'returnUrl' => '/test2',
            'cancelUrl' => '/test3',
        ];

        $response = \Omnipay::purchase($params)->send();

        dd($response);
        if ($response->isSuccessful()) {
            // payment was successful: update database
            print_r($response);
        } elseif ($response->isRedirect()) {
            // redirect to offsite payment gateway
            return $response->getRedirectResponse();
        } else {
            // payment failed: display message to customer
            echo $response->getMessage();
        }

        if ($this->skipTrial) {
            $trialEndsAt = null;
        } else {
            $trialEndsAt = $this->trialExpires;
        }

        return $this->owner->subscriptions()->create([
            'name'          => $this->name,
            'plan_id'       => $this->plan_id,
            'quantity'      => $this->quantity,
            'trial_ends_at' => $trialEndsAt,
            'ends_at'       => null,
        ]);
    }

    /**
     * Build the payload for subscription creation.
     *
     * @return array
     */
    protected function buildPayload()
    {
        return array_filter([
            'billing_cycle_anchor' => $this->billingCycleAnchor,
            'coupon'               => $this->coupon,
            'plan_id'              => $this->plan_id,
            'quantity'             => $this->quantity,
            'trial_end'            => $this->getTrialEndForPayload(),
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
