<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Municipality extends Model
{
    use HasFactory;
    protected $table = 'ref_citymun';
    protected $fillable = [
        'old_id',
        'id',
        'region_id',
        'province_id',
        '10digitPSGC',
        'city_name',
        'geographic_level',
        'city_class',
        'uhc_class',
        'income_class',
        'population',
    ];
    public function region()
    {
        return $this->belongsTo(Region::class, 'region_id');
    }
    public function province()
    {
        return $this->belongsTo(Province::class, 'province_id');
    }
}
