<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Collection;
use Tests\TestCase;

class EmployeeEventTest extends TestCase
{
    use DatabaseTransactions;

    public function testCreateEvent()
    {
        $user = $this->getUser();

        $data = collect([
            'title'             => 'My event',
            'description'       => 'About my special event!',
            'event_type_id'     => 1,
            'club_id'           => 1,
            'employee'          => $user->employee->id,
        ]);

        $this->actingAs($user, 'api')
            ->create($data)->assertJsonStructure([
                'data' => [
                    'createEmployeeEvent' => [
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
                    ],
                ],
            ]);
    }

    protected function create(Collection $data)
    {
        return $this->postGraphQL(
            [
                'query'     => '
                mutation ($employee: ID!, $title: String!, $description: String!, $event_type_id: Int! $club_id: Int!) {
                    createEmployeeEvent(employee: $employee, input: {
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
