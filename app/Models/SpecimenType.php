<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SpecimenType extends Model
{
    protected $table = 'ref_specimen_type';
    protected $fillable = [
        'id',
        'specimen_id',
        'specimen_description',
        'disease',
      
    ];
}
