<?php

namespace Modules\DIPH\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Str;
use Modules\DIPH\Models\Patient;
use Number;

class PatientFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'patient_number' => ['required'],
            'case_id' => ['required'],
            'firstname' => ['required'],
            'middlename' => ['required'],
            'lastname' => ['required'],
            'suffixname' => ['required'],
            'sex' => ['required'],
            'dateofbirth' => ['required'],
            'ageinyears' => ['required'],
            'ageinmonths' => ['required'],
            'ageindays' => ['required'],
            'member_of_IP' => ['required'],
            'IP_tribe' => ['nullable'],
            'IP_tribe_specify' => ['nullable'],
            'pat_address_reg' => ['nullable'],
            'pat_address_prov' => ['nullable'],
            'pat_address_city' => ['nullable'],
            'pat_address_brgy' => ['nullable'],
            'pat_address_street_name' => ['nullable'],
            'pat_perm_address_reg' => ['nullable'],
            'pat_perm_address_prov' => ['nullable'],
            'pat_perm_address_city' => ['nullable'],
            'pat_perm_address_brgy' => ['nullable'],
            'pat_perm_address_street_name' => ['nullable'],
            'facilityname' => ['nullable'],
            'occupation' => ['nullable'],
            'phone_no' => ['nullable'],
        ];
    }

    protected function prepareForValidation(): void
    {
            $userRegion = (string)$this->input('pat_address_reg');
            $encoderRegion = '12';
            $overallRegion = $userRegion.''.$encoderRegion;

            $regionCode = strlen((string) $overallRegion) > 1
            ? (string) $overallRegion . '00'
            : (string) $overallRegion;

        $this->merge([
            'patient_number' => Patient::max('patient_number') + 1 ?? 1,
            'case_id'=>Date::now()->format('Y').'-'.$regionCode.$this->input('firstname')[0].$this->input('lastname')[0].$this->input('ageinyears').$this->input('sex')
        ]);
    }
}
