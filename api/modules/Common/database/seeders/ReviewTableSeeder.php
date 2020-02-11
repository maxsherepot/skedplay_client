<?php

namespace Modules\Common\Database\Seeders;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use Modules\Common\Entities\Review;
use Modules\Users\Entities\User;


class ReviewTableSeeder extends Seeder
{

    protected $faker;

    public function __construct()
    {
        $this->faker = \Faker\Factory::create();
    }

    /**
     * Run the database seeds.
     *
     * @return void
     * @throws \Exception
     */
    public function run()
    {
        Model::unguard();

        if (Review::count()) {
            return;
        }

        $start = now();
        $this->command->info('Review seeder started');

        for ($i = 0; $i <= random_int(250, 500); $i++) {
            $review = (new Review())->create([
                'title'           => $this->faker->title,
                'body'            => $this->faker->text(300),
                'reviewable_type' => 'employee',
                'reviewable_id'   => random_int(1, 3),
                'user_id'         => factory(User::class)->create()->id,
            ]);

            $this->createReplies($review);
        }

        $this->command->info('Time completed: ' . $start->diffForHumans(null, true));
    }

    public function createReplies(Review $review)
    {
        $review->replies()->create([
            'body'      => $this->faker->text(75),
            'review_id' => $review->id,
            'user_id'   => $review->reviewable_id,
        ]);
    }
}
