<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Region extends Model
{
    use HasFactory;

    // Specify the table associated with the model (optional if the table name follows Laravel conventions)
    protected $table = 'ref_region';

    // Define the fillable attributes (fields that can be mass-assigned)
    protected $fillable = [
        'old_id',
        'region_id',
        '10digitPSGC',
        'region_name',
        'population',
        'created_at',
        'updated_at',
    ];

    // Optionally, you can define the attributes that should be cast to specific types
    protected $casts = [
        'population' => 'integer',
    ];
    
}
