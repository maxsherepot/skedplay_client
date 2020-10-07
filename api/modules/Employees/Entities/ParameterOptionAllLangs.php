<?php

namespace Modules\Employees\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Translatable\HasTranslations;
use Modules\Employees\Entities\ParameterAllLangs;

class ParameterOptionAllLangs extends Model
{

    protected $table = 'parameter_options';

    /**
     * @return BelongsTo
     */
    public function parameter(): BelongsTo
    {
        return $this->belongsTo(ParameterAllLangs::class, 'parameter_id');
    }

}
