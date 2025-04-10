<?php

use Illuminate\Support\Facades\Route;
use Modules\NCDRA\Http\Controllers\NCDRAController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('ncdra', NCDRAController::class)->names('ncdra');
});
