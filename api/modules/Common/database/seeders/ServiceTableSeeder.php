<?php

namespace Modules\Common\Database\Seeders;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use Modules\Common\Entities\Service;

class ServiceTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (Service::count()) {
            return;
        }

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
