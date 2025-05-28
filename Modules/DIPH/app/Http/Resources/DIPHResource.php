<?php

namespace Modules\DIPH\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DIPHResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'case_id' => $this->case_id,
            'admitted' => $this->admitted,
            'date_admitted' => $this->date_admitted,
            'specimen_id'=>$this->specimen_id,
            'consultation_id'=>$this->consultation_id,
            'pidsr_status'=>$this->pidsr_status,
            'patient' => new PatientDataResource($this->whenLoaded('patient')), // ✅ CORRECT
        ];
    }
}
