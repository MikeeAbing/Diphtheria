<?php

namespace Modules\DIPH\Services;

use Illuminate\Support\Facades\DB;
use Modules\Core\Facades\DataTable;
use Modules\DIPH\Http\Resources\DIPHCreateResource;
use Modules\DIPH\Http\Resources\DIPHResource;
use Modules\DIPH\Models\DIPH;
use Modules\DIPH\Models\Patient;

class DIPHService
{
    public function index(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        $sort = str_replace(
            [
                'case_id',
                'patient_number',
                'admitted',
                'date_admitted'
            ],
            ['case_id', 'patient_number', 'admitted', 'date_admitted'],
            request()->query('col')
        );

        //  $query = DIPH::query()
        //     ->leftJoin('specimen', 'case_report.case_id', '=', 'specimen.case_id')
        //     ->leftjoin('patient_consultation', 'case_report.patient_number', 'patient_consultation.patient_number')
        //     ->select('case_report.*', 'specimen.id as specimen_id', DB::raw('MAX(patient_consultation.consultation_id) as consultation_id'))
        //     ->groupBy('case_report.case_id');

        $query = DIPH::query()
            ->leftJoin('specimen', 'case_report.case_id', '=', 'specimen.case_id')
            ->leftJoin('patient_consultation', 'case_report.patient_number', '=', 'patient_consultation.patient_number')
            ->select(
                'case_report.id',
                'case_report.case_id',
                'case_report.admitted',
                'case_report.patient_number',
                'case_report.pidsr_status',
                'case_report.created_at',
                DB::raw('MAX(specimen.id) as specimen_id'),
                DB::raw('MAX(patient_consultation.consultation_id) as consultation_id')
            )
            ->groupBy('case_report.id', 'case_report.case_id', 'case_report.admitted', 'case_report.created_at', 'case_report.patient_number', 'case_report.pidsr_status');

        // $result = DataTable::query(DIPH::query());

        // return DIPHResource::collection($result);

        $result = DataTable::query($query)
            ->with(['patient'])
            ->searchable(['case_report.patient_number', 'case_report.case_id', 'specimen.id'])
            ->applySort($sort)
            ->allowedSorts(['case_id', 'patient_number', 'admitted', 'date_admitted'])
            ->make();

        return DIPHResource::collection($result);
    }

    public function create($search)
    {
        $result = Patient::query()->where('case_id', '=', $search)
            ->select('case_id', 'patient_number', 'facilityname')->get();

        return DIPHCreateResource::collection($result);
    }
}
