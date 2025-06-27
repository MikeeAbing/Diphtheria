<?php

namespace Modules\DIPH\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Modules\DIPH\Models\Consultation;

class ConsultationFormRequest extends FormRequest
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
            'consultation_id'  => ['required'],
            'consultation_date'  => ['required'],
            'consultation_time'  => ['required'],
            'mode_of_transaction'  => ['required'],
            'type_of_consultation'  => ['required'],
            'chief_complaint'  => ['nullable'],

        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
        'consultation_id'=> Consultation::max('consultation_id')+1??1
        ]);
    }
}
