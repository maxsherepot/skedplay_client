<?php

namespace Modules\Billing\Database\Seeders;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use Modules\Billing\Entities\Plan;

class PlanTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $start = now();
        $this->command->info('Plan seeder started');

        $plans = [
            'start' => [
                'monthly' => true,
                'price' => 0,
            ],
            'personal' => [
                'monthly' => true,
                'price' => 170,
            ],
            'premium' => [
                'monthly' => true,
                'price' => 350,
            ],
        ];

        foreach ($plans as $name => $plan) {
            Plan::create([
                'name' => $name,
                'price' => (float) $plan['price'],
                'monthly' => $plan['monthly'],
            ]);
        }

        $this->command->info('Time completed: '.$start->diffForHumans(null, true));
    }
}
