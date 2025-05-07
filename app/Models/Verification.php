<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Verification extends Model
{
    protected $table = 'ref_verification_level';
    protected $fillable = [
        'id',
        'verification_code',
        'verification_level',
    ];
}
