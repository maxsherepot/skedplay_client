<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Modules\Clubs\Entities\Club;
use Spatie\MediaLibrary\Models\Media;
use Tests\TestCase;

class ClubTest extends TestCase
{
    use DatabaseTransactions;

    public function testSearch()
    {
        $this->search()
            ->assertJsonStructure([
                'data' => [
                    'clubs' => [
                        'data' => [
                            [
                                'id',
                                'name',
                                'address',
                                'website',
                                'phones',
                                'description',
                                'lat',
                                'lng',
                                'type'      => [
                                    'id',
                                    'name',
                                ],
                                'owner'     => [
                                    'id',
                                    'name',
                                ],
                                'employees' => [
                                    [
                                        'id',
                                        'first_name',
                                        'last_name',
                                        'age',
                                    ]
                                ],
                                'events'    => [
                                    [
                                        'id',
                                        'title',
                                        'description',
                                        'type' => [
                                            'id',
                                            'name',
                                        ]
                                    ]
                                ]
                            ]
                        ]
                    ]
                ]
            ]);
    }

    public function testShow()
    {
        $this->show()->assertJsonStructure([
            'data' => [
                'club' => [
                    'id',
                    'name',
                    'address',
                    'website',
                    'phones',
                    'description',
                    'lat',
                    'lng',
                    'type'      => [
                        'id',
                        'name',
                    ],
                    'owner'     => [
                        'id',
                        'name',
                    ],
                    'employees' => [
                        [
                            'id',
                            'first_name',
                            'last_name',
                            'age',
                        ]
                    ],
                    'events'    => [
                        [
                            'id',
                            'title',
                            'description',
                            'type' => [
                                'id',
                                'name',
                            ]
                        ]
                    ]
                ]
            ]
        ]);
    }

    public function testCreate()
    {
        $user = $this->getUser('club_owner@site.com');

        $data = collect([
            'name'         => 'My club',
            'club_type_id' => 1,
            'email'        => 'testclub@site.com',
            'website'      => 'testclub.com',
            'phones'       => [
                '+41 79 123 45 67',
                '+41 77 124 55 55',
            ],
            'description'  => 'Description my club',
            'address'      => '91310 White Street Apt. 876 Port Corenehaven, IL 92502-9539',
            'lat'          => '58.25163',
            'lng'          => '-21.624057',
        ]);

        $this->actingAs($user, 'api')
            ->create($data)
            ->assertJsonStructure([
                'data' => [
                    'createClub' => [
                        'id',
                        'name',
                        'type',
                        'email',
                        'website',
                        'phones',
                        'description',
                        'address',
                        'lat',
                        'lng',
                    ]
                ]
            ]);
    }

    public function testUpdate()
    {
        $user = $this->getUser('club_owner@site.com');

        $data = collect([
            'id'           => 1,
            'name'         => 'Update my club title',
            'club_type_id' => 1,
            'email'        => 'testclub2@site.com',
            'website'      => 'testclub2.com',
            'phones'       => [
                '+41 79 123 45 61',
                '+41 77 124 55 52',
            ],
            'description'  => 'My new club description',
            'address'      => '91310 White Street Apt. 876 Port Corenehaven, IL 92502-9539',
            'lat'          => '58.25163',
            'lng'          => '-21.624057',
        ]);

        $this->actingAs($user, 'api')
            ->update($data)
            ->assertJson([
                'data' => [
                    'updateClub' => [
                        'status' => true,
                    ]
                ]
            ]);
    }

    public function testUploadPhoto()
    {
        return $this->actingAs($this->getUser('club_owner@site.com'), 'api')
            ->uploadPhotoQuery()
            ->assertJson([
                'data' => [
                    'uploadClubFile' => [
                        'status' => true,
                    ]
                ]
            ]);
    }

    public function testUploadVideo()
    {
        return $this->actingAs($this->getUser('club_owner@site.com'), 'api')
            ->uploadVideoQuery()
            ->assertJson([
                'data' => [
                    'uploadClubFile' => [
                        'status' => true
                    ]
                ]
            ]);
    }

