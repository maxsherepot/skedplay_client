<?php

namespace Modules\Employees\Notifications;

use Illuminate\Bus\Queueable;
use Modules\Employees\Entities\Employee;
use Illuminate\Notifications\Notification;
use Modules\Common\Entities\EmailTemplate;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Modules\Employees\Helpers;

class AddedNewPhotoOrVideoNotification extends Notification implements ShouldQueue
{
    use Queueable;

    private $employee;

    public const TEMPLATE_KEY = 'employee_added_new_photo_or_video';

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Employee $employee)
    {
        $this->employee = $employee;
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

        $link = Helpers::createFrontLink($this->employee);

        $text = str_replace(
                $template->text_variables,
            [
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
