<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Modules\Users\Entities\User;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use DatabaseTransactions;
    use WithFaker;

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
        $this->sendCode($this->getPhone(), Str::random(15))->assertJson([
            'data' => [
                'sendVerificationCode' => [
                    'status' => true,
                ],
            ],
        ]);
    }

    public function testConfirmCode()
    {
        $this->sendCode($this->getPhone(), Str::random(15));

        $this->confirmCode($this->getPhone(), '0000')->assertJson([
            'data' => [
                'checkVerificationCode' => [
                    'status' => true,
                ],
            ],
        ]);
    }

    public function testRegistrationEmployee()
    {
        $data = collect([
            'first_name'   => 'Natasha',
            'last_name'    => 'Whoreman',
            'email'        => 'natashawhorewoomen666@site.com',
            'birthday'     => '1992-02-25',
            'phone'        => $this->getPhone(),
            'gender'       => User::GENDER_FEMALE,
            'account_type' => User::ACCOUNT_EMPLOYEE,
            'plan_id'      => 1,
            'recaptcha'    => Str::random(15),
        ]);

        $this->registration($data)->assertJsonStructure([
            'data' => [
                'register' => [
                    'access_token',
                    'user' => [
                        'name',
                        'email',
                        'phone',
                        'employee' => [
                            'first_name',
                            'last_name',
                            'gender',
                        ],
                    ],
                ],
            ],
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

        $this->sendCode($phone, $data->get('recaptcha'));
        $this->confirmCode($phone, '0000');

        return $this->postGraphQL([
            'query'     => '
                mutation (
                    $plan_id: Int,
                    $phone: String!,
                    $email: String!,
                    $first_name: String!,
                    $last_name: String,
                    $birthday: Date,
                    $gender: Int,
                    $account_type: String!,
                    $club_type_id: Int,
                    $lat: String,
                    $lng: String,
                    $password: String!,
                    $password_confirmation: String!
                    $recaptcha: String!
                ) {
                    register(input: {
                        plan_id: $plan_id,
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
                        recaptcha: $recaptcha
                    }) {
                        access_token,
                        user {
                            name,
                            email,
                            phone,
                            employee {
                                first_name,
                                last_name,
                                gender
                            }
                        }
                    }
                }
            ',
            'variables' => $data->all(),
        ]);
    }

    /**
     * @param $phone
     * @param $recaptcha
     *
     * @return \Illuminate\Testing\TestResponse
     */
    protected function sendCode($phone, $recaptcha)
    {
        return $this->postGraphQL([
            'query'     => '
                mutation ($phone: String!, $recaptcha: String!) {
                    sendVerificationCode(input: {
                        phone: $phone,
                        recaptcha: $recaptcha
                    }) {
                        status
                    }
                }
            ',
            'variables' => [
                'phone'     => $phone,
                'recaptcha' => $recaptcha,
            ],
        ]);
    }

    /**
     * @param $phone
     * @param $code
     *
     * @return \Illuminate\Testing\TestResponse
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
