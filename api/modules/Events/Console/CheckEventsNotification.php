<?php

namespace Modules\Events\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use Modules\Common\Repositories\SubscribeClubRepository;
use Modules\Main\Repositories\EventRepository;
use Modules\Main\Services\Mail\SubscribersEventNotification;

class CheckEventsNotification extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'events:check:notification';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send notification for subscribers if
                              events is confirm and not sending yet'
    ;

    /**
     * @var EventRepository
     */
    protected $events;

    /**
     * @var SubscribeClubRepository
     */
    protected $subscribers;

    /**
     * Create a new command instance.
     *
     * @param EventRepository $events
     * @param SubscribeClubRepository $subscribers
     */
    public function __construct(EventRepository $events, SubscribeClubRepository $subscribers)
    {
        parent::__construct();
        $this->events = $events;
        $this->subscribers = $subscribers;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $eventsToSend = $this->events->getEventsToNotification();

        if ($eventsToSend === null) {
            return;
        }

        foreach ($eventsToSend as $event) {
            $subscribersToSend = $this->subscribers->getSubscribersByClubId($event->club_id);

            foreach ($subscribersToSend as $subscriber) {
                try {
                    Mail::to($subscriber->email)
                        ->send(new SubscribersEventNotification($event));

                    $this->info(sprintf('Sent to %s', $subscriber->email));

                    sleep(5);
                } catch (\Throwable $exception) {
                    $this->info($exception->getMessage());
                }
            }

            $event->isSent = true;
            $event->save();
        }
    }
}
