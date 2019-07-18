<?php declare(strict_types=1);

namespace Modules\Users\Services\SmsVerification\Clients;

use Modules\Users\Services\SmsVerification\Exceptions\SenderException;

/**
 * Class NexmoSmsClient
 */
class NexmoSmsClient implements SmsClientInterface
{
    const EXPECTED_HTTP_STATUS = 0;

    /**
     * @var \Nexmo\Client
     */
    private $client;

    public function __construct($key, $secret)
    {
        $basic = new \Nexmo\Client\Credentials\Basic($key, $secret);
        $this->client = new \Nexmo\Client($basic);
    }

    /**
     * Send SMS via provider
     * @param string $to
     * @param string $text
     * @return bool
     * @throws SenderException
     */
    public function send(string $to, string $text): bool
    {
        try {
            $message = $this->client->message()->send([
                'to'   => $to,
                'from' => 'Verification center',
                'text' => $text
            ]);
            $response = $message->getResponseData();

            if ($response['messages'][0]['status'] !== self::EXPECTED_HTTP_STATUS) {
                return true;
            } else {
                throw new SenderException('SMS was not sent', $response['messages']);
            }
        } catch (\Exception $e) {
            throw new SenderException('SMS sending was failed', null, 0, $e);
        }
    }
}