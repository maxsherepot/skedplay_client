<?php

namespace Modules\Main\Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Modules\Main\Services\Cashier\Plan;
use Modules\Main\Services\Cashier\Subscription;
use Modules\Users\Entities\User;
use Tests\TestCase;

class CashierTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Create
     * Resume
     * Swap
     * Cancel
     */

    public function testCreatePlan()
    {
        $plan = factory(Plan::class)->create([
            'name' => 'free',
            'cost' => 0
        ]);

        $this->assertDatabaseHas('plans', [
            'id'   => $plan->id,
            'name' => $plan->name,
            'cost' => $plan->cost,
        ]);
    }

    public function testNewUserSubscription()
    {
        [$user, $plan] = $this->subscribeUserOnPlan([
            'name' => 'free',
            'cost' => 0,
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
        $subscription = $user->subscription('main')->cancel();

        $this->assertTrue(
            $subscription->cancelled()
        );
    }


    /**
     * Potential trait method
     *
     * @param array $options
     * @return array
     */
    public function subscribeUserOnPlan(array $options)
    {
        $user = factory(User::class)->create();

        $plan = factory(Plan::class)->create([
            'name' => $options['name'],
            'cost' => $options['cost']
        ]);

        $user->newSubscription('main', $plan->id)
            ->create();

        return [$user, $plan];
    }
}
