<?php

namespace Modules\DIPH\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Modules\DIPH\Models\Lab;

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
        $this->merge([
            'case_id' => $this->input('case_id') ?? substr((string) Str::uuid(), 0, 50),
            'API_labdata_ID' => Lab::max('API_labdata_ID') + 1 ?? 0,
        ]);
    }
}