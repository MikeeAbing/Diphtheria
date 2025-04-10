<?php

use Illuminate\Support\Facades\Route;
use Modules\NCDRA\Http\Controllers\NCDRAController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('ncdra', NCDRAController::class)->names('ncdra');
});
