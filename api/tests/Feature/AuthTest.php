<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Collection;
use Modules\Users\Entities\User;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use DatabaseTransactions;

    public function getPhone()
    {
        $user = factory(User::class)->create([
            'phone' => '+41 79 123 45 67'
        ]);
        return $user->phone;
    }

    public function testLogin()
    {
        $data = collect([
            'username'  => 'client@site.com',
            'password'  => 'password',
            'recaptcha' => 'afdhgedrh',
        ]);

        $this->login($data)->assertJsonStructure([
            'data' => [
                'login' => [
                    'access_token',
                    'refresh_token',
                    'expires_in',
                    'token_type',
                    'user' => [
                        'id',
                        'name',
                        'phone',
                        'email',
                    ]
                ]
            ]
        ]);
    }

    public function testLogout()
    {
        $data = collect([
            'username'  => 'client@site.com',
            'password'  => 'password',
            'recaptcha' => 'afdhgedrh',
        ]);

        $response = $this->login($data);
        $token = $response->json("data.login.access_token");

        $this->logout($token)->assertJson([
            'data' => [
                'logout' => [
                    'status'  => 'TOKEN_REVOKED',
                    'message' => 'Your session has been terminated',
                ]
            ]
        ]);
    }

    public function testForgotPassword()
    {
        $this->forgotPassword(
            $this->getPhone(),
            )->assertJson([
            'data' => [
                'forgotPassword' => [
                    'status'  => true,
                    'message' => 'verification.send.success'
                ]
            ]
        ]);
    }

    public function testResetPassword()
    {
        $phone = $this->getPhone();

        $data = collect([
            'phone'                 => $phone,
            'code'                  => '0000',
            'recaptcha'             => '',
            'password'              => 'newpassword',
            'password_confirmation' => 'newpassword',
        ]);

        $this->forgotPassword($phone);

        $this->resetPassword(
            $data,
            )->assertJson([
            'data' => [
                'resetPassword' => [
                    'status'  => true,
                    'message' => 'verification.check.success'
                ]
            ]
        ]);
    }

    public function testRefreshToken()
    {
        $data = collect([
            'username'  => 'client@site.com',
            'password'  => 'password',
            'recaptcha' => 'afdhgedrh',
        ]);

        $response = $this->login($data);
        $refresh_token = $response->json("data.login.refresh_token");

        $this->refreshToken($refresh_token)->assertJsonStructure([
            'data' => [
                'refreshToken' => [
                    'access_token',
                    'refresh_token',
                    'expires_in',
                    'token_type',
                ]
            ]
        ]);
    }

    protected function login(Collection $data)
    {
        return $this->postGraphQL([
            'query'     => '
                mutation ($username: String!, $password: String!, $recaptcha: String!) {
                    login(input: {
                        username: $username
                        password: $password
                        recaptcha: $recaptcha
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

    protected function logout($token)
    {
        return $this->postGraphQL([
            'query' => '
                mutation {
                    logout {
                        status
                        message
                    }
                }
            ',
        ], [
            'Authorization' => "Bearer $token"
        ]);
    }

    protected function forgotPassword($phone)
    {
        return $this->postGraphQL([
            'query'     => '
                mutation($phone: String!, $recaptcha: String!) {
                    forgotPassword(input: { phone: $phone, recaptcha: $recaptcha }) {
                        expires_at
                        status
                        message
                    }
                }
            ',
            'variables' => [
                'phone'     => $phone,
                'recaptcha' => 'afafafaf',
            ]
        ]);
    }

    protected function resetPassword(Collection $data)
    {
        return $this->postGraphQL([
            'query'     => '
                mutation($phone: String!, $code: String!, $password: String!, $password_confirmation: String!) {
                    resetPassword(input: { phone: $phone,  code: $code, password: $password, password_confirmation: $password_confirmation }) {
                        status
                        message
                    }
                }
            ',
            'variables' => $data->all()
        ]);
    }

    protected function refreshToken($refresh_token)
    {
        return $this->postGraphQL([
            'query'     => '
                mutation($refresh_token: String!) {
                    refreshToken(input: { refresh_token: $refresh_token }) {
                        access_token
                        refresh_token
                        expires_in
                        token_type
                    }
                }
            ',
            'variables' => [
                'refresh_token' => $refresh_token
            ]
        ]);
    }
}
