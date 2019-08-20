<?php

namespace Modules\Users\Services\Sms;

class SmsBuilder
{
    /**
     * @var array
     */
    protected $recipients = [];
    /**
     * @var string
     */
    protected $body;
    /**
     * @var string
     */
    protected $driver;

    /**
     * Get the value of recipients
     */
    public function getRecipients()
    {
        return $this->recipients;
    }

    /**
     * Set the value of recipients
     *
     * @param $recipients
     * @return  self
     */
    public function to($recipients)
    {
        $this->recipients = is_array($recipients) ? $recipients : [$recipients];
        return $this;
    }

    /**
     * Get the value of body
     */
    public function getBody()
    {
        return $this->body;
    }

    /**
     * Set the value of body
     *
     * @param $body
     * @return  self
     */
    public function send($body)
    {
        $this->body = $body;
        return $this;
    }

    /**
     * Get the value of driver
     */
    public function getDriver()
    {
        return $this->driver;
    }

    /**
     * Set the value of driver
     *
     * @param $driver
     * @return  self
     */
    public function via($driver)
    {
        $this->driver = $driver;
        return $this;
    }
}