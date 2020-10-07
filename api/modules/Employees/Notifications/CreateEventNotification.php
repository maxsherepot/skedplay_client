<?php

namespace Modules\Employees\Notifications;

use Illuminate\Bus\Queueable;
use Modules\Events\Entities\Event;
use Modules\Employees\Entities\Employee;
use Illuminate\Notifications\Notification;
use Modules\Common\Entities\EmailTemplate;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Modules\Employees\Helpers;

class CreateEventNotification extends Notification implements ShouldQueue
{
    use Queueable;

    private $event;
    private $employee;
    public const TEMPLATE_KEY = 'employee_create_event';

    /**
     * Create a new notification instance.
     *
     * @return void
     */

    public function __construct(Employee $employee, Event $event)
    {
        $this->employee = $employee;
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

        $link = Helpers::createFrontEventLink($this->employee, $this->event);

        $text = str_replace(
                $template->text_variables,
            [
                $this->event->title,
                $this->employee->name,
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
