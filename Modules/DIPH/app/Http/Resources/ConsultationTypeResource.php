<?php

namespace Modules\DIPH\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConsultationTypeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        $case_code = [
            [
                'id' => 1,
                'case_code' => 'DENGUE',
                'case_description' => 'Dengue'
            ],
            [
                'id' => 2,
                'case_code' => 'ABD',
                'case_description' => 'Acute Bloody Diarrhea'
            ],
            [
                'id' => 3,
                'case_code' => 'AMES',
                'case_description' => 'Acute meningitis and encephalitis syndromes'
            ],
            [
                'id' => 4,
                'case_code' => 'HEPA',
                'case_description' => 'Acute Viral Hepatitis'
            ],
            [
                'id' => 5,
                'case_code' => 'CHIKUNGUNYA',
                'case_description' => 'Chikungunya'
            ],
            [
                'id' => 6,
                'case_code' => 'CHOLERA',
                'case_description' => 'Cholera'
            ],
            [
                'id' => 7,
                'case_code' => 'DIPH',
                'case_description' => 'Diphtheria'
            ],
            [
                'id' => 8,
                'case_code' => 'ILI',
                'case_description' => 'Influenza-Like Illness (ILI)'
            ],
            [
                'id' => 9,
                'case_code' => 'LEPTO',
                'case_description' => 'Leptospirosis'
            ],
            [
                'id' => 10,
                'case_code' => 'MEASLES',
                'case_description' => 'Measles'
            ],
            [
                'id' => 11,
                'case_code' => 'MENINGO',
                'case_description' => 'Meningo'
            ],
            [
                'id' => 12,
                'case_code' => 'NTETANUS',
                'case_description' => 'Neonatal Tetanus'
            ],
            [
                'id' => 13,
                'case_code' => 'NON_NTETANUS',
                'case_description' => 'Non-neonatal Tetanus'
            ],
            [
                'id' => 14,
                'case_code' => 'PERTUSSIS',
                'case_description' => 'Pertussis'
            ],
            [
                'id' => 15,
                'case_code' => 'RABIES',
                'case_description' => 'Rabies'
            ],
            [
                'id' => 16,
                'case_code' => 'ROTAVIRUS',
                'case_description' => 'Rotavirus'
            ],
            [
                'id' => 17,
                'case_code' => 'SARI',
                'case_description' => 'Severe Acute Respiratory Infections'
            ],
            [
                'id' => 18,
                'case_code' => 'TYPHOID',
                'case_description' => 'Typhoid'
            ],
            [
                'id' => 19,
                'case_code' => 'AFP',
                'case_description' => 'Acute Flaccid Paralysis '
            ],
            [
                'id' => 20,
                'case_code' => 'HFMD',
                'case_description' => 'Hand, Foot and Mouth Disease and Severe Enteroviral Disease'
            ],
            [
                'id' => 21,
                'case_code' => 'COVID19',
                'case_description' => 'Coronavirus Disease (COVID-19)'
            ]
        ];

        $disease = collect($case_code)->firstWhere('case_description', $this->type_of_consultation);
        $diseasecode = $disease ? strtoupper(substr($disease['case_code'], 0, 3)) : '';

        return [
            'type_of_consultation' => $diseasecode,
        ];
    }
}
