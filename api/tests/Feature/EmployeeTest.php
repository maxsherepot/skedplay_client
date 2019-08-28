<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Modules\Employees\Entities\Employee;
use Spatie\MediaLibrary\Models\Media;
use Tests\TestCase;

class EmployeeTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * Todo: Add get photo/video by url tests
     */

    public function testSearch()
    {
        $this->graphQL('
        {
            employees(filters: {services: [1]}, first: 1) {
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
            ->assertJson([
                'data' => [
                    'uploadEmployeeFile' => [
                        'status' => true
                    ]
                ]
            ]);
    }

    public function testUploadVideo()
    {
        return $this->actingAs($this->getUser(), 'api')
            ->uploadVideoQuery()
            ->assertJson([
                'data' => [
                    'uploadEmployeeFile' => [
                        'status' => true
                    ]
                ]
            ]);
    }

    public function testDeleteUploadedPhoto()
    {
        $this->actingAs($this->getUser(), 'api')
            ->uploadPhotoQuery()
            ->assertJson([
                'data' => [
                    'uploadEmployeeFile' => [
                        'status' => true
                    ]
                ]
            ]);

        $media = Media::where([
            'model_type' => (new Employee)->getMorphClass(),
            'model_id'   => 1,
        ])->first();

        $data = collect([
            'employee' => 1,
            'file_id'  => $media->id,
        ]);

        $this->actingAs($this->getUser(), 'api')
            ->deleteFileQuery($data)
            ->assertJson([
                'data' => [
                    'deleteEmployeeFile' => [
                        'status' => true
                    ]
                ]
            ]);
    }

    public function testDeleteUploadedVideo()
    {
        $this->actingAs($this->getUser(), 'api')
            ->uploadVideoQuery()
            ->assertJson([
                'data' => [
                    'uploadEmployeeFile' => [
                        'status' => true
                    ]
                ]
            ]);

        $media = Media::where([
            'model_type' => (new Employee)->getMorphClass(),
            'model_id'   => 1,
        ])->first();

        $data = collect([
            'employee' => 1,
            'file_id'  => $media->id,
        ]);

        $this->actingAs($this->getUser(), 'api')
            ->deleteFileQuery($data)
            ->assertJson([
                'data' => [
                    'deleteEmployeeFile' => [
                        'status' => true
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
                    "query": "mutation Upload($employee: ID!, $collection: String!, $file: Upload!) { uploadEmployeeFile(employee: $employee, collection: $collection, file: $file) { status message } }",
                    "variables": {
                        "employee": 1,
                        "collection": "employee-photo",
                        "file": null
                    }
                }
                ',
                'map'        => /* @lang JSON */
                    '
                    {
                        "file": ["variables.file"]
                    }
                ',
            ],
            [
                'file' => UploadedFile::fake()->image('image.jpg'),
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
                    "query": "mutation Upload($employee: ID!, $collection: String!, $file: Upload!) { uploadEmployeeFile(employee: $employee, collection: $collection, file: $file) { status message } }",
                    "variables": {
                        "employee": 1,
                        "collection": "employee-video",
                        "file": null
                    }
                }
                ',
                'map'        => /* @lang JSON */
                    '
                    {
                        "file": ["variables.file"]
                    }
                ',
            ],
            [
                'file' => UploadedFile::fake()->create('video.avi', 1000),
            ]
        );
    }

    protected function deleteFileQuery(Collection $data)
    {
        return $this->postGraphQL([
            'query'     => '
                mutation ($employee: ID!, $file_id: Int!) {
                    deleteEmployeeFile(employee: $employee, file_id: $file_id) {
                        status
                        message
                    }
                }
            ',
            'variables' => $data->all(),
        ]);
    }
}
