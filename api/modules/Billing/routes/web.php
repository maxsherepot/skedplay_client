<?php

use Modules\Billing\Http\Controllers\BillingController;

Route::post('/webhook/payment/{transaction?}/{env?}', [BillingController::class, 'webhook']);
