<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class GirlTest extends TestCase
{

    public function testSearch()
    {
        $this->graphQL('
        {
            girls(filters: {services: [1]}, count: 1) {
                data {
                    first_name
                }
            }
        }
        ')->assertJson([
            'data' => [
                'girls' => [
                    'data' => [
                        [
                            'first_name'
                        ]
                    ]
                ]
            ]
        ]);
    }
}
