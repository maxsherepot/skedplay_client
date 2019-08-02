<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;
use Modules\Users\Entities\Girl;
use Modules\Users\Entities\User;
use Modules\Users\Services\Imager\ImagerWorker;
use Modules\Users\Services\Imager\Varieties\ModelImager;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->state(\Modules\Users\Entities\User::class, 'club_owner', function (Faker $faker) {
    return [
        'club_type' => $faker->randomElement(['Club', 'Studio']),
    ];
})->afterCreatingState(\Modules\Users\Entities\User::class, 'club_owner', function (User $user) {
    $user->attachRole(User::ACCOUNT_CLUB_OWNER);
});

$factory->state(\Modules\Users\Entities\User::class, 'client', []);

$factory->define(\Modules\Users\Entities\User::class, function (Faker $faker) {
    return [
        'email'      => $faker->unique()->safeEmail,
        'first_name' => $faker->firstName,
        'last_name'  => $faker->lastName,
        'phone'      => $faker->phoneNumber,
        'password'   => 'password',
    ];

})->afterCreating(\Modules\Users\Entities\User::class, function (User $user) {

//    $imager = (new ImagerWorker(new ModelImager()))->imager();
//
//    collect(range(0, 6))
//        ->map(function () use ($user, $imager) {
//            $pathToFile = $imager->random()->getImagePath();
//
//            $user->addMedia(storage_path('app/' . $pathToFile))
//                ->preservingOriginal()
//                ->toMediaCollection('photos', 'media');
//        });
});

$factory->define(\Modules\Users\Entities\Girl::class, function (Faker $faker) {
    return [
        'email'      => $faker->unique()->safeEmail,
        'first_name' => $faker->firstName,
        'last_name'  => $faker->lastName,
        'gender'     => $faker->randomElement([
            Girl::GENDER_MALE,
            Girl::GENDER_FEMALE,
        ]),
        'birthday'   => $faker->date($format = 'Y-m-d', $max = '2003-05-05'),
        'phone'      => $faker->phoneNumber,
        'password'   => 'password',
        'type'       => $faker->randomElement(Girl::GIRL_TYPES),
        'vip'        => (bool)rand(0, 1),
    ];

})->afterCreating(\Modules\Users\Entities\Girl::class, function (Girl $girl) {
//    $imager = (new ImagerWorker(new ModelImager()))->imager();
//
//    collect(range(0, 6))
//        ->map(function () use ($user, $imager) {
//            $pathToFile = $imager->random()->getImagePath();
//
//            $girl->addMedia(storage_path('app/' . $pathToFile))
//                ->preservingOriginal()
//                ->toMediaCollection('photos', 'media');
//        });
});
