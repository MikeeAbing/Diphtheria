<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DiphSource extends Model
{
    //
    protected $table = 'ref_diph_source';
    protected $fillable = [
        'id',
        'source_code',
        'source_desc',
      
    ];
}
