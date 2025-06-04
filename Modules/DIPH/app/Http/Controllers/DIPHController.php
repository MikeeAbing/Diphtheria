<?php

namespace Modules\DIPH\Http\Controllers;

use App\Models\Municipality;
use App\Models\Province;
use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\RedirectResponse;
use Modules\Core\Http\Controllers\CoreController as Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\DIPH\Models\Patient;
use Modules\DIPH\Services\DIPHService;
use Modules\DIPH\Models\DIPH;
use Modules\IAM\Models\User;
use Modules\DIPH\Http\Requests\DIPHFormRequest;
use Illuminate\Support\Facades\Auth;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;

class DIPHController extends Controller
{
    protected DIPHService $diphService;
    // /**
    //  * Create the controller instance.
    //  *
    //  * @return void
    //  */
    public function __construct(DIPHService $diphService)
    {
        // $this->authorizeResource(User::class, 'user');
        $this->diphService = $diphService;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  Request  $request
     * @return Inertia
     */

    public function index(Request $request)
    {
        $diph = $this->diphService->index();
        return inertia(
            'DIPH::DIPH/index',
            ['diph' => $diph]
        );
    }

    public function getDiphList(Request $request)
    {
        $patient_number = $request->query('id');

        $diph = DIPH::where('patient_number', 'EQUALS', $patient_number);
        return inertia(
            'DIPH::diph/index',
            [$diph]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $search = $request->query('search');

        if ($search) {
            $patient_number = Patient::where('patient_number', 'like', "%{$search}%")->select('patient_number')->get();
            return Inertia::render(
                'DIPH::DIPH/create',
                ['patient_number' => $patient_number]
            );
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  DIPHFormRequest  $request
     * @return Redirect
     */
    public function store(DIPHFormRequest $request): RedirectResponse
    {

        $diph = DIPH::create($request->validated());

        return redirect(route('patient.index'))->with('success', 'Diphtheria case investigation form submitted.');
    }

    /**
     * Show the specified resource.
     */
    public function show($id)
    {
        return view('diph::show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DIPH $diph)
    {
        return Inertia::render('DIPH::DIPH/edit', [
            'diph' => $diph
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  DIPHFormRequest  $request
     * @param  DIPH  $diph
     * @return Redirect
     */
    public function update(DIPHFormRequest $request, DIPH $diph): RedirectResponse
    {
        $diph->update(
            collect($request->validated())
                ->except('case_id', 'patient_number')
                ->toArray()
        );
        return redirect(route('patient.index'))->with('success', 'Case report updated.');
    }

    public function print($id)
    {
        $diph = DIPH::with('patient')->findOrFail($id);

        $city = Municipality::find($diph->patient->pat_address_city);
        $province = Province::find($diph->patient->pat_address_prov);
        $permcity = Municipality::find($diph->patient->pat_perm_address_city);
        $permprovince = Province::find($diph->patient->pat_perm_address_prov);
        return Inertia::render('DIPH::DIPH/printCIF', [
            'diph' => $diph,
            'city' => $city,
            'province' => $province,
            'permcity' => $permcity,
            'permprovince' => $permprovince
        ]);
    }
    // public function jsonFile(Request $request)
    // {
    //     $validated = $request->validate([
    //         'case_id' => 'required|string',
    //         'pidsr_status' => 'required|string',
    //     ]);

    //     $caseId = $validated['case_id'];
    //     $data = DIPH::where('case_id', $caseId)->first();

    //     if (!$data) {
    //         return response()->json(['error' => 'Case not found'], 404);
    //     }

    //     $data->pidsr_status = $validated['pidsr_status'];
    //     $data->save();

    //     return response()->json($data);

    // }
    /**
     * Remove the specified resource from storage.
     */
    public function jsonFile(Request $request)
    {
        $validated = $request->validate([
            'case_id' => 'required|string',
            'pidsr_status' => 'required|string',
        ]);

        $caseId = $validated['case_id'];
        $data = DIPH::where('case_id', $caseId)->first();

        if (!$data) {
            return response()->json(['error' => 'Case not found'], 404);
        }

        $data->pidsr_status = $validated['pidsr_status'];
        $data->save();

        $username = env('WEBSERVICE_PIDSR_USERNAME');
        $password = env('WEBSERVICE_PIDSR_PASSWORD');
        $edcscode = env('WEBSERVICE_PIDSR_TOKEN');
        // return response()->json($data);

        $diphData = DIPH::where('case_id', $caseId)->with(['patient', 'lab'])->first();


        $formattedData = [
            "username" => $username,
            "password" => $password,
            "edcscode" => $edcscode,
            "diseasedata" => [
                [
                    "hfhudcode" => "DOH000000000004799",
                    "patient_number" => $diphData->patient_number,
                    "firstname" => $diphData->patient->firstname,
                    "middlename" => $diphData->patient->middlename,
                    "lastname" => $diphData->patient->lastname,
                    "suffixname" => $diphData->patient->suffixname,
                    "pat_address_reg" => $diphData->patient->pat_address_reg,
                    "pat_address_prov" => $diphData->patient->pat_address_prov,
                    "pat_address_city" => $diphData->patient->pat_address_city,
                    "pat_address_brgy" => $diphData->patient->pat_address_brgy,
                    "pat_address_street_name" => $diphData->patient->pat_address_street_name,
                    "pat_perm_address_reg" => $diphData->patient->pat_perm_address_reg,
                    "pat_perm_address_prov" => $diphData->patient->pat_perm_address_prov,
                    "pat_perm_address_city" => $diphData->patient->pat_perm_address_city,
                    "pat_perm_address_brgy" => $diphData->patient->pat_perm_address_brgy,
                    "pat_perm_address_street_name" => $diphData->patient->pat_perm_address_street_name,
                    "sex" => $diphData->patient->sex,
                    "dateofbirth" => $diphData->patient->dateofbirth,
                    "member_of_IP" => $diphData->patient->member_of_IP,
                    "IP_tribe" => (int)$diphData->patient->IP_tribe,
                    "admitted" => $diphData->admitted,
                    "date_admitted" => $diphData->date_admitted,
                    "date_onset" => $diphData->date_onset,
                    "occupation" => $diphData->patient->occupation,
                    "phone_no" => $diphData->patient->phone_no,
                    "caregiver" => $diphData->caregiver,
                    "caregiver_no" => $diphData->caregiver_no,
                    "date_report" => $diphData->date_report,
                    "reporter" => $diphData->reporter,
                    "reporter_no" => $diphData->reporter_no,
                    "date_investigation" => $diphData->date_investigation,
                    "investigator" => $diphData->investigator,
                    "investigator_no" => $diphData->investigator_no,
                    "diphtheria_dose" => $diphData->diphtheria_dose,
                    "total_dose" => $diphData->total_dose,
                    "date_last_vaccination" => $diphData->date_last_vaccination,
                    "sourceinformation" => $diphData->sourceinformation,
                    "known_exposure" => $diphData->known_exposure,
                    "exposure_other" => $diphData->exposure_other,
                    "name_school" => $diphData->name_school,
                    "travel14days" => $diphData->travel14days,
                    "travel_detail" => $diphData->travel_detail,
                    "fever" => $diphData->fever,
                    "cough" => $diphData->cough,
                    "sorethroat" => $diphData->sorethroat,
                    "pseudomembrane" => $diphData->pseudomembrane,
                    "swallowing" => $diphData->swallowing,
                    "breathing" => $diphData->breathing,
                    "other_symptoms" => $diphData->other_symptoms,
                    "other_symptoms_specify" => $diphData->other_symptoms_specify,
                    "antibiotic" => $diphData->antibiotic,
                    "antibiotic_date" => $diphData->antibiotic_date,
                    "diphtheriatoxin" => $diphData->diphtheriatoxin,
                    "diphtheriatoxin_date" => $diphData->diphtheriatoxin_date,
                    "final_classi" => $diphData->final_classi,
                    "outcome" => $diphData->outcome,
                    "date_died" => $diphData->date_died,
                    "verification_level" => $diphData->verification_level,
                    "user_id" => $diphData->user_id,
                    "case_code" => "DIPH",
                    "timestamp" => Carbon::parse($diphData->created_at)->format('Y-m-d H:i:s'),
                    "last_modified_by" => $diphData->last_modified_by,
                    "last_modified_date_patient" => Carbon::parse($diphData->patient->updated_at)->format('Y-m-d H:i:s'),
                    "last_modified_date_disease" => Carbon::parse($diphData->updated_at)->format('Y-m-d H:i:s'),
                    "last_modified_date_laboratory" => Carbon::parse($diphData->last_modified_date_laboratory)->format('Y-m-d H:i:s'),
                    "datafrom" => "iClinicSys",
                    "lab_data" => $diphData->lab ? 'Y' : 'N',
                    "API_ID" => $diphData->lab->API_ID,
                    "API_labdata_ID" => $diphData->lab->API_labdata_ID,
                    "specimen_type" => $diphData->lab->specimen_type,
                    "date_specimen_collected" => $diphData->lab->date_specimen_collected,
                    "lab_sent_RITM" => $diphData->lab->lab_sent_RITM,
                    "date_sent_RITM" => $diphData->lab->date_sent_RITM,
                    "date_received_by_lab" => $diphData->lab->date_received_by_lab,
                    "time_received_by_lab" => $diphData->lab->time_received_by_lab,
                    "lab_received_by" => $diphData->lab->lab_received_by,
                    "type_test" => $diphData->lab->type_test,
                    "date_testing" => $diphData->lab->date_testing,
                    "lab_result" => $diphData->lab->lab_result,
                    "typeoforganism" => $diphData->lab->typeoforganism,
                    "date_result" => $diphData->lab->date_result,
                    "interpretation" => $diphData->lab->interpretation,
                    "remarks" => $diphData->lab->remarks,
                ]
            ]
        ];
        return response()->json($formattedData);
    }
    public function destroy($id)
    {
    }
}
