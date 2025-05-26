<?php

namespace Modules\DIPH\Services;

use Modules\Core\Facades\DataTable;
use Modules\DIPH\Http\Resources\PatientResource;
use Modules\DIPH\Models\Patient;

class PatientService
{
    public function index(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        $sort = str_replace(
            ['patient_number','full_name', 'created_at', 'provider'],
            ['patient_number','full_name', 'created_at', 'provider'],
            request()->query('col')
        );

        $result = DataTable::query(Patient::query())
        ->with(['diph'])
        ->searchable(['full_name','patient_number'])
        ->applySort($sort)
        ->allowedSorts(['patient_number', 'full_name', 'created_at', 'provider'])
        ->make();

        return PatientResource::collection($result);
    }
}
