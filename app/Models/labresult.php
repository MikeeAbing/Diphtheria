<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Labresult extends Model
{
    protected $table = 'ref_lab_result';
    protected $fillable = [
        'id',
        'lab_result',
        'lab_result_desc',
        'disease',
      
    ];
}
