<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Collection;
use Modules\Users\Entities\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;

class RegistrationTest extends TestCase
{

    use DatabaseTransactions, WithFaker;

    protected function getPhone()
    {
        return '+41 79 123 45 67';
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testSendCode()
    {
        $this->sendCode($this->getPhone())->assertJson([
            'data' => [
                'sendVerificationCode' => [
                    'status' => true
                ]
            ]
        ]);
    }

    public function testConfirmCode()
    {
        $this->confirmCode($this->getPhone(), '0000')->assertJson([
            'data' => [
                'checkVerificationCode' => [
                    'status' => true
                ]
            ]
        ]);
    }

    public function testRegistrationGirl()
    {
        $data = collect([
            'first_name'   => 'Natasha',
            'last_name'    => 'Whoreman',
            'email'        => 'natashawhorewoomen666@site.com',
            'birthday'     => '1992-02-25',
            'phone'        => $this->getPhone(),
            'gender'       => User::GENDER_FEMALE,
            'account_type' => User::ACCOUNT_GIRL
        ]);

        $this->registration($data)->assertJsonStructure([
            'data' => [
                'register' => [
                    'access_token',
                    'user' => [
                        'name',
                        'email',
                        'phone',
                        'girl'  => [
                            'first_name',
                            'last_name',
                            'gender'
                        ]
                    ]
                ]
            ]
        ]);
    }




    protected function registration(Collection $data)
    {
        $data = $data->merge([
            'phone'                 => $this->faker->phoneNumber,
            'password'              => 'password',
            'password_confirmation' => 'password',
        ]);

        $phone = $data->get('phone');

        $this->sendCode($phone);
        $this->confirmCode($phone, '0000');

        return $this->postGraphQL([
            'query'     => '
                mutation ($phone: String!, $email: String!, $first_name: String!, $last_name: String, $birthday: Date, $gender: Int, $account_type: String!, $club_type_id: Int, $lat: String, $lng: String, $password: String!, $password_confirmation: String!) {
                    register(input: {
                        account_type: $account_type,
                        first_name: $first_name,
                        last_name: $last_name,
                        phone: $phone,
                        email: $email,
                        birthday: $birthday,
                        gender: $gender,
                        club_type_id: $club_type_id,
                        lat: $lat,
                        lng: $lng,
                        password: $password,
                        password_confirmation: $password_confirmation
                    }) {
                        access_token,
                        user {
                            name,
                            email,
                            phone,
                            girl {
                                first_name,
                                last_name,
                                gender
                            }                            
                        }
                    }
                }
            ',
            'variables' => $data->all()
        ]);

    }

    /**
     * @param $phone
     * @return \Illuminate\Foundation\Testing\TestResponse
     */
    protected function sendCode($phone)
    {
        return $this->postGraphQL([
            'query'     => '
                mutation ($phone: String!) {
                    sendVerificationCode(input: {
                        phone: $phone
                    }) {
                        status
                    }
                }
            ',
            'variables' => [
                'phone' => $phone
            ],
        ]);
    }

    /**
     * @param $phone
     * @param $code
     * @return \Illuminate\Foundation\Testing\TestResponse
     */
    protected function confirmCode($phone, $code)
    {
        return $this->postGraphQL([
            'query'     => '
                mutation ($phone: String!, $code: String!) {
                    checkVerificationCode(input: {
                        phone: $phone,
                        code: $code
                    }) {
                        status
                    }
                }
            ',
            'variables' => compact('phone', 'code'),
        ]);
    }
}
