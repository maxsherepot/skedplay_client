<?php declare(strict_types=1);

namespace Modules\Main\Database\Seeders;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use Modules\Main\Entities\Club;
use Modules\Main\Entities\Price;
use Modules\Main\Entities\Service;
use Modules\Users\Entities\Girl;
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
                $club->girls()->saveMany(
                    factory(\Modules\Users\Entities\Girl::class, 5)
                        ->create()
                        ->each(function (Girl $girl) {
                            $this->addServices($girl);
                            $this->addPrices($girl);
                            $this->addEvents($girl);
                        })
                );
//                $this->addAttachments($club);
                $this->addEvents($club);
            });

        $this->command->info('Time completed: ' . $start->diffForHumans(null, true));
    }

    public function addServices(Girl $girl)
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

        $girl->services()->sync($mapping);
    }

    public function addPrices(Girl $girl)
    {
        $prices = Price::all();

        $mapping = $prices->random(5)->mapWithKeys(function ($price) {
            return [
                $price->id => [
                    'cost' => (float)random_int(99, 399),
                ],
            ];
        })->toArray();

        $girl->prices()->sync($mapping);
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
        /** @var Club|Girl $model */
        $model->events()->saveMany(
            factory(\Modules\Main\Entities\Event::class, 5)->make()
        );
    }
}
