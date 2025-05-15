<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Outcome extends Model
{
    protected $table = 'ref_outcome';
    protected $fillable = [
        'id',
        'outcome_code',
        'outcome_description',
      
    ];
}
