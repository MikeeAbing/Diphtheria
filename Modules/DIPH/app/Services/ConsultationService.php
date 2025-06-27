<?php

namespace Modules\DIPH\Services;

use Modules\Core\Facades\DataTable;
use Modules\DIPH\Http\Resources\ConsultationResource;
use Modules\DIPH\Models\Consultation;
use Illuminate\Support\Facades\DB;
use Modules\DIPH\Http\Resources\ConsultationTypeResource;

class ConsultationService
{
    public function index(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        // $sort = str_replace(
        //     ['patient_number', 'consultation_id', 'consultation_date', 'consultation_time'],
        //     ['patient_number', 'consultation_id', 'consultation_date', 'consultation_time'],
        //     request()->query('col')
        // );

        // $result = DataTable::query(Consultation::query())

        // ->searchable(['patient_number'])
        // ->applySort($sort)
        // ->allowedSorts(['patient_number', 'consultation_id', 'consultation_date', 'consultation_time'])
        // ->make();

        // return ConsultationResource::collection($result);


        //update

        $sort = str_replace(
            ['patient_number', 'consultation_id', 'consultation_date', 'consultation_time', 'firstname'],
            ['patient_consultation.patient_number', 'consultation_id', 'consultation_date', 'consultation_time', 'patient_info.firstname'],
            request()->query('col')
        );

        $result = DataTable::query(
            Consultation::query()
                ->from('patient_consultation') // ✅ Use actual table name
                ->leftJoin('patient_info', 'patient_consultation.patient_number', '=', 'patient_info.patient_number')
                ->leftJoin('case_report', 'case_report.patient_number', '=', 'patient_consultation.patient_number')
                ->select(
                    'patient_consultation.*', 'case_report.id AS case_report_id',
                    DB::raw("CONCAT(patient_info.firstname, ' ', LEFT(patient_info.middlename, 1), '. ', patient_info.lastname) AS fullname")
                )

        )
            ->searchable(['patient_consultation.patient_number', DB::raw("CONCAT(patient_info.firstname, patient_info.lastname)")])
            ->applySort($sort)
            ->allowedSorts(['patient_consultation.patient_number', 'consultation_id', 'consultation_date', 'consultation_time', 'fullname'])
            ->make();

        return ConsultationResource::collection($result);

    }

    public function consultationType($patient_number)
    {
        $result = Consultation::query()->where('patient_number', '=', $patient_number)
            ->select('type_of_consultation')->get();

        return ConsultationTypeResource::collection($result);
    }
}
