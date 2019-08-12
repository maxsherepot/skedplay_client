<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Tests\TestCase;

class EmployeeTest extends TestCase
{
    use DatabaseTransactions;

    public function testSearch()
    {
        $this->graphQL('
        {
            employees(filters: {services: [1]}, count: 1) {
                data {
                    first_name
                }
            }
        }
        ')->assertJsonStructure([
            'data' => [
                'employees' => [
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
            employee(id: 1) {
                id
                first_name
                last_name
                gender
                age
            }
        }
        ')->assertJsonStructure([
            'data' => [
                'employee' => [
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
                'updateEmployee' => [
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
                    'updateEmployee' => [
                        'status'  => true,
                        'message' => null,
                    ]
                ]
            ]);
    }

    public function testUploadPhoto()
    {
        return $this->actingAs($this->getUser(), 'api')
            ->uploadPhotoQuery()
            ->assertJsonStructure([
                'data' => [
                    'uploadEmployeePhoto'
                ]
            ]);
    }

    public function testUploadVideo()
    {
        return $this->actingAs($this->getUser(), 'api')
            ->uploadVideoQuery()
            ->assertJsonStructure([
                'data' => [
                    'uploadEmployeeVideo'
                ]
            ]);
    }

//    public function testDeleteUploadedPhoto()
//    {
//        return $this->actingAs($this->getUser(), 'api')
//            ->uploadPhotoQuery()
//            ->assertJsonStructure([
//                'data' => [
//                    'uploadEmployeePhoto'
//                ]
//            ]);
//    }

    protected function update(Collection $data)
    {
        return $this->postGraphQL(
            [
                'query'     => '
                mutation ($id: ID!, $first_name: String!, $last_name: String!, $age: Int!) {
                    updateEmployee(employee: $id, input: {
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

    protected function uploadPhotoQuery()
    {
        return $this->multipartGraphQL(
            [
                'operations' => /* @lang JSON */
                    '
                {
                    "query": "mutation Upload($employee: ID!, $file: Upload!) { uploadEmployeePhoto(employee: $employee, file: $file) }",
                    "variables": {
                        "employee": 1,
                        "file": null
                    }
                }
                ',
                'map'        => /* @lang JSON */
                    '
                    {
                        "0": ["variables.file"]
                    }
                ',
            ],
            [
                '0' => UploadedFile::fake()->create('image.jpg', 500),
            ]
        );
    }

    protected function uploadVideoQuery()
    {
        return $this->multipartGraphQL(
            [
                'operations' => /* @lang JSON */
                    '
                {
                    "query": "mutation Upload($employee: ID!, $file: Upload!) { uploadEmployeeVideo(employee: $employee, file: $file) }",
                    "variables": {
                        "employee": 1,
                        "file": null
                    }
                }
                ',
                'map'        => /* @lang JSON */
                    '
                    {
                        "0": ["variables.file"]
                    }
                ',
            ],
            [
                '0' => UploadedFile::fake()->create('video.avi', 1000),
            ]
        );
    }
}
