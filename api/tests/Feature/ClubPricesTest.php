<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Collection;
use Tests\TestCase;

class ClubPricesTest extends TestCase
{
    use DatabaseTransactions;

    public function testSyncPrices()
    {
        $data = collect([
            'prices' => [
                [
                    'id'    => 2,
                    'price' => '500.00',
                ],
                [
                    'id'    => 4,
                    'price' => '990.00',
                ],
                [
                    'id'    => 7,
                    'price' => '0',
                ],
            ],
            'club'   => 1,
        ]);

        $this->actingAs($this->getUser('club_owner@site.com'), 'api')
            ->sync($data)
            ->assertJson([
                'data' => [
                    'syncClubPrices' => [
                        'prices' => [
                            [
                                'id'    => 2,
                                'pivot' => [
                                    'price' => '500.00',
                                ],
                            ],
                            [
                                'id'    => 4,
                                'pivot' => [
                                    'price' => '990.00',
                                ],
                            ],
                            [
                                'id'    => 7,
                                'pivot' => [
                                    'price' => '0.00',
                                ],
                            ],
                        ],
                    ],
                ],
            ]);
    }

    protected function sync(Collection $data)
    {
        return $this->postGraphQL(
            [
                'query'     => '
                    mutation ($club: ID!, $prices: [PriceInput!]) {
                        syncClubPrices(club: $club, prices: $prices) {
                            prices {
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
