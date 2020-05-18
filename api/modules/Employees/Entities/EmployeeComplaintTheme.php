<?php

namespace Modules\Employees\Entities;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class EmployeeComplaintTheme extends Model
{
    use HasTranslations;

    protected $fillable = ['name'];

    public $translatable = ['name'];
}
