<?php

namespace Modules\Common\Entities;

use Illuminate\Database\Eloquent\Model;

class HelpCenterCategoryAllLangs extends Model
{
    protected $table = 'help_center_categories';

    public function topics()
    {
        return $this->hasMany(HelpCenterTopicAllLangs::class, 'category_id');
    }

    public function newQuery()
    {
        return parent::newQuery()->orderBy('sort_order');
    }
}
