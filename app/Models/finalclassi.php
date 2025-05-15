<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Finalclassi extends Model
{
    protected $table = 'ref_diph_finalclassi';
    protected $fillable = [
        'id',
        'finalclassi_code',
        'finalclassi_desc',
      
    ];
}
