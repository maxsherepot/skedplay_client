<?php declare(strict_types=1);

namespace Modules\Main\Services\Cashier;

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

        return $this->owner->subscriptions()->create([
            'name'    => $this->name,
            'plan_id' => $this->plan_id,
            'ends_at' => null,
        ]);
    }
}
