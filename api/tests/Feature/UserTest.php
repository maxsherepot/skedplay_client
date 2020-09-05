<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Collection;
use Tests\TestCase;

class UserTest extends TestCase
{
    use DatabaseTransactions;

    public function testUpdateUser()
    {
        $data = collect([
            'id'                    => 3,
            'name'                  => 'My change name',
            'phone'                 => '1-696-516-3512',
            'email'                 => 'change@site.com',
            'gender'                => 1,
            'birthday'              => '1992-01-02',
            'age'                   => 25,
            'password'              => 'password5',
            'password_confirmation' => 'password5',
        ]);

        $this->actingAs($this->getUser('client@site.com'), 'api')
            ->update($data)
            ->assertJson([
                'data' => [
                    'updateUser' => [
                        'status'  => true,
                        'message' => null,
                    ],
                ],
            ]);
    }

    protected function update(Collection $data)
    {
        return $this->postGraphQL(
            [
                'query'     => '
                mutation (
                    $id: ID!, 
                    $name: String, 
                    $phone: String, 
                    $email: String, 
                    $gender: Int, 
                    $birthday: String, 
                    $age: Int
                    $password: String
                    $password_confirmation: String
                ) {
                    updateUser(user: $id, input: {
                        name: $name
                        phone: $phone
                        email: $email
                        gender: $gender
                        birthday: $birthday
                        age: $age
                        password: $password
                        password_confirmation: $password_confirmation
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
