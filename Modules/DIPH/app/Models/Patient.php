<?php

namespace Modules\DIPH\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Modules\DIPH\Database\Factories\PatientFactory;

class Patient extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [];

    // protected static function newFactory(): PatientFactory
    // {
    //     // return PatientFactory::new();
    // }
}
