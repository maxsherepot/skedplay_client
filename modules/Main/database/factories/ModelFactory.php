<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;
use Modules\Main\Entities\{Event, EventType, Price, Service};

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
        'title'         => $faker->text(50),
        'description'   => $faker->text(500),
        'event_type_id' => $typeId,
    ];
});

$factory->define(EventType::class, function (Faker $faker) {
    return [];
});

