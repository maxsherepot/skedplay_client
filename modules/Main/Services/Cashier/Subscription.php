<?php declare(strict_types=1);

namespace Modules\Main\Services\Cashier;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use LogicException;
use Modules\Main\Services\Cashier\Traits\Scopes;

class Subscription extends Model
{
    use Scopes;

    protected static function boot()
    {
        parent::boot();

        static::creating(function (Subscription $subscription) {
            $subscription->current_period_start = now();
            $subscription->current_period_end = now()->addMonth();
        });
    }

    /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
        'current_period_start',
        'current_period_end',
        'ends_at',
        'created_at',
        'updated_at',
    ];

    /**
     * Get the user that owns the subscription.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->owner();
    }

    /**
     * Get the model related to the subscription.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function owner()
    {
        $class = Cashier::billableModel();

        return $this->belongsTo($class, (new $class)->getForeignKey());
    }

    /**
     * Determine if the subscription is active, on trial, or within its grace period.
     *
     * @return bool
     */
    public function valid()
    {
        return $this->active() || $this->onGracePeriod();
    }

    /**
     * Determine if the subscription is active.
     *
     * @return bool
     */
    public function active()
    {
        return is_null($this->ends_at) || $this->onGracePeriod();
    }

    /**
     * Determine if the subscription is recurring and not on trial.
     *
     * @return bool
     */
    public function recurring()
    {
        return !$this->cancelled();
    }

    /**
     * Determine if the subscription is no longer active.
     *
     * @return bool
     */
    public function cancelled()
    {
        return !is_null($this->ends_at);
    }

    /**
     * Determine if the subscription has ended and the grace period has expired.
     *
     * @return bool
     */
    public function ended()
    {
        return $this->cancelled() && !$this->onGracePeriod();
    }

    /**
     * Determine if the subscription is within its grace period after cancellation.
     *
     * @return bool
     */
    public function onGracePeriod()
    {
        return $this->ends_at && $this->ends_at->isFuture();
    }

    /**
     * Swap the subscription to a new Stripe plan.
     *
     * @param $plan_id
     * @return $this
     */
    public function swap($plan_id)
    {
        /**
         * Todo: Payment
         */

        /**
         * Todo:Create user invoice
         */
//        try {
//            $this->user->invoice(['subscription' => $subscription->id]);
//        } catch (StripeCard $exception) {
//            // When the payment for the plan swap fails, we continue to let the user swap to the
//            // new plan. This is because Stripe may attempt to retry the payment later on. If
//            // all attempts to collect payment fail, webhooks will handle any update to it.
//        }

        $this->fill([
            'cancel_at_period_end' => false,
            'plan_id'              => $plan_id,
            'ends_at'              => null,
        ])->save();

        return $this;
    }

    /**
     * Cancel the subscription at the end of the billing period.
     *
     * @return $this
     */
    public function cancel()
    {
        $this->cancel_at_period_end = true;

        $this->ends_at = $this->current_period_end;

        $this->save();

        return $this;
    }

    /**
     * Cancel the subscription immediately.
     *
     * @return $this
     */
    public function cancelNow()
    {
        $this->cancel();

        $this->markAsCancelled();

        return $this;
    }

    /**
     * Mark the subscription as cancelled.
     *
     * @return void
     */
    public function markAsCancelled()
    {
        $this->fill(['ends_at' => Carbon::now()])->save();
    }

    /**
     * Resume the cancelled subscription.
     *
     * @return $this
     * @throws \LogicException
     */
    public function resume()
    {
        /**
         * Todo: Payment
         */

        if (!$this->onGracePeriod()) {
            throw new LogicException('Unable to resume subscription that is not within grace period.');
        }

        $this->fill([
            'ends_at'              => null,
            'cancel_at_period_end' => false,
        ])->save();

        return $this;
    }
}
