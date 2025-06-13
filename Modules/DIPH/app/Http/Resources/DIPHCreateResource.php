<?php

namespace Modules\DIPH\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DIPHCreateResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        $facilities = [
            ['id' => 3208, 'facilityName' => 'PIDDIG DISTRICT HOSPITAL', 'healthfacilitycode' => 'DOH000000000000001'],
            ['id' => 20067, 'facilityName' => 'CEBU CITY MEDICAL CENTER', 'healthfacilitycode' => 'DOH000000000000002'],
            ['id' => 17768, 'facilityName' => 'DON LEOVIGILDO N. DIAPO SR. MUNICIPAL HOSPITAL', 'healthfacilitycode' => 'DOH000000000000003'],
            ['id' => 24493, 'facilityName' => 'LABASON DISTRICT HOSPITAL', 'healthfacilitycode' => 'DOH000000000000004'],
            ['id' => 10315, 'facilityName' => 'BAGONG POOK DIST. III HEALTH CENTER', 'healthfacilitycode' => 'DOH000000000000005'],
        ];

        $facility = collect($facilities)->firstWhere('id', (int) $this->facilityname);
        $facilitycode = $facility ? substr($facility['healthfacilitycode'], -7) : '';

        return [
            'case_id' => $this->case_id,
            'patient_number' => $this->patient_number,
            'facilitycode' => $facilitycode
        ];
    }
}
