<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Illuminate\Support\Str;
use Faker\Generator as Faker;
use Modules\Main\Entities\{Club, Event, EventType, Price, Service};

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

$factory->define(Club::class, function (Faker $faker) {
    $names = ['Villa Lustpoint', 'Soprano Club', 'Fkk-Palast'];
    $types = ['Club', 'Studio'];

    $name = $faker->randomElement($names);

    return [
        'name'        => $name,
        'type'        => $faker->randomElement($types),
        'website'     => 'www.' . Str::slug($name) . '.com',
        'address'     => $faker->address,
        'phone'       => $faker->phoneNumber,
        'description' => $faker->text(500),
        'user_id'     => function () {
            return factory(\Modules\Users\Entities\User::class)
                ->state('club_owner')
                ->create()->id;
        },
        'lat'         => $faker->latitude,
        'lng'         => $faker->longitude,
    ];
});

$factory->define(Service::class, function (Faker $faker) {
    return [];
});

$factory->define(Price::class, function (Faker $faker) {
    return [];
});

$factory->define(Event::class, function (Faker $faker) {
    $eventTypes = EventType::all();
    $typeId = $eventTypes->random()->id;

    return [
        'title'         => $faker->title,
        'description'   => $faker->text(500),
        'event_type_id' => $typeId,
    ];
});

$factory->define(EventType::class, function (Faker $faker) {
    return [];
});

