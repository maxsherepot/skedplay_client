<?php declare(strict_types=1);

namespace Modules\Common\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Clubs\Entities\Club;
use Modules\Common\Entities\Traits\Schedulable;

class ClubScheduleWork extends Model
{
    use Schedulable;

    protected $table = "club_schedule_work";

    protected $fillable = ['day', 'start', 'end', 'available', 'order', 'club_id'];

    /**
     * @return BelongsTo
     */
    public function club(): BelongsTo
    {
        return $this->belongsTo(Club::class);
    }
}
