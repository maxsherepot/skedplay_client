<?php

namespace Modules\Users\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Modules\Users\Entities\Permission;
use Modules\Users\Entities\User;

class LaratrustSeeder extends Seeder
{

    /**
     * @var \Faker\Generator
     */
    private $faker;

    public function __construct()
    {
        $this->faker = \Faker\Factory::create();
    }

    /**
     * Run the database seeds.
     *
     * @return  void
     */
    public function run()
    {
        $this->command->info('Truncating User, Role and Permission tables');
        //$this->truncateLaratrustTables();

        $config = config('laratrust_seeder.role_structure');
        $userPermission = config('laratrust_seeder.permission_structure');
        $mapPermission = collect(config('laratrust_seeder.permissions_map'));

        foreach ($config as $key => $modules) {
           if (!\Modules\Users\Entities\Role::query()->where('name', '=', $key)->exists()) {
                // Create a new role
                $role = \Modules\Users\Entities\Role::query()->create([
                    'name' => $key,
                    'display_name' => ucwords(str_replace('_', ' ', $key)),
                    'description' => ucwords(str_replace('_', ' ', $key))
                ]);
                $permissions = [];

                $this->command->info('Creating Role ' . strtoupper($key));

                // Reading role permission modules
                foreach ($modules as $module => $value) {

                    foreach (explode(',', $value) as $p => $perm) {

                        $permissionValue = $mapPermission->get($perm);

                        $permissions[] = \Modules\Users\Entities\Permission::query()->firstOrCreate([
                            'name' => $permissionValue . '-' . $module,
                            'display_name' => ucfirst($permissionValue) . ' ' . ucfirst($module),
                            'description' => ucfirst($permissionValue) . ' ' . ucfirst($module),
                        ])->id;

                        $this->command->info('Creating Permission to ' . $permissionValue . ' for ' . $module);
                    }
                }
                // Attach all permissions to the role
                $role->permissions()->sync($permissions);

                $this->command->info("Creating '{$key}' user");

                // Create default user for each role
                //$user = $this->storeUser($key);

                //$user->attachRole($role);
           }
        }

        // Creating user with permissions
        if (!empty($userPermission)) {

            foreach ($userPermission as $key => $modules) {

                foreach ($modules as $module => $value) {
                    //if (!User::query()->where('name', '=', $key)->exists()) {
                        // Create default user for each permission set
                        $user = $this->storeUser($key);
                        $permissions = [];

                        foreach (explode(',', $value) as $p => $perm) {

                            $permissionValue = $mapPermission->get($perm);

                            $permissions[] = \Modules\Users\Entities\Permission::firstOrCreate([
                                'name'         => $permissionValue . '-' . $module,
                                'display_name' => ucfirst($permissionValue) . ' ' . ucfirst($module),
                                'description'  => ucfirst($permissionValue) . ' ' . ucfirst($module),
                            ])->id;

                            $this->command->info('Creating Permission to ' . $permissionValue . ' for ' . $module);
                        }
                    //}
                }

                // Attach all permissions to the user
                $user->permissions()->sync($permissions);
            }
        }
    }

    protected function storeUser($key)
    {
        if (User::query()->where('name', '=', $key)->exists()) {
            return User::query()->where('name', '=', $key)->get();
        }

        return User::create([
            'name'     => $key,
            'gender'   => $this->faker->randomElement(User::REGISTER_GENDERS),
            'birthday' => $this->faker->date($format = 'Y-m-d', $max = '2003-05-05'),
            'email'    => $key . '@site.com',
            'phone'    => $this->faker->unique()->phoneNumber,
            'password' => \Hash::make('password'),
        ]);
    }

    /**
     * Truncates all the laratrust tables and the users table
     *
     * @return    void
     */
    public function truncateLaratrustTables()
    {
        Schema::disableForeignKeyConstraints();
        DB::table('permission_role')->truncate();
        DB::table('permission_user')->truncate();
        DB::table('role_user')->truncate();
        \Modules\Users\Entities\User::truncate();
        \Modules\Users\Entities\Role::truncate();
        \Modules\Users\Entities\Permission::truncate();
        Schema::enableForeignKeyConstraints();
    }
}
