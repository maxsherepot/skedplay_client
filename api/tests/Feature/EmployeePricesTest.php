<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Collection;
use Tests\TestCase;

class EmployeePricesTest extends TestCase
{
    use DatabaseTransactions;

    public function testSyncPrices()
    {
        $user = $this->getUser();

        $data = collect([
            'prices'   => [
                [
                    'id'    => 2,
                    'price' => '321.00',
                ],
                [
                    'id'    => 4,
                    'price' => '950.00',
                ],
                [
                    'id'    => 7,
                    'price' => '0',
                ],
            ],
            'employee' => $user->employee->id,
        ]);

        $this->actingAs($user, 'api')
            ->sync($data)
            ->assertJson([
                'data' => [
                    'syncEmployeePrices' => [
                        'prices' => [
                            [
                                'id'    => 2,
                                'pivot' => [
                                    'price' => '321.00',
                                ]
                            ],
                            [
                                'id'    => 4,
                                'pivot' => [
                                    'price' => '950.00',
                                ]
                            ],
                            [
                                'id'    => 7,
                                'pivot' => [
                                    'price' => '0.00',
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
                    mutation ($employee: ID!, $prices: [PriceInput!]) {
                        syncEmployeePrices(employee: $employee, prices: $prices) {
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
