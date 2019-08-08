<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Tests\TestCase;

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

    public function testUploadPhoto()
    {
        return $this->actingAs($this->getUser(), 'api')
            ->uploadPhotoQuery()
            ->assertJsonStructure([
                'data' => [
                    'uploadGirlPhoto'
                ]
            ]);
    }

    public function testUploadVideo()
    {
        return $this->actingAs($this->getUser(), 'api')
            ->uploadVideoQuery()
            ->assertJsonStructure([
                'data' => [
                    'uploadGirlVideo'
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

    protected function uploadPhotoQuery()
    {
        return $this->multipartGraphQL(
            [
                'operations' => /* @lang JSON */
                    '
                {
                    "query": "mutation Upload($girl: ID!, $files: [Upload!]!) { uploadGirlPhoto(girl: $girl, files: $files) }",
                    "variables": {
                        "girl": 1,
                        "files": null
                    }
                }
                ',
                'map'        => /* @lang JSON */
                    '
                    {
                        "0": ["variables.files"]
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
                    "query": "mutation Upload($girl: ID!, $files: [Upload!]!) { uploadGirlVideo(girl: $girl, files: $files) }",
                    "variables": {
                        "girl": 1,
                        "files": null
                    }
                }
                ',
                'map'        => /* @lang JSON */
                    '
                    {
                        "0": ["variables.files"]
                    }
                ',
            ],
            [
                '0' => UploadedFile::fake()->create('video.avi', 1000),
            ]
        );
    }
}
