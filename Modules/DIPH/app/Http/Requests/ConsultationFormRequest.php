<?php

namespace Modules\DIPH\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

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
        
        
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
        'patient_number'=> $this->input('patient_number') ?? substr((string) Str::uuid(), 0, 30)
        ]);
    }
}
