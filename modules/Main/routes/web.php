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
    /** @var \Modules\Users\Entities\User $user */
    $user = \Modules\Users\Entities\User::find(4);

    $plan = \Modules\Main\Services\Cashier\Plan::where('name', 'free')->first();

    $user->newSubscription('main', $plan->id)
        ->create();

    return 'ok';
});