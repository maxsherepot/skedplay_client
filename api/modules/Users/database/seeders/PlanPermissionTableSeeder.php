<?php

namespace Modules\Users\Database\Seeders;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Modules\Users\Entities\PermissionPlan;

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

        $permissions = [
            'photo' => [
                'title' => 'Photo in Profile',
            ],
            'active-ad' => [
                'title' => 'Active AD',
            ],
            'cards' => [
                'title' => 'Cards / AD in profile',
            ],
            'multilingual' => [
                'title' => 'Multilingual',
            ],
            'chat' => [
                'title' => 'Chat with your client',
            ],
            'video' => [
                'title' => 'Video in profile',
            ],
            'vip' => [
                'title' => 'VIP status',
            ],
            'statistic-review' => [
                'title' => 'Statistic & Review',
            ],
            'personal-page' => [
                'title' => 'Personal Web Page',
            ],
            'personal-domain' => [
                'title' => 'Personal Domain',
            ],
            'seo' => [
                'title' => 'SEO',
            ],
            'invoice' => [
                'title' => 'Invoice Payment',
            ],
            'free-consultation' => [
                'title' => 'Free consultation',
            ],
        ];

        $permission_ids = [];

        $permission_values = [
            'photo' => [1, 30, PermissionPlan::INFINITY],
            'active-ad' => [1, 5, 2],
            'cards' => [5, 5, 10],
            'multilingual' => [PermissionPlan::TRUE, PermissionPlan::TRUE, PermissionPlan::TRUE],
            'chat' => [PermissionPlan::FALSE, PermissionPlan::TRUE, PermissionPlan::TRUE],
            'video' => [PermissionPlan::FALSE, PermissionPlan::TRUE, PermissionPlan::TRUE],
            'vip' => [PermissionPlan::FALSE, PermissionPlan::TRUE, PermissionPlan::TRUE],
            'statistic-review' => [PermissionPlan::FALSE, PermissionPlan::FALSE, PermissionPlan::TRUE],
            'personal-page' => [PermissionPlan::FALSE, PermissionPlan::FALSE, PermissionPlan::TRUE],
            'personal-domain' => [PermissionPlan::FALSE, PermissionPlan::FALSE, PermissionPlan::TRUE],
            'seo' => [PermissionPlan::FALSE, PermissionPlan::FALSE, PermissionPlan::TRUE],
            'invoice' => [PermissionPlan::FALSE, PermissionPlan::FALSE, PermissionPlan::TRUE],
            'free-consultation' => [PermissionPlan::FALSE, PermissionPlan::FALSE, PermissionPlan::TRUE],
        ];

        foreach ($permissions as $key => $permission) {
            $permission_ids[$key] = \Modules\Users\Entities\Permission::create([
                'name' => $key,
                'display_name' => ucfirst($permission['title']),
                'description' => null,
            ])->id;
        }

        $this->assignValues($permissions, $permission_ids, $permission_values);

        $this->command->info('Time completed: '.$start->diffForHumans(null, true));
    }

    public function assignValues($permissions, $ids, $values)
    {
        foreach ($permissions as $key => $permission) {
            for ($i = 0; $i <= 2; $i++) {
                DB::table('permission_plan')->insert([
                    'plan_id' => ($i + 1),
                    'permission_id' => $ids[$key],
                    'value' => $values[$key][$i],
                ]);
            }
        }
    }
}
