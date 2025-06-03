<?php

namespace Modules\DIPH\Http\Controllers;

use App\Models\Municipality;
use App\Models\Province;
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
        return inertia('DIPH::DIPH/index',['diph' => $diph]
);
    }

    public function getDiphList(Request $request){
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
            'city'=>$city,
            'province'=>$province,
            'permcity'=>$permcity,
            'permprovince'=>$permprovince
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
       

       
     $formattedData = [
        "username" => $username,
        "password" => $password,
        "edcscode" => $edcscode,
        "diseasedata" => [
            [
                "hfhudcode" => $data->hfhudcode,
                "patient_number" => $data->patient_number,
                "firstname" => $data->firstname,
                "middlename" => $data->middlename,
                "lastname" => $data->lastname,
                "suffixname" => $data->suffixname,
                "pat_address_reg" => $data->pat_address_reg,
                "pat_address_prov" => $data->pat_address_prov,
                "pat_address_city" => $data->pat_address_city,
                "pat_address_brgy" => $data->pat_address_brgy,
                "pat_address_street_name" => $data->pat_address_street_name,
                "pat_perm_address_reg" => $data->pat_perm_address_reg,
                "pat_perm_address_prov" => $data->pat_perm_address_prov,
                "pat_perm_address_city" => $data->pat_perm_address_city,
                "pat_perm_address_brgy" => $data->pat_perm_address_brgy,
                "pat_perm_address_street_name" => $data->pat_perm_address_street_name,
                "sex" => $data->sex,
                "dateofbirth" => $data->dateofbirth,
                "member_of_IP" => $data->member_of_IP,
                "IP_tribe" => $data->IP_tribe,
                "admitted" => $data->admitted,
                "date_admitted" => $data->date_admitted,
                "date_onset" => $data->date_onset,
                "occupation" => $data->occupation,
                "phone_no" => $data->phone_no,
                "caregiver" => $data->caregiver,
                "caregiver_no" => $data->caregiver_no,
                "date_report" => $data->date_report,
                "reporter" => $data->reporter,
                "reporter_no" => $data->reporter_no,
                "date_investigation" => $data->date_investigation,
                "investigator" => $data->investigator,
                "investigator_no" => $data->investigator_no,
                "diphtheria_dose" => $data->diphtheria_dose,
                "total_dose" => $data->total_dose,
                "date_last_vaccination" => $data->date_last_vaccination,
                "sourceinformation" => $data->sourceinformation,
                "known_exposure" => $data->known_exposure,
                "exposure_other" => $data->exposure_other,
                "name_school" => $data->name_school,
                "travel14days" => $data->travel14days,
                "travel_detail" => $data->travel_detail,
                "fever" => $data->fever,
                "cough" => $data->cough,
                "sorethroat" => $data->sorethroat,
                "pseudomembrane" => $data->pseudomembrane,
                "swallowing" => $data->swallowing,
                "breathing" => $data->breathing,
                "other_symptoms" => $data->other_symptoms,
                "other_symptoms_specify" => $data->other_symptoms_specify,
                "antibiotic" => $data->antibiotic,
                "antibiotic_date" => $data->antibiotic_date,
                "diphtheriatoxin" => $data->diphtheriatoxin,
                "diphtheriatoxin_date" => $data->diphtheriatoxin_date,
                "final_classi" => $data->final_classi,
                "outcome" => $data->outcome,
                "date_died" => $data->date_died,
                "verification_level" => $data->verification_level,
                "user_id" => $data->user_id,
                "case_code" => $data->case_code,
                "timestamp" => $data->timestamp,
                "last_modified_by" => $data->last_modified_by,
                "last_modified_date_patient" => $data->last_modified_date_patient,
                "last_modified_date_disease" => $data->last_modified_date_disease,
                "last_modified_date_laboratory" => $data->last_modified_date_laboratory,
                "datafrom" => $data->datafrom,
                "lab_data" => $data->lab_data,
                "API_ID" => $data->API_ID,
                "API_labdata_ID" => $data->API_labdata_ID,
                "specimen_type" => $data->specimen_type,
                "date_specimen_collected" => $data->date_specimen_collected,
                "lab_sent_RITM" => $data->lab_sent_RITM,
                "date_sent_RITM" => $data->date_sent_RITM,
                "date_received_by_lab" => $data->date_received_by_lab,
                "time_received_by_lab" => $data->time_received_by_lab,
                "lab_received_by" => $data->lab_received_by,
                "type_test" => $data->type_test,
                "date_testing" => $data->date_testing,
                "lab_result" => $data->lab_result,
                "typeoforganism" => $data->typeoforganism,
                "date_result" => $data->date_result,
                "interpretation" => $data->interpretation,
                "remarks" => $data->remarks,
            ]
        ]
    ];

    return response()->json($formattedData);
}
    public function destroy($id)
    {
    }
}
