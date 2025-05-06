<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    use HasFactory;

    // Specify the table associated with the model (optional if the table name follows Laravel conventions)
    protected $table = 'ref_prov';

    // Define the fillable attributes (fields that can be mass-assigned)
    protected $fillable = [
        'old_id',
        'id',
        'region_id',
        '10digitPSGC',
        'province_name',
        'geographic_level',
        'income_class',
        'population',
        'created_at',
        'updated_at',
    ];

    // Optionally, you can define the attributes that should be cast to specific types
    protected $casts = [
        'population' => 'integer',
    ];

    // Optionally, you can define relationships if necessary, such as one to Region
    public function region()
    {
        return $this->belongsTo(Region::class, 'region_id');
    }
}
