<?php

namespace Modules\Clubs\Observers;

use Carbon\Carbon;
use Modules\Clubs\Entities\Club;
use Modules\Users\Entities\User;
use Modules\Users\Repositories\ClubRepository;

/**
 * Class ClubObserver
 * @package Modules\Clubs\Observers
 */
class ClubObserver
{
    /** @var ClubRepository */
    protected $clubs;

    public function __construct(ClubRepository $clubs)
    {
        $this->clubs = $clubs;
    }

    public function creating(Club $club): void
    {
        if ($club->comment !== null) {
            $club->comment_set_at = Carbon::now();
        }

        if ($club->manager_id !== null) {
            $club->manager_assignment_at = Carbon::now();
        }
    }

    public function updating(Club $club): void
    {
        $this->setCommentDate($club);
        $this->setManagerAssignmentDate($club);

        if (!request()->user()) {
            return;
        }

        if (!request()->user()->hasRole(User::ACCOUNT_MANAGER)) {
            return;
        }

        $club->manager_id = request()->user()->id;
    }

    public function setCommentDate(Club $club): void
    {
        $club_info = $this->clubs->find($club->id);

        if (($club_info !== null) && ($club->comment !== null) && ($club_info->comment !== $club->comment)) {
            $club->comment_set_at = Carbon::now();
        }
    }

    public function setManagerAssignmentDate(Club $club): void
    {
        $club_info = $this->clubs->find($club->id);

        if (($club_info !== null) && ($club->manager_id !== null) && ($club_info->manager_id !== $club->manager_id)) {
            $club->manager_assignment_at = Carbon::now();
        }
    }
}
