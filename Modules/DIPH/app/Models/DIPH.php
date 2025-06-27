<?php

namespace Modules\DIPH\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

use Modules\IAM\Models\User;
use ParagonIE\CipherSweet\BlindIndex;
use ParagonIE\CipherSweet\EncryptedRow;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\LaravelCipherSweet\Concerns\UsesCipherSweet;
use Spatie\LaravelCipherSweet\Contracts\CipherSweetEncrypted;
use Spatie\Permission\Traits\HasRoles;

use IndexZer0\EloquentFiltering\Contracts\IsFilterable;
use IndexZer0\EloquentFiltering\Filter\Traits\Filterable;
use IndexZer0\EloquentFiltering\Filter\Contracts\AllowedFilterList;
use IndexZer0\EloquentFiltering\Filter\Filterable\Filter;
use IndexZer0\EloquentFiltering\Filter\FilterType;

class DIPH extends Model implements IsFilterable
{
    use SoftDeletes;
    // use UsesCipherSweet;
    use Filterable;

    protected $table = 'case_report';

    protected $fillable = [

        'case_id',
        'epi_id',
        'patient_number',
        'disease_age',
        'admitted',
        'date_admitted',
        'caregiver',
        'caregiver_no',
        'date_report',
        'reporter',
        'reporter_no',
        'date_investigation',
        'investigator',
        'investigator_no',
        'diphtheria_dose',
        'total_dose',
        'date_last_vaccination',
        'sourceinformation',
        'known_exposure',
        'exposure_other',
        'name_school',
        'travel14days',
        'travel_detail',
        'date_onset',
        'fever',
        'cough',
        'sorethroat',
        'pseudomembrane',
        'swallowing',
        'breathing',
        'other_symptoms',
        'other_symptoms_specify',
        'outcome',
        'datedied',
        'antibiotic',
        'antibiotic_date',
        'diphtheriatoxin',
        'diphtheriatoxin_date',
        'final_classi',
        'user_id',
        'timestamp',
        'verification_level',
        'case_code',
        'last_modified_by',
        'last_modified_date_patient',
        'last_modified_date_disease',
        'last_modified_date_lab',
        'hfhudcode',
        'datevalidated_resu',
        'user_citycode',
        'user_provcode',
        'user_regcode',
        'charteredcity',
        'dohretained',
        'hfhudcode_pesu',
        'hfhudcode_resu',
        'duplicate',
        'timelapse_dateadmittodateencode',
        'timelapse_dateonsettodateencode',
        'timelapse_dateencodetodatevalidatedresu',
        'ageinmonths',
        'ageindays',
        'morbiditymonth',
        'pidsr_status',
    ];

    protected $with = [];

