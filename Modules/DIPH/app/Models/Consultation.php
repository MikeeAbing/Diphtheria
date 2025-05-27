<?php

namespace Modules\DIPH\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use IndexZer0\EloquentFiltering\Filter\Contracts\AllowedFilterList;
use IndexZer0\EloquentFiltering\Filter\Filterable\Filter;
use IndexZer0\EloquentFiltering\Filter\FilterType;
use IndexZer0\EloquentFiltering\Filter\Traits\Filterable;
use IndexZer0\EloquentFiltering\Contracts\IsFilterable;


use ParagonIE\CipherSweet\BlindIndex;
use ParagonIE\CipherSweet\EncryptedRow;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\LaravelCipherSweet\Concerns\UsesCipherSweet;
use Spatie\LaravelCipherSweet\Contracts\CipherSweetEncrypted;
use Spatie\Permission\Traits\HasRoles;

class Consultation extends Model implements IsFilterable
{

  
    use Filterable;
   

    protected $table = 'patient_consultation';
    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'patient_number',
        'consultation_id',
        'consultation_date',
        'consultation_time',
        'mode_of_transaction',
        'type_of_consultation',
        'chief_complaint',
    
     
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
 

    public function allowedFilters(): AllowedFilterList
    {
        return Filter::only(
            Filter::field('patient_number', [FilterType::EQUAL]),
           
        );
    }

    /**
     * The attributes that are mass assignable.
     *  @var array
     */
  

    /**
     * Access the full name of the user
     *
     * @return string
     */
    protected $with = [];
  
    public function patient(){
        return $this->belongsTo(Patient::class, 'patient_number', 'patient_number');
    }
   
}
