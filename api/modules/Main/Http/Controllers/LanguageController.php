<?php

namespace Modules\Main\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Arr;
use Modules\Main\Entities\Language;
use Modules\Main\Entities\UiTranslate;

class LanguageController extends Controller
{
    public function languages()
    {
        return response()->json(Language::whereActive(1)->get()->pluck('code'));
    }

    public function translations(string $lang)
    {
        $lang = Language::whereCode($lang)->firstOrFail();

        $translatesFormatted = [];

        $translates = UiTranslate::whereLanguageId($lang->id)->get();

        foreach ($translates as $translate) {
            Arr::set($translatesFormatted, $translate->key, $translate->value);
        }

        return response()->json($translatesFormatted);
    }
}
