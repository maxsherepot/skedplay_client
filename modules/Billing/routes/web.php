<?php

use Modules\Billing\Http\Controllers\BillingController;

Route::post('/webhook/payment/{order?}/{env?}', [BillingController::class, 'webhook'])
    ->name('webhook.payment.ipn');
