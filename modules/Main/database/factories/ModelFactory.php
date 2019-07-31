<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;
use Modules\Main\Entities\{Event, EventType, PriceType, Service};
use Modules\Main\Services\Cashier\Plan;
use Modules\Users\Entities\Club;

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

$factory->define(PriceType::class, function (Faker $faker) {
    return [];
});

$factory->define(Event::class, function (Faker $faker) {
    $eventTypes = EventType::all();
    $clubs = Club::all();

    $typeId = $eventTypes->random()->id;
    $clubId = $clubs->random()->id;

    return [
        'title'         => $faker->text(50),
        'description'   => $faker->text(500),
        'event_type_id' => $typeId,
        'club_id'       => $clubId,
    ];
});

$factory->define(EventType::class, function (Faker $faker) {
    return [];
});

$factory->define(Plan::class, function (Faker $faker) {
    return [];
});
