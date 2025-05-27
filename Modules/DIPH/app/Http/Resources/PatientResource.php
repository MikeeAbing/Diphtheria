<?php

namespace Modules\DIPH\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PatientResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'patient_number' => $this->patient_number,
            'full_name' => $this->full_name,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'diph'=>$this->whenLoaded('diph', function(){
                return ProviderResource::collection($this->diph);
            })
        ];
    }
}
