<?php declare(strict_types=1);

namespace Modules\Billing\Traits;

use Modules\Billing\Entities\Subscription;
use Modules\Billing\Services\SubscriptionBuilder;

trait Billable
{
    /**
     * Begin creating a new subscription.
     *
     * @param string $subscription
     * @param string $plan
     * @return SubscriptionBuilder
     */
    public function newSubscription($subscription, $plan)
    {
        return new SubscriptionBuilder($this, $subscription, $plan);
    }

    /**
     * Determine if the Owner model has a given subscription.
     *
     * @param string $subscription
     * @param string|null $plan_id
     * @return bool
     */
    public function subscribed($subscription = 'default', $plan_id = null)
    {
        $subscription = $this->subscription($subscription);

        if (is_null($subscription)) {
            return false;
        }

        if (is_null($plan_id)) {
            return $subscription->valid();
        }

        return $subscription->valid() &&
            $subscription->plan_id === $plan_id;
    }

    /**
     * Get a subscription instance by name.
     *
     * @param string $subscription
     * @return \Laravel\Cashier\Subscription|null
     */
    public function subscription($subscription = 'default')
    {
        return $this->subscriptions->sortByDesc(function ($value) {
            return $value->created_at->getTimestamp();
        })->first(function ($value) use ($subscription) {
            return $value->name === $subscription;
        });
    }

    /**
     * Get all of the subscriptions for the model.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function subscriptions()
    {
        return $this->hasMany(Subscription::class, $this->getForeignKey())->orderBy('created_at', 'desc');
    }

    /**
     * Determine if the Owner model is actively subscribed to one of the given plans.
     *
     * @param array|string $plans
     * @param string $subscription
     * @return bool
     */
    public function subscribedToPlan($plans, $subscription = 'default')
    {
        $subscription = $this->subscription($subscription);

        if (!$subscription || !$subscription->valid()) {
            return false;
        }

        foreach ((array)$plans as $plan) {
            if ($subscription->stripe_plan === $plan) {
                return true;
            }
        }

        return false;
    }

    /**
     * Determine if the entity is on the given plan.
     *
     * @param string $plan
     * @return bool
     */
    public function onPlan($plan)
    {
        return !is_null($this->subscriptions->first(function ($value) use ($plan) {
            return $value->stripe_plan === $plan && $value->valid();
        }));
    }
}
