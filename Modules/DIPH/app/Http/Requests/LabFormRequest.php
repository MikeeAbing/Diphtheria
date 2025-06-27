<?php

namespace Modules\DIPH\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Modules\DIPH\Models\Lab;
use Modules\DIPH\Models\Patient;

class LabFormRequest extends FormRequest
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
            'case_id' => ['required'],
            'API_ID' => ['nullable'],
            'epi_id' => ['nullable'],
            'date_specimen_collected' => ['nullable'],
            'specimen_type' => ['nullable'],
            'lab_sent_RITM' => ['nullable'],
            'date_sent_RITM' => ['nullable'],
            'date_received_by_lab' => ['nullable'],
            'time_received_by_lab' => ['nullable'],
            'lab_received_by' => ['nullable'],
            'type_test' => ['nullable'],
            'date_testing' => ['nullable'],
            'lab_result' => ['nullable'],
            'date_result' => ['nullable'],
            'typeoforganism' => ['nullable'],
            'interpretation' => ['nullable'],
            'remarks' => ['nullable'],
            'updatedby_RITM' => ['nullable'],
            'last_modified_by_RITM' => ['nullable'],
            'last_modified_date_RITM' => ['nullable'],
            'API_labdata_ID' => ['required'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $currentYear = Carbon::now()->year;

        $case_count = DB::table('case_report')->whereYear('created_at', $currentYear)->count();

        $disease_count = $case_count + 1;

        $specimen_count = DB::table('specimen')->whereYear('created_at', $currentYear)->count();

        $speciment_entry_count = $specimen_count + 1;

        $facility_id = Patient::where('case_id', '=', $this->input('case_id'))
            ->select('facilityname')->get();

        $facilities = [
            ['id' => 3208, 'facilityName' => 'PIDDIG DISTRICT HOSPITAL', 'healthfacilitycode' => 'DOH000000000000001'],
            ['id' => 20067, 'facilityName' => 'CEBU CITY MEDICAL CENTER', 'healthfacilitycode' => 'DOH000000000000002'],
            ['id' => 17768, 'facilityName' => 'DON LEOVIGILDO N. DIAPO SR. MUNICIPAL HOSPITAL', 'healthfacilitycode' => 'DOH000000000000003'],
            ['id' => 24493, 'facilityName' => 'LABASON DISTRICT HOSPITAL', 'healthfacilitycode' => 'DOH000000000000004'],
            ['id' => 10315, 'facilityName' => 'BAGONG POOK DIST. III HEALTH CENTER', 'healthfacilitycode' => 'DOH000000000000005'],
        ];

        $facilityID = 0;

        foreach ($facility_id as $item) {
            $facilityID = $item['facilityname'];
        }

        $facility = collect($facilities)->firstWhere('id', $facilityID);
        $facilitycode = $facility ? substr($facility['healthfacilitycode'], -7) : '';

        $this->merge([
            'API_ID' => Carbon::now()->year . '-' . 'DIP' . '-' . 'iCLINICSYS' . '-' . $disease_count . '-' . $facilitycode,
            'API_labdata_ID' => Carbon::now()->year . '-' . 'DIP' . '-' . 'iCLINICSYS' . '-' . $speciment_entry_count,
        ]);
    }
}
