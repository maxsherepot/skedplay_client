<?php

namespace Modules\Main\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Main\Entities\Service;
use Illuminate\Database\Eloquent\Model;

class ServiceTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $start = now();
        $this->command->info('Price seeder started');

        $services = [
            '69 position',
            'Girlfriend Sex',
            'Everything with Protection',
            'Erotic massages',
            'Kissing',
            'Masturbating',
            'Fetish',
            'Anal',
        ];

        foreach ($services as $service) {
            Service::create([
                'name' => $service
            ]);
        }

        $this->command->info('Time completed: ' . $start->diffForHumans(null, true));
    }
}
