<?php


namespace Modules\Main\Entities;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class MediaView extends Model
{
    protected $table = 'media_views';

    protected $primaryKey = 'media_id';

    protected $fillable = ['media_id','seen'];

}
