<?php

namespace Modules\Main\Http\Controllers;

use Illuminate\Routing\Controller;
use Modules\Main\Services\SitemapGenerator;

class SitemapController extends Controller
{
    public function __invoke(SitemapGenerator $sitemapGenerator)
    {
        return $sitemapGenerator->generate()->render('xml');
    }
}
