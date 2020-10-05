<?php

namespace Modules\Common\Entities;

use Illuminate\Support\Facades\App;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Translation\HasLocalePreference;

class EmailTemplate extends Model
{
    protected $fillable = [
        'key',
        'name',
        'text_variables',
        'subject_en',
        'subject_de',
        'subject_fr',
        'text_en',
        'text_de',
        'text_fr',
        'button_text_en',
        'button_text_de',
        'button_text_fr',
    ];

    protected $casts = [
        'text_variables' => 'json',
    ];

    public function getTextAttribute()
    {
        return $this->{'text_' . App::getLocale()};
    }

    public function getButtonTextAttribute()
    {
        return $this->{'button_text_' . App::getLocale()};
    }

    public function getSubjectAttribute()
    {
        return $this->{'subject_' . App::getLocale()};
    }

}
