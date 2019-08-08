<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Collection;
use Modules\Users\Entities\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class GirlTest extends TestCase
{
    use DatabaseTransactions;

    public function getUser($email = 'girl@site.com')
    {
        return User::where('email', $email)->first();
    }

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

    public function testUpdateByUser()
    {
        $data = collect([
            'id'         => 1,
            'first_name' => 'New first name',
            'last_name'  => 'New last name',
            'age'        => 30,
        ]);

        $this->actingAs($this->getUser(), 'api')->update($data)->assertJson([
            'data' => [
                'updateGirl' => [
                    'status'  => true,
                    'message' => null,
                ]
            ]
        ]);
    }

    public function testUpdateByClub()
    {
        $data = collect([
            'id'         => 2,
            'first_name' => 'New first name',
            'last_name'  => 'New last name',
            'age'        => 31,
        ]);

        $this->actingAs($this->getUser('club_owner@site.com'), 'api')
            ->update($data)->assertJson([
                'data' => [
                    'updateGirl' => [
                        'status'  => true,
                        'message' => null,
                    ]
                ]
            ]);
    }

    protected function update(Collection $data)
    {
        return $this->postGraphQL(
            [
                'query'     => '
                mutation ($id: ID!, $first_name: String!, $last_name: String!, $age: Int!) {
                    updateGirl(girl: $id, input: {
                        first_name: $first_name
                        last_name: $last_name
                        age: $age
                    }) {
                        status
                        message
                    }
                }
            ',
                'variables' => $data->all(),
            ],
            );
    }
}
