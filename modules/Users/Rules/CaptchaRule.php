<?php

namespace Modules\Users\Rules;

use Illuminate\Contracts\Validation\Rule;
use Modules\Users\Services\Captcha\Captcha;

class CaptchaRule implements Rule
{
    use Captcha;

    /**
     * Determine if the validation rule passes.
     *
     * @param string $attribute
     * @param mixed $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        if (config('recaptcha.enabled')
            && !$this->checkRecaptcha($value, request()->ip())) {
            return false;
        }

        return true;
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
