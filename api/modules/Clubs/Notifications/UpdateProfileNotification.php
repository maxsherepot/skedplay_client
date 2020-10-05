<?php

namespace Modules\Clubs\Notifications;

use Illuminate\Bus\Queueable;
use Modules\Clubs\Entities\Club;
use Illuminate\Support\Facades\Log;
use Illuminate\Notifications\Notification;
use Modules\Common\Entities\EmailTemplate;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class UpdateProfileNotification extends Notification implements ShouldQueue
{
    use Queueable;

    private $club;
    public const TEMPLATE_KEY = 'club_update_profile';

    /**
     * Create a new notification instance.
     *
     * @return void
     */

    public function __construct(Club $club)
    {
        $this->club = $club;
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

        $link = config('app.front_app_url') . '/clubs/' . $this->club->id . '/information/';
        $text = str_replace(
                $template->text_variables,
            [
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
