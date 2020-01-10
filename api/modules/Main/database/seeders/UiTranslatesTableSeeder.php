<?php

namespace Modules\Main\database\seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Modules\Main\Entities\Language;
use Modules\Main\Entities\UiTranslate;

class UiTranslatesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        foreach (Language::all() as $lang) {
            if (!file_exists(storage_path('locales/' . $lang->code . '/translation.json'))) {
                continue;
            }

            $translates = file_get_contents(storage_path('locales/' . $lang->code . '/translation.json'));
            $translates = json_decode($translates, true);

            $translates = Arr::dot($translates);

            foreach ($translates as $key => $translate) {
                if (UiTranslate::whereLanguageId($lang->id)->where('key', $key)->first()) {
                    continue;
                }

                UiTranslate::create([
                    'language_id' => $lang->id,
                    'key' => $key,
                    'value' => $translate,
                ]);
            }
        }
    }
}
