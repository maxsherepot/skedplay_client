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
            'free'     => 0,
            'personal' => 170,
            'premium'  => 350,
        ];

        foreach ($plans as $name => $price) {
            Plan::create([
                'name'  => $name,
                'price' => (float)$price,
            ]);
        }

        $this->command->info('Time completed: ' . $start->diffForHumans(null, true));
    }
}
