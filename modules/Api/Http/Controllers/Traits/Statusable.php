<?php declare(strict_types=1);

namespace Modules\Api\Http\Controllers\Traits;

trait Statusable
{
    /**
     * @param string|null $message
     * @return array
     */
    protected function success(string $message = null): array
    {
        return $this->getStatusWithPayload(true, $message);
    }

    /**
     * @param string|null $message
     * @return array
     */
    protected function fail(string $message = null): array
    {
        return $this->getStatusWithPayload(false, $message);
    }

    /**
     * @param bool $status
     * @param null $message
     * @return array
     */
    protected function getStatusWithPayload($status = true, $message = null): array
    {
        return [
            'status'  => $status,
            'message' => $message
        ];
    }
}
