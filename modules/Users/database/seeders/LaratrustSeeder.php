<?php

namespace Modules\Users\Database\Seeders;

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

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
        $this->truncateLaratrustTables();

        $genders = [
            'male',
            'female',
        ];

        $config = config('laratrust_seeder.role_structure');
        $userPermission = config('laratrust_seeder.permission_structure');
        $mapPermission = collect(config('laratrust_seeder.permissions_map'));

        foreach ($config as $key => $modules) {
            // Create a new role
            $role = \Modules\Users\Entities\Role::create([
                'name'         => $key,
                'display_name' => ucwords(str_replace('_', ' ', $key)),
                'description'  => ucwords(str_replace('_', ' ', $key))
            ]);
            $permissions = [];

            $this->command->info('Creating Role ' . strtoupper($key));

            // Reading role permission modules
            foreach ($modules as $module => $value) {

                foreach (explode(',', $value) as $p => $perm) {

                    $permissionValue = $mapPermission->get($perm);

                    $permissions[] = \Modules\Users\Entities\Permission::firstOrCreate([
                        'name'         => $permissionValue . '-' . $module,
                        'display_name' => ucfirst($permissionValue) . ' ' . ucfirst($module),
                        'description'  => ucfirst($permissionValue) . ' ' . ucfirst($module),
                    ])->id;

                    $this->command->info('Creating Permission to ' . $permissionValue . ' for ' . $module);
                }
            }

            // Attach all permissions to the role
            $role->permissions()->sync($permissions);

            $this->command->info("Creating '{$key}' user");

            // Create default user for each role
            $user = \Modules\Users\Entities\User::create([
                'first_name'   => $this->faker->firstName,
                'last_name'    => $this->faker->lastName,
                'gender'       => $this->faker->randomElement($genders),
                'birthday'     => $this->faker->date($format = 'Y-m-d', $max = '2003-05-05'),
                'phone'        => $this->faker->phoneNumber,
                'email'        => $key . '@site.com',
                'password'     => 'password',
                'account_type' => $key,
            ]);

            $user->attachRole($role);
        }

        // Creating user with permissions
        if (!empty($userPermission)) {

            foreach ($userPermission as $key => $modules) {

                foreach ($modules as $module => $value) {

                    // Create default user for each permission set
                    $user = \Modules\Users\Entities\User::create([
                        'first_name'     => $this->faker->firstName,
                        'last_name'      => $this->faker->lastName,
                        'gender'         => $this->faker->randomElement($genders),
                        'birthday'       => $this->faker->date($format = 'Y-m-d', $max = '2003-05-05'),
                        'phone'          => $this->faker->phoneNumber,
                        'email'          => $key . '@site.com',
                        'password'       => 'password',
                        'remember_token' => Str::random(10),
                        'account_type'   => $key,
                    ]);
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
                }

                // Attach all permissions to the user
                $user->permissions()->sync($permissions);
            }
        }
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
