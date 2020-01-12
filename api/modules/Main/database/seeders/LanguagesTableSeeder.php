<?php

namespace Modules\Main\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Modules\Main\Entities\Language;

class LanguagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        if (Language::count()) {
            return;
        }

        $langs = [
            ['name' => 'English', 'code' => 'en'],
            ['name' => 'Deutsch', 'code' => 'de'],
            ['name' => 'French', 'code' => 'fr'],
        ];

        foreach ($langs as $lang) {
            Language::create(array_merge($lang, [
                'active' => 1,
            ]));
        }
    }
}
