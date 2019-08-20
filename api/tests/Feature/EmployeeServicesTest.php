<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Collection;
use Tests\TestCase;

class EmployeeServicesTest extends TestCase
{
    use DatabaseTransactions;

    public function testSyncServices()
    {
        $user = $this->getUser();

        $data = collect([
            'services' => [
                [
                    'id'    => 1,
                    'price' => '100.00',
                ],
                [
                    'id'    => 3,
                    'price' => '50.00',
                ],
                [
                    'id'    => 4,
                    'price' => '0',
                ],
            ],
            'employee' => $user->employee->id,
        ]);

        $this->actingAs($user, 'api')
            ->sync($data)
            ->assertJson([
                'data' => [
                    'syncEmployeeServices' => [
                        'services' => [
                            [
                                'id'    => 1,
                                'pivot' => [
                                    'price' => '100.00',
                                ]
                            ],
                            [
                                'id'    => 3,
                                'pivot' => [
                                    'price' => '50.00',
                                ]
                            ],
                            [
                                'id'    => 4,
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
                    mutation ($employee: ID!, $services: [ServiceInput!]) {
                        syncEmployeeServices(employee: $employee, services: $services) {
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
