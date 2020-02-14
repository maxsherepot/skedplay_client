<?php declare(strict_types=1);

namespace Modules\Main\Policies;

final class MediaPolicy
{
    public function create()
    {
        return false;
    }

    public function delete()
    {
        return false;
    }

    public function view()
    {
        return false;
    }

//    public function update()
//    {
//        return false;
//    }
}
