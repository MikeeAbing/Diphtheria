<?php

namespace Modules\DIPH\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConsultationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'consultation_id'=>$this->consultation_id,
            'patient_number'=>$this->patient_number,
            'consultation_date' => $this->consultation_date,
            'consultation_time'=>$this->consultation_time,
            'mode_of_transaction'=>$this->mode_of_transaction,
            'type_of_consultation'=>$this->type_of_consultation,
            'chief_complaint'=>$this->chief_complaint,
            'fullname'=>$this->fullname,
            'case_report_id'=>$this->case_report_id,
            'patient' => $this->whenLoaded('patient', function () {
                return PatientDataResource::collection($this->patient);
            })
        ];
    }
}
