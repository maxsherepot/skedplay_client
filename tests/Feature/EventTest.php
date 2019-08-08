<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Collection;
use Modules\Clubs\Entities\Club;
use Modules\Events\Entities\Event;
use Modules\Users\Entities\User;
use Tests\TestCase;

class EventTest extends TestCase
{
    use DatabaseTransactions;

    public function testUpdateEventByUser()
    {
        $event = Event::where('owner_type', (new User())->getMorphClass())->first();

        $data = collect([
            'title'         => 'My new title event',
            'description'   => 'About new test event',
            'event_type_id' => 2,
            'club_id'       => 1,
            'event'         => $event->id,
        ]);

        $this->actingAs($this->getUser(), 'api')
            ->update($data)->assertJson([
                'data' => [
                    'updateEvent' => [
                        'status'  => true,
                        'message' => null,
                    ]
                ]
            ]);
    }

    public function testUpdateEventByClub()
    {
        $event = Event::where('owner_type', (new Club())->getMorphClass())->first();

        $data = collect([
            'title'         => 'My new title event',
            'description'   => 'About new test event',
            'event_type_id' => 2,
            'club_id'       => 1,
            'event'         => $event->id,
        ]);

        $this->actingAs($this->getUser('club_owner@site.com'), 'api')
            ->update($data)->assertJson([
                'data' => [
                    'updateEvent' => [
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
                mutation ($event: ID!, $title: String!, $description: String!, $event_type_id: Int! $club_id: Int!) {
                    updateEvent(event: $event, input: {
                        title: $title
                        description: $description
                        event_type_id: $event_type_id
                        club_id: $club_id
                    }) {
                        status
                        message
                    }
                }
            ',
                'variables' => $data->all(),
            ]);
    }

}
