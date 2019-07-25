<?php

namespace Modules\Main\database\seeders;

use Illuminate\Database\Seeder;
use Modules\Main\Entities\Club;
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
                );
                $this->addAttachments($club);
            });

        $this->command->info('Time completed: ' . $start->diffForHumans(null, true));
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
}
