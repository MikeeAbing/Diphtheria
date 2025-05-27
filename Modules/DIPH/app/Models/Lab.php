<?php

namespace Modules\DIPH\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
// use Modules\DIPH\Database\Factories\LabFactory;

class Lab extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     */
    protected $table = 'specimen';

    protected $fillable = [
        'case_id',
        'API_ID',
        'epi_id',
        'date_specimen_collected',
        'specimen_type',
        'lab_sent_RITM',
        'date_sent_RITM',
        'date_received_by_lab',
        'time_received_by_lab',
        'lab_received_by',
        'type_test',
        'date_testing',
        'lab_result',
        'date_result',
        'typeoforganism',
        'interpretation',
        'remarks',
        'updatedby_RITM',
        'last_modified_by_RITM',
        'last_modified_date_RITM',
        'API_labdata_ID',
    ];
}
