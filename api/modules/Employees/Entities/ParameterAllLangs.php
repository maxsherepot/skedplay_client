<?php

namespace Modules\Employees\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ParameterAllLangs extends Model
{
    protected $table = 'parameters';

    public function options(): HasMany
    {
        return $this->hasMany(ParameterOptionAllLangs::class, 'parameter_id');
    }

}
