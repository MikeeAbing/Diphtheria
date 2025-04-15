<?php

use Illuminate\Support\Facades\Route;
use Modules\DIPH\Http\Controllers\DIPHController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('diph', DIPHController::class)->names('diph');
});
