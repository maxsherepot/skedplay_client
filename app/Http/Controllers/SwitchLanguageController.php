<?php

namespace App\Http\Controllers;

class SwitchLanguageController extends Controller
{
    public function __invoke($lang)
    {
        $referer = redirect()->back()->getTargetUrl();
        $segments = explode('/', parse_url($referer, PHP_URL_PATH));

        if (isset(LanguageService::getPrefixes()[$segments[1]])) {
            unset($segments[1]);
        }

        $url = request()->root() . implode("/", $segments);
        if (parse_url($referer, PHP_URL_QUERY)) {
            $url = $url . '?' . parse_url($referer, PHP_URL_QUERY);
        }

        return redirect($url);
    }
}