    public function allowedFilters(): AllowedFilterList
    {
        return Filter::only(
            Filter::field('first_name', [FilterType::EQUAL]),
            Filter::field('middlename', [FilterType::EQUAL]),
            Filter::field('lastname', [FilterType::EQUAL])
        );
    }
    /**
     * The attributes that are mass assignable.
     *  @var array
     */
    // public static function configureCipherSweet(EncryptedRow $encryptedRow): void
    // {
    //     $encryptedRow
    //         ->addOptionalTextField('admitted')
    //         ->addBlindIndex('admitted', new BlindIndex('admitted_index'))
    //         ->addOptionalTextField('date_admitted')
    //         ->addBlindIndex('date_admitted', new BlindIndex('date_admitted_index'))
    //         ->addOptionalTextField('case_id')
    //         ->addBlindIndex('case_id', new BlindIndex('case_id_index'))
    //         ->addOptionalTextField('caregiver')
    //         ->addBlindIndex('caregiver', new BlindIndex('caregiver_index'))
    //         ->addOptionalTextField('caregiver_no')
    //         ->addBlindIndex('caregiver_no', new BlindIndex('caregiver_no_index'))
    //         ->addOptionalTextField('date_report')
    //         ->addBlindIndex('date_report', new BlindIndex('date_report_index'))
    //         ->addOptionalTextField('reporter')
    //         ->addBlindIndex('reporter', new BlindIndex('reporter_index'))
    //         ->addOptionalTextField('reporter_no')
    //         ->addBlindIndex('reporter_no', new BlindIndex('reporter_no_index'))
    //         ->addOptionalTextField('date_investigation')
    //         ->addBlindIndex('date_investigation', new BlindIndex('date_investigation_index'))
    //         ->addOptionalTextField('investigator')
    //         ->addBlindIndex('investigator', new BlindIndex('investigator_index'))
    //         ->addOptionalTextField('investigator_no')
    //         ->addBlindIndex('investigator_no', new BlindIndex('investigator_no_index'))
    //         ->addOptionalTextField('diphtheria_dose')
    //         ->addBlindIndex('diphtheria_dose', new BlindIndex('diphtheria_dose_index'))
    //         ->addOptionalTextField('total_dose')
    //         ->addBlindIndex('total_dose', new BlindIndex('total_dose_index'))
    //         ->addOptionalTextField('date_last_vaccination')
    //         ->addBlindIndex('date_last_vaccination', new BlindIndex('date_last_vaccination_index'))
    //         ->addOptionalTextField('sourceinformation')
    //         ->addBlindIndex('sourceinformation', new BlindIndex('sourceinformation_index'))
    //         ->addOptionalTextField('known_exposure')
    //         ->addBlindIndex('known_exposure', new BlindIndex('known_exposure_index'))
    //         ->addOptionalTextField('exposure_other')
    //         ->addBlindIndex('exposure_other', new BlindIndex('exposure_other_index'))
    //         ->addOptionalTextField('name_school')
    //         ->addBlindIndex('name_school', new BlindIndex('name_school_index'))
    //         ->addOptionalTextField('travel14days')
    //         ->addBlindIndex('travel14days', new BlindIndex('travel14days_index'))
    //         ->addOptionalTextField('travel_detail')
    //         ->addBlindIndex('travel_detail', new BlindIndex('travel_detail_index'))
    //         ->addOptionalTextField('date_onset')
    //         ->addBlindIndex('date_onset', new BlindIndex('date_onset_index'))
    //         ->addOptionalTextField('fever')
    //         ->addBlindIndex('fever', new BlindIndex('fever_index'))
    //         ->addOptionalTextField('cough')
    //         ->addBlindIndex('cough', new BlindIndex('cough_index'))
    //         ->addOptionalTextField('sorethroat')
    //         ->addBlindIndex('sorethroat', new BlindIndex('sorethroat_index'))
    //         ->addOptionalTextField('pseudomembrane')
    //         ->addBlindIndex('pseudomembrane', new BlindIndex('pseudomembrane_index'))
    //         ->addOptionalTextField('swallowing')
    //         ->addBlindIndex('swallowing', new BlindIndex('swallowing_index'))
    //         ->addOptionalTextField('breathing')
    //         ->addBlindIndex('breathing', new BlindIndex('breathing_index'))
    //         ->addOptionalTextField('other_symptoms')
    //         ->addBlindIndex('other_symptoms', new BlindIndex('other_symptoms_index'))
    //         ->addOptionalTextField('other_symptoms_specify')
    //         ->addBlindIndex('other_symptoms_specify', new BlindIndex('other_symptoms_specify_index'))
    //         ->addOptionalTextField('outcome')
    //         ->addBlindIndex('outcome', new BlindIndex('outcome_index'))
    //         ->addOptionalTextField('datedied')
    //         ->addBlindIndex('datedied', new BlindIndex('datedied_index'))
    //         ->addOptionalTextField('antibiotic')
    //         ->addBlindIndex('antibiotic', new BlindIndex('antibiotic_index'))
    //         ->addOptionalTextField('antibiotic_date')
    //         ->addBlindIndex('antibiotic_date', new BlindIndex('antibiotic_date_index'))
    //         ->addOptionalTextField('diphtheriatoxin')
    //         ->addBlindIndex('diphtheriatoxin', new BlindIndex('diphtheriatoxin_index'))
    //         ->addOptionalTextField('diphtheriatoxin_date')
    //         ->addBlindIndex('diphtheriatoxin_date', new BlindIndex('diphtheriatoxin_date_index'))
    //         ->addOptionalTextField('final_classi')
    //         ->addBlindIndex('final_classi', new BlindIndex('final_classi_index'));
    // }

    public function provider(){
        return $this->belongsTo(Patient::class, 'patient_number', 'patient_number');
    }

    public function patient(){
        return $this->belongsTo(Patient::class, 'patient_number', 'patient_number');
    }

    public function lab(){
        return $this->hasOne(Lab::class, 'case_id', 'case_id');
    }

    public function user(){
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function getCanAttribute()
    {
        return [
            'update' => auth()->user()->can('update', $this),
            'delete' => auth()->user()->can('delete', $this),
        ];
    }
}
