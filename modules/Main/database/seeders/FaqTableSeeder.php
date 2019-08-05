<?php

namespace Modules\Main\Database\Seeders;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use Modules\Main\Entities\Faq;
use Modules\Main\Entities\FaqCategory;
use Modules\Main\Entities\FaqItem;

class FaqTableSeeder extends Seeder
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
        $this->command->info('Faq seeder started');

        $faq = [
            'Services and tariffs' => [
                'Types of paid services'         => [
                    [
                        'title' => 'About types of paid services',
                        'text'  => 'Lorem ipsum dolor sit ammet',
                    ],
                    [
                        'title' => 'View types of paid services',
                        'text'  => 'Lorem ipsum dolor sit ammet',
                    ],
                ],
                'How can i order paid services?' => [
                    [
                        'title' => 'About can you order paid services',
                        'text'  => 'Lorem ipsum dolor sit ammet',
                    ],
                    [
                        'title' => 'View you can order paid services',
                        'text'  => 'Lorem ipsum dolor sit ammet',
                    ],
                ],
                'The cost of services'           => [
                    [
                        'title' => 'About cost of services',
                        'text'  => 'Lorem ipsum dolor sit ammet',
                    ],
                    [
                        'title' => 'View cost of services',
                        'text'  => 'Lorem ipsum dolor sit ammet',
                    ],
                ],
                'How can i do payment?'          => [
                    [
                        'title' => 'Options you payment',
                        'text'  => 'Lorem ipsum dolor sit ammet',
                    ],
                ],
            ]
        ];

        foreach ($faq as $name => $item) {
            $newFaq = new Faq;
            $newFaq->name = $name;
            $newFaq->save();

            foreach ($item as $categoryName => $items) {
                $category = FaqCategory::create([
                    'name'   => $categoryName,
                    'faq_id' => $newFaq->id
                ]);

                foreach ($items as $item) {
                    FaqItem::create([
                        'title'           => $item['title'],
                        'text'            => $item['text'],
                        'faq_category_id' => $category->id,
                    ]);
                }
            }
        }

        $this->command->info('Time completed: ' . $start->diffForHumans(null, true));
    }

}
