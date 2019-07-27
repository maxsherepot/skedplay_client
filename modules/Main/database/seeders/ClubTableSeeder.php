<?php

namespace Modules\Main\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Main\Entities\Club;
use Modules\Main\Entities\Event;
use Modules\Main\Entities\Price;
use Modules\Users\Entities\User;
use Modules\Main\Entities\Service;
use Illuminate\Database\Eloquent\Model;
use Modules\Users\Services\Imager\ImagerWorker;
use Modules\Users\Services\Imager\Varieties\ClubImager;

class ClubTableSeeder extends Seeder
{
    private $clubs_imager;

    public function __construct()
    {
        $this->clubs_imager = (new ImagerWorker(new ClubImager()))->imager();
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $start = now();
        $this->command->info('Club seeder started');

        factory(\Modules\Main\Entities\Club::class, 3)
            ->create()
            ->each(function (Club $club) {
                $club->models()->saveMany(
                    factory(\Modules\Users\Entities\User::class, 5)
                        ->state('model')
                        ->create()
                        ->each(function (User $user) {
                            $this->addServices($user);
                            $this->addPrices($user);
                            $this->addEvents($user);
                        })
                );
//                $this->addAttachments($club);
                $this->addEvents($club);
            });

        $this->command->info('Time completed: ' . $start->diffForHumans(null, true));
    }

    public function addServices(User $user)
    {
        $services = Service::all();

        $mapping = $services->random(5)->mapWithKeys(function ($service) {
            // Extra if have cost..
            $isExtra = (bool)rand(0, 1);

            return [
                $service->id => [
                    'cost'  => $isExtra ? (float)random_int(99, 399) : null,
                    'extra' => $isExtra
                ],
            ];
        })->toArray();

        $user->services()->sync($mapping);
    }

    public function addPrices(User $user)
    {
        $prices = Price::all();

        $mapping = $prices->random(5)->mapWithKeys(function ($price) {
            return [
                $price->id => [
                    'cost' => (float)random_int(99, 399),
                ],
            ];
        })->toArray();

        $user->prices()->sync($mapping);
    }

    public function addAttachments(Club $club)
    {
        collect(range(0, 3))
            ->map(function () use ($club) {
                $pathToFile = $this->clubs_imager->random()->getImagePath();

                $club->addMedia(storage_path('app/' . $pathToFile))
                    ->preservingOriginal()
                    ->toMediaCollection('photos', 'media');
            });
    }

    public function addEvents(Model $model)
    {
        /** @var Club|User $model */
        $model->events()->saveMany(
            factory(\Modules\Main\Entities\Event::class, 5)->make()
        );
    }
}
