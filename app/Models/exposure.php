<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class exposure extends Model
{
    protected $table = 'ref_diph_exposure';
    protected $fillable = [
        'id',
        'exposure_code',
        'exposure_desc',
      
    ];
}
