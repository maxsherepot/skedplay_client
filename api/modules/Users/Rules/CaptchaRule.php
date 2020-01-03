<?php

namespace Modules\Users\Rules;

use Illuminate\Contracts\Validation\Rule;
use Modules\Users\Services\Captcha\Captcha;
use Modules\Users\Services\LoginAttemptsCounter;

class CaptchaRule implements Rule
{
    use Captcha;

    private const MAX_LOGIN_ATTEMPTS = 3;

    /**
     * @var LoginAttemptsCounter
     */
    private $attemptsCounter;

    public function __construct()
    {
        $this->attemptsCounter = app()->make(LoginAttemptsCounter::class);
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param string $attribute
     * @param mixed $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        if (!config('recaptcha.enabled')) {
            return true;
        }

        $ip = request()->ip();

        \Log::info('ttemptsCounter->getCount($ip)', [$this->attemptsCounter->getCount($ip) <= self::MAX_LOGIN_ATTEMPTS]);

        if ($this->attemptsCounter->getCount($ip) <= self::MAX_LOGIN_ATTEMPTS) {
            return true;
        }

        return !!$this->checkRecaptcha($value, $ip);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Captcha is invalid.';
    }
}
