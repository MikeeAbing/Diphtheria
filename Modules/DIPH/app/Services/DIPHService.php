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

         $query = DIPH::query()
            ->leftJoin('specimen', 'case_report.case_id', '=', 'specimen.case_id')
            ->select('case_report.*', 'specimen.id as specimen_id') // customize as needed
            ->with([]); // if no Eloquent relationships

        // $result = DataTable::query(DIPH::query());

        // return DIPHResource::collection($result);

        $result = DataTable::query($query)
        ->searchable(['case_report.patient_number', 'case_report.case_id', 'specimen.id'])
        ->applySort($sort)
        ->allowedSorts(['case_id', 'patient_number', 'admitted', 'date_admitted'])
        ->make();

        return DIPHResource::collection($result);
    }
}
