<?php declare(strict_types=1);

namespace Modules\Clubs\Database\Seeders;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;
use Modules\Clubs\Entities\ClubType;
use Modules\Clubs\Entities\Club;
use Modules\Common\Database\Seeders\CommonableSeeder;
use Modules\Users\Entities\Role;
use Modules\Users\Entities\User;
use Modules\Users\Services\Imager\ImagerWorker;
use Modules\Users\Services\Imager\Varieties\ClubImager;

class ClubTableSeeder extends Seeder
{
    use CommonableSeeder;

    private $clubs_imager;

    public function __construct()
    {
        $this->clubs_imager = (new ImagerWorker(new ClubImager()))->imager();
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $addresses = [
            'Hagenholzstrasse 110, Цюрих, Швейцария',
            'Sulgenrain 22, Берн, Швейцария',
            'Брандштрассе 33, Шлирен, Швейцария',
            'Zihlmattweg 44, Люцерн, Швейцария',
            'Rue de l\'Athénée 44, Женева, Швейцария',
            'Aeschenvorstadt 56, Базель, Швейцария',
            'Im oberen Gern 61, Винтертур, Швейцария',
            'Lettenstrasse 78, Кильхберг, Швейцария',
            'Lindauerstrasse 23, Tagelswangen, Швейцария',
            'Hertensteinstrasse 156, Веггис, Швейцария',
        ];

        Model::unguard();

        $start = now();
        $this->command->info('Club seeder started');

        $faker = \Faker\Factory::create();

        $club_type_ids = ClubType::pluck('id')->toArray();

        foreach (User::whereRoleIs(Role::CLUB_OWNER)->get() as $user) {

            $club = $user->clubs()->create([
                'name'         => $faker->company,
                'club_type_id' => $faker->randomElement($club_type_ids),
                'website'      => $faker->url,
                'email'        => $faker->companyEmail,
                'phones'       => json_encode([$faker->phoneNumber, $faker->phoneNumber]),
                'description'  => $faker->text,

                /**
                 * TODO: REAL ADDRESS
                 */
                'address' => Arr::random($addresses),
//                'lat'     => $faker->latitude,
//                'lng'     => $faker->longitude
            ]);

            $this->addAttachments($club);
            $this->attachPrices($club);
            $this->attachServices($club);

        }

        $this->command->info('Time completed: '.$start->diffForHumans(null, true));
    }

    public function addAttachments(Club $club)
    {
        collect(range(0, 3))
            ->map(function () use ($club) {
                $pathToFile = $this->clubs_imager->random()->getImagePath();

                $club->addMedia(storage_path('app/'.$pathToFile))
                    ->preservingOriginal()
                    ->toMediaCollection(Club::PHOTO_COLLECTION, 'media');
            });
    }
}
