<?php

namespace Modules\Main\Services\Mail;

use Illuminate\Mail\Mailable;
use Modules\Events\Entities\Event;

class SubscribersEventNotification extends Mailable
{
    /**
     * @var Event
     */
    private $event;

    /**
     * @var string
     */
    private $link;

    public function __construct(Event $event)
    {
        $this->event = $event;
        $this->link = rtrim(env('APP_URL'),'/').'/events/'.$this->event->id;
    }

    /**
     * @return SubscribersEventNotification
     */
    public function build(): SubscribersEventNotification
    {
        return $this->view('mail.new-event')
            ->from('admin@gmail.com')
            ->subject('New Event!')
            ->with([
                'name' => $this->event->title,
                'link' => $this->link,
            ]);
    }
}
