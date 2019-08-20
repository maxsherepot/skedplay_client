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
                'Types of paid services',
                'How can i order paid services?',
                'The cost of services',
                'How can i do payment?'
            ]
        ];

        foreach ($faq as $name => $items) {
            $newFaq       = new Faq;
            $newFaq->name = $name;
            $newFaq->save();

            foreach ($items as $title) {

                /**
                 * TODO FAKER GENERATE TEXT
                 */
                $text = $title;

                $newFaq->items()->create(compact('title', 'text'));
            }
        }

        $this->command->info('Time completed: '.$start->diffForHumans(null, true));
    }

}
