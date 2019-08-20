<?php

namespace Modules\Users\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Modules\Users\Services\Sms\Channels\SmsChannel;
use Modules\Users\Services\Sms\SmsBuilder;

class ResetPasswordNotification extends Notification
{
    use Queueable;
    /**
     * @var string
     */
    public $message;
    /**
     * @var string
     */
    public $phoneNumber;

    /**
     * Create a new notification instance.
     *
     * @param string $message
     * @param string $phoneNumber
     */
    public function __construct(string $message, string $phoneNumber)
    {
        $this->message = $message;
        $this->phoneNumber = $phoneNumber;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return [SmsChannel::class];
    }

    /**
     * Get the repicients and body of the notification.
     *
     * @param mixed $notifiable
     * @return SmsBuilder
     */
    public function toSms($notifiable)
    {
        return (new SmsBuilder)
            ->send($this->message)
            ->to($this->phoneNumber);
    }
}
