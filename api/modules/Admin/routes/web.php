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

Route::prefix('admin')->middleware('admin')->group(function() {
    Route::get('/users/{id}', 'UserController@show');
    Route::post('/users/{id}/confirm', 'UserController@confirm');
    Route::post('/users/{id}/reject', 'UserController@reject');
});
