<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Collection;
use Tests\TestCase;

class ClubEventTest extends TestCase
{
    use DatabaseTransactions;

    public function testCreateEvent()
    {
        $user = $this->getUser('club_owner@site.com');

        $data = collect([
            'title'         => 'My club event',
            'description'   => 'About my special club event!',
            'event_type_id' => 1,
            'club_id'       => 1,
            'club'          => 1,
        ]);

        $this->actingAs($user, 'api')
            ->create($data)->assertJsonStructure([
                'data' => [
                    'createClubEvent' => [
                        'id',
                        'title',
                        'description',
                        'type' => [
                            'id',
                            'name',
                        ],
                        'club' => [
                            'id',
                            'name',
                        ],
                    ]
                ]
            ]);
    }

    protected function create(Collection $data)
    {
        return $this->postGraphQL(
            [
                'query'     => '
                mutation ($club: ID!, $title: String!, $description: String!, $event_type_id: Int! $club_id: Int!) {
                    createClubEvent(club: $club, input: {
                        title: $title
                        description: $description
                        event_type_id: $event_type_id
                        club_id: $club_id
                    }) {
                        id
                        title
                        description
                        type {
                            id
                            name
                        }
                        club {
                            id
                            name
                        }
                    }
                }
            ',
                'variables' => $data->all(),
            ],
        );
    }
}
