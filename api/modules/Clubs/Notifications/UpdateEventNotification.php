<?php

namespace Modules\Clubs\Notifications;

use Illuminate\Bus\Queueable;
use Modules\Clubs\Entities\Club;
use Modules\Events\Entities\Event;
use Illuminate\Notifications\Notification;
use Modules\Common\Entities\EmailTemplate;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class UpdateEventNotification extends Notification implements ShouldQueue
{
    use Queueable;

    private $club;
    private $event;
    public const TEMPLATE_KEY = 'club_update_event';

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Club $club, Event $event)
    {
        $this->club = $club;
        $this->event = $event;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param mixed $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $template = EmailTemplate::where('key', self::TEMPLATE_KEY)->first();

        $link = config('app.front_app_url') . '/employees/'.$this->club->id.'/events/'.$this->event->id;
        $text = str_replace(
                $template->text_variables,
            [
                $this->event->title,
                $this->club->name,
            ],
            $template->text
        );

        return (new MailMessage)
                    ->subject($template->subject)
                    ->line($text)
                    ->action($template->button_text, $link);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
