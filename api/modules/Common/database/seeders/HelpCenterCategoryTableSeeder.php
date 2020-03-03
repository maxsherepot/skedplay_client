<?php

namespace Modules\Common\database\seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Modules\Common\Entities\HelpCenterCategory;

class HelpCenterCategoryTableSeeder extends Seeder
{
    private $categories = [
        [
            'name' => 'Help center',
            'topics' => [
                ['name' => 'What is Skedplay',],
                ['name' => 'Services',],
                ['name' => 'Tariffs',],
                ['name' => 'Billings',],
                ['name' => 'Own webpages',],
                ['name' => 'How to create a webpage', 'hyphen' => 1],
                ['name' => 'Why its good for my business', 'hyphen' => 1],
            ],
        ],
        [
            'name' => 'For sex workers',
            'topics' => [
                ['name' => 'Working in Switzerland',],
                ['name' => 'Getting to work',],
            ],
        ],
        [
            'name' => 'For clubs',
            'topics' => [
                ['name' => 'Working in Switzerland for clubs',],
                ['name' => 'Getting to work club',],
            ],
        ],
        [
            'name' => 'Skedplay conditions',
            'topics' => [
                ['name' => 'Terms of use',],
                ['name' => 'Private policy',],
            ],
        ],
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        if (HelpCenterCategory::count()) {
            return;
        }

        foreach ($this->categories as $i => $category) {
            DB::beginTransaction();

            $categoryModel = HelpCenterCategory::create([
                'name' => $category['name'],
                'sort_order' => $i + 1,
            ]);

            foreach ($category['topics'] as $k => $topic) {
                $categoryModel->topics()->create([
                    'name' => $topic['name'],
                    'hyphen' => $topic['hyphen'] ?? 0,
                    'content' => '',
                    'sort_order' => $k + 1,
                ]);
            }

            DB::commit();
        }
    }
}
