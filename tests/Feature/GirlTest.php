<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Collection;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class GirlTest extends TestCase
{
    use DatabaseTransactions;

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
        $credentials = collect([
            'username' => 'girl@site.com',
            'password' => 'password',
        ]);

        $data = collect([
            'id'         => 1,
            'first_name' => 'New first name',
            'last_name'  => 'New last name',
            'age'        => 30,
        ]);

        $this->update($credentials, $data)->assertJson([
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
        $credentials = collect([
            'username' => 'club_owner@site.com',
            'password' => 'password',
        ]);

        $data = collect([
            'id'         => 2,
            'first_name' => 'New first name',
            'last_name'  => 'New last name',
            'age'        => 31,
        ]);

        $this->update($credentials, $data)->assertJson([
            'data' => [
                'updateGirl' => [
                    'status'  => true,
                    'message' => null,
                ]
            ]
        ]);
    }

    /**
     * @param Collection $data
     * @return \Illuminate\Foundation\Testing\TestResponse
     */

    protected function login(Collection $data)
    {
        return $this->postGraphQL([
            'query'     => '
                mutation ($username: String!, $password: String!) {
                    login(input: {
                        username: $username
                        password: $password
                    }) {
                        access_token
                        refresh_token
                        expires_in
                        token_type
                        user {
                            id
                            name
                            phone
                            email
                        }
                    }
                }
            ',
            'variables' => $data->all(),
        ]);
    }

    protected function update(Collection $credentials, Collection $data)
    {
        $response = $this->login($credentials);
        $access_token = $response->json('data.login.access_token');

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
            ['Authorization' => "Bearer $access_token"]
        );
    }
}
