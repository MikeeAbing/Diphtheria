<?php

use Illuminate\Support\Facades\Route;
use Modules\DIPH\Http\Controllers\DIPHController;
use Modules\DIPH\Http\Controllers\LabController;
use Modules\DIPH\Http\Controllers\PatientController;
use Modules\DIPH\Http\Controllers\ConsultationController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('diph', DIPHController::class)->names('diph');
    Route::resource('patient', PatientController::class)->names('patient');
    Route::resource('lab', LabController::class)->names('lab');

    Route::resource('consultation', ConsultationController::class)->names('consultation');
    Route::get('/diph/{id}/print', [DIPHController::class, 'print'])->name('diph.print');
    Route::post('/api/jsonfile', [DIPHController::class, 'jsonFile']);
});