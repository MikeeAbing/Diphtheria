<?php

namespace Modules\DIPH\Services;

use Modules\Core\Facades\DataTable;
use Modules\DIPH\Http\Resources\DIPHResource;
use Modules\DIPH\Models\DIPH;

class DIPHService
{
    public function index(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection{
        $sort = str_replace(
            [
                'case_id', 'patient_number', 'admitted', 'date_admitted'
            ],
            ['case_id', 'patient_number', 'admitted', 'date_admitted'],
            request()->query('col')
        );

        // $result = DataTable::query(DIPH::query());

        // return DIPHResource::collection($result);

        $result = DataTable::query(DIPH::query())
        // ->with(['patient'])
        ->searchable(['patient_number', 'case_id'])
        ->applySort($sort)
        ->allowedSorts(['case_id', 'patient_number', 'admitted', 'date_admitted'])
        ->make();

        return DIPHResource::collection($result);
    }
}
