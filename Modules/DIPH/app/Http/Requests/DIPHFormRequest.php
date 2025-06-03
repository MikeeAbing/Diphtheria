<?php

namespace Modules\DIPH\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Modules\DIPH\Models\DIPH;
use Number;


class DIPHFormRequest extends FormRequest
{/**
 * Determine if the user is authorized to make this request.
 * @return bool
 */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     * @return array
     */
    public function rules()
    {
        return [
            'case_id' => ['required'],
            'patient_number' => ['nullable'],
            'admitted' => ['nullable'],
            'date_admitted' => ['nullable'],
            'caregiver' => ['nullable'],
            'caregiver_no' => ['nullable'],
            'date_report' => ['nullable'],
            'reporter' => ['nullable'],
            'reporter_no' => ['nullable'],
            'date_investigation' => ['nullable'],
            'investigator' => ['nullable'],
            'investigator_no' => ['nullable'],
            'diphtheria_dose' => ['nullable'],
            'total_dose' => ['nullable'],
            'date_last_vaccination' => ['nullable'],
            'sourceinformation' => ['nullable'],
            'known_exposure' => ['nullable'],
            'exposure_other' => ['nullable'],
            'name_school' => ['nullable'],
            'travel14days' => ['nullable'],
            'travel_detail' => ['nullable'],
            'date_onset' => ['nullable'],
            'fever' => ['nullable'],
            'cough' => ['nullable'],
            'sorethroat' => ['nullable'],
            'pseudomembrane' => ['nullable'],
            'swallowing' => ['nullable'],
            'breathing' => ['nullable'],
            'other_symptoms' => ['nullable'],
            'other_symptoms_specify' => ['nullable'],
            'outcome' => ['nullable'],
            'datedied' => ['nullable'],
            'antibiotic' => ['nullable'],
            'antibiotic_date' => ['nullable'],
            'diphtheriatoxin' => ['nullable'],
            'diphtheriatoxin_date' => ['nullable'],
            'final_classi' => ['nullable'],
            'user_id' => ['nullable'],
            'timestamp' => ['nullable'],
            'verification_level' => ['nullable'],
            'case_code' => ['nullable'],
            'last_modified_by' => ['nullable'],
            'last_modified_date_patient' => ['nullable'],
            'last_modified_date_disease' => ['nullable'],
            'last_modified_date_lab' => ['nullable'],
            'hfhudcode' => ['nullable'],
            'datevalidated_resu' => ['nullable'],
            'user_citycode' => ['nullable'],
            'user_provcode' => ['nullable'],
            'user_regcode' => ['nullable'],
            'charteredcity' => ['nullable'],
            'dohretained' => ['nullable'],
            'hfhudcode_pesu' => ['nullable'],
            'hfhudcode_resu' => ['nullable'],
            'duplicate' => ['nullable'],
            'timelapse_dateadmittodateencode' => ['nullable'],
            'timelapse_dateonsettodateencode' => ['nullable'],
            'timelapse_dateencodetodatevalidatedresu' => ['nullable'],
            'ageinmonths' => ['nullable'],
            'ageindays' => ['nullable'],
            'morbiditymonth' => ['nullable'],
            'pidsr_status' => ['nullable'],
        ];
    }
    protected function prepareForValidation(): void
    {
        $this->merge([
            'case_id' => (int) DIPH::max('case_id') + (int) 1 ?? (int) 1,
            'patient_number' => $this->input('patient_number'),
            'user_id' => $this->input('user_id', Auth::user()->id),
            'timestamp' => $this->input('timestamp', Carbon::now()->format('Y-m-d H:i:s')),
            'verification_level' => $this->input('verification_level', null),
            'case_code' => $this->input('case_code', null),
            'last_modified_by' => $this->input('last_modified_by', Auth::user()->first_name . ' ' . Auth::user()->last_name),
            'last_modified_date_patient' => $this->input('last_modified_date_patient', null),
            'last_modified_date_disease' => $this->input('last_modified_date_disease', null),
            'last_modified_date_lab' => $this->input('last_modified_date_lab', null),
            'hfhudcode' => $this->input('hfhudcode', null),
            'datevalidated_resu' => $this->input('datevalidated_resu', null),
            'user_citycode' => $this->input('user_citycode', null),
            'user_provcode' => $this->input('user_provcode', null),
            'user_regcode' => $this->input('user_regcode', null),
            'charteredcity' => $this->input('charteredcity', null),
            'dohretained' => $this->input('dohretained', null),
            'hfhudcode_pesu' => $this->input('hfhudcode_pesu', null),
            'hfhudcode_resu' => $this->input('hfhudcode_resu', null),
            'duplicate' => $this->input('duplicate', null),
            'timelapse_dateadmittodateencode' => $this->input('timelapse_dateadmittodateencode', null),
            'timelapse_dateonsettodateencode' => $this->input('timelapse_dateonsettodateencode', null),
            'timelapse_dateencodetodatevalidatedresu' => $this->input('timelapse_dateencodetodatevalidatedresu', null),
            'ageinmonths' => $this->input('ageinmonths', null),
            'ageindays' => $this->input('ageindays', null),
            'morbiditymonth' => $this->input('morbiditymonth', null),
            'pidsr_status' => $this->input('pidsr_status', "PENDING"),
        ]);
    }
}
