<?php

namespace Modules\Main\Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Modules\Main\Services\Cashier\Plan;
use Modules\Users\Entities\User;
use Tests\TestCase;

class CashierTest extends TestCase
{
    use RefreshDatabase;

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
        $user = factory(User::class)->create();

        $plan = factory(Plan::class)->create([
            'name' => 'free',
            'cost' => 0
        ]);

        $user->newSubscription('main', $plan->id)
            ->create();

        $this->assertDatabaseHas('subscriptions', [
            'user_id' => $user->id,
            'plan_id' => $plan->id,
        ]);
    }
}
