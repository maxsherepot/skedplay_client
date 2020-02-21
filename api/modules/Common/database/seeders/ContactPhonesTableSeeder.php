<?php

namespace Modules\Common\database\seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Modules\Common\Entities\ContactPhone;

class ContactPhonesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (ContactPhone::count()) {
            return;
        }

        foreach (range(1, 3) as $i) {
            $part1 = mt_rand(5, 9);
            $part2 = mt_rand(111, 999);
            $part3 = mt_rand(11, 99);
            $part4 = mt_rand(11, 99);

            ContactPhone::create([
                'phone' => "+417$part1-$part2-$part3-$part4"
            ]);
        }
    }
}
