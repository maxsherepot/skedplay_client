<?php declare(strict_types=1);

namespace Modules\Users\Services\Verification\Traits;

use Illuminate\Support\Collection;

trait Statusable
{
    /**
     * @param string|null $message
     * @return Collection
     */
    protected function success(string $message = null): Collection
    {
        return $this->getStatusWithPayload(true, $message);
    }

    /**
     * @param string|null $message
     * @return Collection
     */
    protected function fail(string $message = null): Collection
    {
        return $this->getStatusWithPayload(false, $message);
    }

    /**
     * @param bool $status
     * @param null $message
     * @return Collection
     */
    protected function getStatusWithPayload($status = true, $message = null): Collection
    {
        return collect([
            'status'  => $status,
            'message' => $message
        ]);
    }
}