    public function testDeleteUploadedPhoto()
    {
        $this->actingAs($this->getUser('club_owner@site.com'), 'api')
            ->uploadPhotoQuery()
            ->assertJson([
                'data' => [
                    'uploadClubFile' => [
                        'status' => true
                    ]
                ]
            ]);

        $media = Media::where([
            'model_type' => (new Club)->getMorphClass(),
            'model_id'   => 1,
        ])->first();

        $data = collect([
            'club'    => 1,
            'file_id' => $media->id,
        ]);

        $this->actingAs($this->getUser('club_owner@site.com'), 'api')
            ->deleteFileQuery($data)
            ->assertJson([
                'data' => [
                    'deleteClubFile' => [
                        'status' => true
                    ]
                ]
            ]);
    }

    public function testDeleteUploadedVideo()
    {
        $this->actingAs($this->getUser('club_owner@site.com'), 'api')
            ->uploadVideoQuery()
            ->assertJson([
                'data' => [
                    'uploadClubFile' => [
                        'status' => true
                    ]
                ]
            ]);

        $media = Media::where([
            'model_type' => (new Club)->getMorphClass(),
            'model_id'   => 1,
        ])->first();

        $data = collect([
            'club'    => 1,
            'file_id' => $media->id,
        ]);

        $this->actingAs($this->getUser('club_owner@site.com'), 'api')
            ->deleteFileQuery($data)
            ->assertJson([
                'data' => [
                    'deleteClubFile' => [
                        'status' => true
                    ]
                ]
            ]);
    }

    protected function search()
    {
        return $this->graphQL('
        {
            clubs(first: 15, filters: { services: [1], club_type_id: 1 }) {
                data {
                    id
                    name
                    address
                    website
                    phones
                    description
                    lat
                    lng
                    type {
                        id
                        name
                    }
                    owner {
                        id
                        name
                    }
                    employees {
                        id
                        first_name
                        last_name
                        age
                    }
                    events {
                        id
                        title
                        description
                        type {
                            id
                            name
                        }
                    }
                }
            }
        }
    ');
    }

    protected function show()
    {
        return $this->graphQL('
        {
            club(id: 1) {
                    id
                    name
                    address
                    website
                    phones
                    description
                    lat
                    lng
                    type {
                        id
                        name
                    }
                    owner {
                        id
                        name
                    }
                    employees {
                        id
                        first_name
                        last_name
                        age
                    }
                    events {
                        id
                        title
                        description
                        type {
                            id
                            name
                        }
                    }
                }
            }
        ');
    }

    protected function create(Collection $data)
    {
        return $this->postGraphQL(
            [
                'query'     => '
                    mutation (
                        $name: String!,
                        $club_type_id: Int!, 
                        $email: String! 
                        $website: String, 
                        $phones: [String], 
                        $description: String!, 
                        $address: String, 
                        $lat: String 
                        $lng: String
                    ) {
                        createClub(input: {
                            name: $name
                            club_type_id: $club_type_id
                            email: $email
                            website: $website
                            phones: $phones
                            description: $description
                            address: $address
                            lat: $lat
                            lng: $lng
                        }) {
                            id
                            name
                            type {
                                id
                                name
                            }
                            email
                            website
                            phones
                            description
                            address
                            lat
                            lng
                        }
                    }
                ',
                'variables' => $data->all(),
            ],
            );
    }

    protected function update(Collection $data)
    {
        return $this->postGraphQL(
            [
                'query'     => '
                    mutation (
                        $id: ID!,
                        $name: String!,
                        $club_type_id: Int!, 
                        $email: String! 
                        $website: String, 
                        $phones: [String], 
                        $description: String!, 
                        $address: String, 
                        $lat: String 
                        $lng: String
                    ) {
                        updateClub(club: $id, input: {
                            name: $name
                            club_type_id: $club_type_id
                            email: $email
                            website: $website
                            phones: $phones
                            description: $description
                            address: $address
                            lat: $lat
                            lng: $lng
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
                    "query": "mutation Upload($club: ID!, $collection: String!, $file: Upload!) { uploadClubFile(club: $club, collection: $collection, file: $file) { status message } }",
                    "variables": {
                        "club": 1,
                        "collection": "club-photo",
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
                    "query": "mutation Upload($club: ID!, $collection: String!, $file: Upload!) { uploadClubFile(club: $club, collection: $collection, file: $file) { status message } }",
                    "variables": {
                        "club": 1,
                        "collection": "club-video",
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
                mutation ($club: ID!, $file_id: Int!) {
                    deleteClubFile(club: $club, file_id: $file_id) {
                        status
                        message
                    }
                }
            ',
            'variables' => $data->all(),
        ]);
    }
}
