<?php

namespace Modules\Users\Database\Seeders;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Modules\Main\Services\Cashier\Plan;

class PlanPermissionTableSeeder extends Seeder
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
        $this->command->info('Plan Permission seeder started');

        $plans = Plan::all();

        $permissions = [
            'max-club'         => [
                'title' => 'Numbers of clubs in the account',
            ],
            'can-events'       => [
                'title' => 'Events'
            ],
            'max-girl-profile' => [
                'title' => 'Girls profiles'
            ],
            'max-girl-photo'   => [
                'title' => 'Numbers of photos per girl profile'
            ],
            'max-girl-video'   => [
                'title' => 'Video on the profile (max. 200mb)'
            ],
            'max-vip-profile'  => [
                'title' => 'Vip profiles of girls'
            ],
            'max-club-video'   => [
                'title' => 'Club Profile video'
            ],
        ];

        $permission_ids = [];

        $permission_values = [
            'max-club'         => [1, 3, 5],
            'can-events'       => [0, 1, 1],
            'max-girl-profile' => [10, 0, 0],
            'max-girl-photo'   => [10, 0, 0],
            'max-girl-video'   => [1, 1, 1],
            'max-vip-profile'  => [5, 10, 10],
            'max-club-video'   => [1, 1, 1],
        ];

        foreach ($permissions as $key => $permission) {
            $permission_ids[$key] =
                \Modules\Users\Entities\Permission::create([
                    'name'         => $key,
                    'display_name' => ucfirst($permission['title']),
                    'description'  => null,
                ])->id;
        }

        $this->assignValues($permissions, $permission_ids, $permission_values);

        $this->command->info('Time completed: ' . $start->diffForHumans(null, true));
    }

    public function assignValues($permissions, $ids, $values)
    {
        foreach ($permissions as $key => $permission) {
            for ($i = 0; $i <= 2; $i++) {
                DB::table('permission_plan')->insert([
                    'plan_id'       => ($i + 1),
                    'permission_id' => $ids[$key],
                    'value'         => $values[$key][$i],
                ]);
            }
        }
    }
}
