<?php

namespace Modules\Clubs\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Modules\Clubs\Entities\Club;
use Modules\Clubs\Entities\ClubType;
use Symfony\Component\Console\Input\InputArgument;

class CreatePossibleClub extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'possible:club:create {filename}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Add possible clubs to db by name of *.json file .';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $clubs = file_get_contents(storage_path($this->argument('filename')));

        $json = trim($clubs);

        $clubs = json_decode($json);

        foreach ($clubs as $club) {
            $type = ClubType::query()->updateOrCreate(
                ['name' => $club->type]
            );

            $clubModel = Club::query()->where('id', $club->id)->first();

            if ($clubModel) {
                $this->info('Duplicate club: [ ' . $club->id . ' ]');

                continue;
            }

            try {
                $phones = collect(explode(',', $club->phone))
                    ->map(
                        fn(string $phone) => str_replace(['(', ')', ' ', '-'], '', trim($phone))
                    );

                Club::query()->create([
                    'id' => $club->id,
                    'name' => $club->name,
                    'address' => $club->adress,
                    'club_type_id' => $type->id,
                    'website' => $club->www,
                    'phones' => $phones,
                    'email' => $club->email,
                    'comment' => $club->comment,
                ]);

                $this->info('Complete club: [ ' . $club->id . ' ]');
            } catch (\Exception $exception) {
                Log::info('Can\'t create possible club: ' . $exception->getMessage());
            }
        }

        $this->info('Command finished');
    }

    /**
     * Get the console command arguments.
     *
     * @return array
     */
    protected function getArguments()
    {
        return [
            ['filename', InputArgument::REQUIRED, 'clubs.json'],
        ];
    }

    /**
     * Get the console command options.
     *
     * @return array
     */
    protected function getOptions()
    {
        return [
           //
        ];
    }
}
