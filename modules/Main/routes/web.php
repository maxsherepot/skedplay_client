<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('test', function () {
//        $page = \Modules\Main\Entities\Pages\Page::with('translations')->find(1);
    $page = \Modules\Main\Entities\Pages\Page::create([
        'name'        => 'Name in English',
        'description' => 'Desc'
    ]);

    return $page;
});