<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Collection;
use Tests\TestCase;

class ClubServicesTest extends TestCase
{
    use DatabaseTransactions;

    public function testSyncServices()
    {
        $data = collect([
            'services' => [
                [
                    'id'    => 1,
                    'price' => '120.00',
                ],
                [
                    'id'    => 4,
                    'price' => '59.00',
                ],
                [
                    'id'    => 5,
                    'price' => '0',
                ],
            ],
            'club'     => 1,
        ]);

        $this->actingAs($this->getUser('club_owner@site.com'), 'api')
            ->sync($data)
            ->assertJson([
                'data' => [
                    'syncClubServices' => [
                        'services' => [
                            [
                                'id'    => 1,
                                'pivot' => [
                                    'price' => '120.00',
                                ]
                            ],
                            [
                                'id'    => 4,
                                'pivot' => [
                                    'price' => '59.00',
                                ]
                            ],
                            [
                                'id'    => 5,
                                'pivot' => [
                                    'price' => '0',
                                ]
                            ],
                        ],
                    ]
                ]
            ]);
    }

    protected function sync(Collection $data)
    {
        return $this->postGraphQL(
            [
                'query'     => '
                    mutation ($club: ID!, $services: [ServiceInput!]) {
                        syncClubServices(club: $club, services: $services) {
                            services {
                                id
                                pivot {
                                    price
                                }
                            }
                        }
                    }
                ',
                'variables' => $data->all(),
            ],
            );
    }
}
