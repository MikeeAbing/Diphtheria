<?php

use Illuminate\Support\Facades\Route;
use Modules\DIPH\Http\Controllers\DIPHController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('diph', DIPHController::class)->names('diph');
});
