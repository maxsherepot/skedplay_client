<?php

namespace Modules\Main\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Main\Services\Translations\Translatable;

class Page extends Model
{
    use Translatable, SoftDeletes;

    const MORPH_TYPE = 'page';

    public $translatable = ['name', 'description'];

    protected $fillable = [
        'name',
        'description',
    ];

    /**
     * Set $translationModel if you want to overwrite the convention
     * for the name of the translation Model. Use full namespace if applied.
     *
     * The convention is to add "Translation" to the name of the class extending Translatable.
     * Example: City => CityTranslation
     */
    public $translationModel;

    /**
     * This is the foreign key used to define the translation relationship.
     * Set this if you want to overwrite the laravel default for foreign keys.
     *
     * @var
     */
    public $translationForeignKey;
    /**
     * The database field being used to define the locale parameter in the translation model.
     * Defaults to 'locale'.
     *
     * @var string
     */
    public $localeKey;
}
