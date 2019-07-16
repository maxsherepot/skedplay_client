<?php

namespace Modules\Users\database\seeders;

use Illuminate\Database\Eloquent\Model;
use Modules\Users\Entities\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
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
	 * @return void
	 */
	public function run()
	{
		Model::unguard();

		$roles = [
			'admin' => 'admin@site.com',
			'moderator' => 'moderator@site.com',
			'user' => 'user@site.com',
			'girl' => 'girl@site.com',
			'club_owner' => 'club_owner@site.com',
		];

		foreach ($roles as $role => $email) {
			/** Additional users */
			foreach (range(1, 9) as $i) {
				$user = User::create([
					'name' => $this->faker->name,
					'email' => $this->faker->email,
					'password' => bcrypt('password'),
				]);

				/** @var User $user */
				$user->attachRole($role);
			}
		}
	}
}
