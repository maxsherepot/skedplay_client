<?php

namespace Modules\Main\Database\Seeders;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use Modules\Main\Entities\Pages\Page;

class PageTableSeeder extends Seeder
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
        $this->command->info('Page seeder started');

        $pages = [
            'help_center'          => [
                'en' => [
                    'name'        => 'Help Center',
                    'description' => 'Help Center pages',
                ],
                'ru' => [
                    'name'        => 'Центр поддержки',
                    'description' => 'Страница центра поддержки',
                ],
            ],
            'services_and_tariffs' => [
                'en' => [
                    'name'        => 'Services and tariffs',
                    'description' => 'Services and tariffs pages',
                ],
            ],
            'contact_support'      => [
                'en' => [
                    'name'        => 'Contact support',
                    'description' => 'Contact support pages',
                ],
            ],
            'term_of_use'          => [
                'en' => [
                    'name'        => 'Term of use',
                    'description' => 'Term of use pages',
                ],
            ]
        ];

//        foreach ($pages as $page) {
//            $instance = new Page;
//            $this->setTranslations($instance, $page);
//            $instance->save();
//        }

        $this->command->info('Time completed: ' . $start->diffForHumans(null, true));
    }

    /**
     * @param array $page
     * @param Page $instance
     */
    public function setTranslations(Page $instance, array $page)
    {
        foreach ($page as $locale => $translations) {
            foreach ($translations as $key => $value) {
                $instance->setTranslation($key, $locale, $value);
            }
        }
    }
}
