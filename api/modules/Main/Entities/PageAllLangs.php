<?php

namespace Modules\Main\Entities;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;
use Advoor\NovaEditorJs\NovaEditorJs;

class PageAllLangs extends Model
{
    protected $table = 'pages';

    protected $appends = [
        'content_html'
    ];

    public function getContentHtmlAttribute()
    {
        if (!$this->content) return null;
        $contentManyLang = json_decode($this->content, true);
        $contentHtml = [];
        foreach ($contentManyLang as $lang => $content) {
            $contentHtml[$lang] = collect($content)
                ->map(fn($c) => NovaEditorJs::generateHtmlOutput($c))
                ->toArray();
        }
        return $contentHtml;
    }
}
