<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class PlanTest extends TestCase
{
    use DatabaseTransactions;

    public function testGetPlans()
    {
        $this->index()->assertJsonStructure([
            'data' => [
                'plans' => [
                    [
                        'id',
                        'name',
                        'price',
                        'permissions' => [
                            [
                                'id',
                                'name',
                                'display_name',
                                'pivot' => [
                                    'id',
                                    'value',
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ]);
    }

    protected function index()
    {
        return $this->graphQL('
        {
            plans {
                id
                name
                price
                permissions {
                  id
                  name
                  display_name
                  pivot {
                    id
                    value
                  }
                }
            }
        }
        ');
    }
}
