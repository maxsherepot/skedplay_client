<?php declare(strict_types=1);

namespace Modules\Api\GraphQL\Mutations\Traits;

trait Statusable
{
    /**
     * @param array $data
     * @return array
     */
    protected function success(array $data = []): array
    {
        return $this->getStatusWithPayload(true, $data);
    }

    /**
     * @param array $data
     * @return array
     */
    protected function fail(array $data = []): array
    {
        return $this->getStatusWithPayload(false, $data);
    }

    /**
     * @param bool $status
     * @param array $data
     * @return array
     */
    protected function getStatusWithPayload($status = true, $data = []): array
    {
        return compact('status', 'data');
    }
}