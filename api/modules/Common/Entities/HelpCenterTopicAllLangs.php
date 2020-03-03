<?php

namespace Modules\Common\Entities;

use Advoor\NovaEditorJs\NovaEditorJs;
use Illuminate\Database\Eloquent\Model;

class HelpCenterTopicAllLangs extends Model
{
    protected $table = 'help_center_topics';

    protected $appends = [
        'content_html'
    ];

    public function getContentHtmlAttribute(): array
    {
        return collect(json_decode($this->content))->map(function($content) {
            return NovaEditorJs::generateHtmlOutput(json_decode($content, true));
        })->toArray();
    }

    public function newQuery()
    {
        return parent::newQuery()->orderBy('sort_order');
    }
}
