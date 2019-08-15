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

/*
 * Todo: Move this two routes in react
 */
Route::get('/payment/checkout/{order}/completed', [App\Http\Controllers\PaymentController::class, 'completed'])
    ->name('payment.checkout.completed');
Route::get('/payment/checkout/{order}/cancelled', [App\Http\Controllers\PaymentController::class, 'cancelled'])
    ->name('payment.checkout.cancelled');


Route::post('/webhook/payment/{order?}/{env?}', [App\Http\Controllers\PaymentController::class, 'webhook'])
    ->name('webhook.payment.ipn');

Route::get('/{any}', [App\Http\Controllers\AppController::class, 'render'])->where('any', '.*');