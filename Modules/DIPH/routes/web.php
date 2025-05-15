<?php

use Illuminate\Support\Facades\Route;
use Modules\DIPH\Http\Controllers\DIPHController;
use Modules\DIPH\Http\Controllers\PatientController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('diph', DIPHController::class)->names('diph');
    Route::resource('patient', PatientController::class)->names('patient');
});
