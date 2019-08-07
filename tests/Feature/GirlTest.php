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
        ')->assertJsonStructure([
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

    public function testShow()
    {
        $this->graphQL('
        {
            girl(id: 1) {
                id
                first_name
                last_name
                gender
                age
            }
        }
        ')->assertJsonStructure([
            'data' => [
                'girl' => [
                    'id',
                    'first_name',
                    'last_name',
                    'gender',
                    'age',
                ]
            ]
        ]);
    }
}
