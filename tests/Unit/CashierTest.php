<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Modules\Main\Services\Cashier\Plan;
use Modules\Main\Services\Cashier\Subscription;
use Modules\Users\Entities\User;
use Tests\TestCase;

class CashierTest extends TestCase
{
    use DatabaseTransactions;

    public function testNewUserSubscription()
    {
        [$user, $plan] = $this->subscribeUserOnPlan([
            'name' => 'free',
        ]);

        $this->assertTrue(
            $user->subscribed('main', $plan->id)
        );
    }

    public function testCancelUserSubscription()
    {
        [$user, $plan] = $this->subscribeUserOnPlan([
            'name' => 'free',
            'cost' => 0,
        ]);

        /** @var Subscription $subscription */
        $subscription = $user->subscription('main', $plan->id)->cancel();

        $this->assertTrue(
            $subscription->cancelled()
        );
    }

    public function testResumeUserSubscription()
    {
        [$user, $plan] = $this->subscribeUserOnPlan([
            'name' => 'free',
        ]);

        /** @var Subscription $subscription */
        $subscription = $user->subscription('main', $plan->id)->cancel();

        $this->assertTrue(
            $subscription->cancelled()
        );

        $subscription->resume();

        $this->assertTrue(
            $subscription->active()
        );
    }

//    public function testSwapUserSubscription()
//    {
//        [$user, $plan] = $this->subscribeUserOnPlan([
//            'name' => 'free',
//        ]);
//
//        $user->subscription('main', $plan->id)->swap(2);
//
//        dd($user->subscription('main', $plan->id));
//
//        $this->assertTrue(
//            $user->subscribed('main', 2)
//        );
//    }

    /**
     * Potential trait method
     *
     * @param array $options
     * @return array
     */
    public function subscribeUserOnPlan(array $options)
    {
        $user = factory(User::class)->create();

        $plan = Plan::where('name', $options['name'])->first();

        $user->newSubscription('main', $plan->id)
            ->create();

        return [$user, $plan];
    }
}
