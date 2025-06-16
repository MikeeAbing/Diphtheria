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
use Error;
use Exception;
use Illuminate\Support\Facades\DB;
use Modules\DIPH\Services\ConsultationService;

use function Laravel\Prompts\error;

class DIPHController extends Controller
{
    protected DIPHService $diphService;
    protected ConsultationService $consultationService;
    // /**
    //  * Create the controller instance.
    //  *
    //  * @return void
    //  */
    public function __construct(DIPHService $diphService, ConsultationService $consultationService)
    {
        // $this->authorizeResource(User::class, 'user');
        $this->diphService = $diphService;
        $this->consultationService = $consultationService;
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

        $patient = $this->diphService->create($search);

        $patient_number = 0;
        foreach ($patient as $item) {
            $patient_number = $item['patient_number'];
        }
        $disease_code = $this->consultationService->consultationType($patient_number);
        return inertia('DIPH::DIPH/create', ['patient' => $patient, 'disease_code' => $disease_code]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  DIPHFormRequest  $request
     * @return Redirect
     */
    public function store(DIPHFormRequest $request): RedirectResponse
    {
        $caseID = $request->input('case_id');
        $check = DIPH::where('case_id', '=', $caseID)->get();
        if ($check) {
            return redirect(route('patient.index'))->with('success', 'A Diptheria Case report for this patient already exists!');
        }
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
        try {
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

            $diphData = DIPH::where('case_id', $caseId)->with(['lab', 'patient'])->first();

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
                        "IP_tribe" => (int) $diphData->patient->IP_tribe,
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
                        // "API_ID" => Carbon::now()->year.'-'.'DIP'.'-'.'iCLINICSYS'.'-'.$disease_count.'-'.$facilitycode,
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
                        // "hfhudcode" => "DOH000000000004799",
                        // "patient_number" => '',
                        // "firstname" => '',
                        // "middlename" => '',
                        // "lastname" => '',
                        // "suffixname" => '',
                        // "pat_address_reg" => '',
                        // "pat_address_prov" => '',
                        // "pat_address_city" => '',
                        // "pat_address_brgy" => '',
                        // "pat_address_street_name" => '',
                        // "pat_perm_address_reg" => '',
                        // "pat_perm_address_prov" => '',
                        // "pat_perm_address_city" => '',
                        // "pat_perm_address_brgy" => '',
                        // "pat_perm_address_street_name" => '',
                        // "sex" => '',
                        // "dateofbirth" => '',
                        // "member_of_IP" => '',
                        // "IP_tribe" => '',
                        // "admitted" => '',
                        // "date_admitted" => '',
                        // "date_onset" => '',
                        // "occupation" => '',
                        // "phone_no" => '',
                        // "caregiver" => '',
                        // "caregiver_no" => '',
                        // "date_report" => '',
                        // "reporter" => '',
                        // "reporter_no" => '',
                        // "date_investigation" => '',
                        // "investigator" => '',
                        // "investigator_no" => '',
                        // "diphtheria_dose" => '',
                        // "total_dose" => '',
                        // "date_last_vaccination" => '',
                        // "sourceinformation" => '',
                        // "known_exposure" => '',
                        // "exposure_other" => '',
                        // "name_school" => '',
                        // "travel14days" => '',
                        // "travel_detail" => '',
                        // "fever" => '',
                        // "cough" => '',
                        // "sorethroat" => '',
                        // "pseudomembrane" => '',
                        // "swallowing" => '',
                        // "breathing" => '',
                        // "other_symptoms" => '',
                        // "other_symptoms_specify" => '',
                        // "antibiotic" => '',
                        // "antibiotic_date" => '',
                        // "diphtheriatoxin" => '',
                        // "diphtheriatoxin_date" => '',
                        // "final_classi" => '',
                        // "outcome" => '',
                        // "date_died" => '',
                        // "verification_level" => '',
                        // "user_id" => '',
                        // "case_code" => "DIPH",
                        // "timestamp" => '',
                        // "last_modified_by" => $diphData->last_modified_by,
                        // "last_modified_date_patient" => '',
                        // "last_modified_date_disease" => '',
                        // "last_modified_date_laboratory" => '',
                        // "datafrom" => "iClinicSys",
                        // "lab_data" => '',
                        // // "API_ID" => Carbon::now()->year.'-'.'DIP'.'-'.'iCLINICSYS'.'-'.$disease_count.'-'.$facilitycode,
                        // "API_ID" => '',
                        // "API_labdata_ID" => '',
                        // "specimen_type" => '',
                        // "date_specimen_collected" => '',
                        // "lab_sent_RITM" => '',
                        // "date_sent_RITM" => '',
                        // "date_received_by_lab" => '',
                        // "time_received_by_lab" => '',
                        // "lab_received_by" => '',
                        // "type_test" => '',
                        // "date_testing" => '',
                        // "lab_result" => '',
                        // "typeoforganism" => '',
                        // "date_result" => '',
                        // "interpretation" => '',
                        // "remarks" => '',
                    ]
                ]
            ];
            return response()->json($formattedData);
        } catch (Exception $ex) {
            $errorMessage = $ex->getMessage();
            return response()->json('Missing Lab Data. Please encode it first.' . ' ' . 'Error: ' . $errorMessage);
        }
    }

    public function proxyToPidsr(Request $request)
    {
        $client = new \GuzzleHttp\Client();

        $payload = [
            'username' => $request->input('username'),
            'password' => $request->input('password'),
            'edcscode' => $request->input('edcscode'),
            'diseasedata' => $request->input('diseasedata'), // This must be an array or object, not string
        ];

        try {
            $response = $client->post('https://uhmistrn.doh.gov.ph/pidsr_hss/v1/disease', [
                'json' => $payload,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Content-Length',
                    'Host',
                    'User-Agent' => 'PostmanRuntime/7.39.1',
                    'Accept' => '*/*',
                    'Accept-Encoding' => 'gzip, deflate, br',
                    'Connection' => 'keep-alive'
                ],
            ]);

            // return response()->json(json_decode($response->getBody(), true));
            return response()->json($request->all());
        } catch (\GuzzleHttp\Exception\RequestException $e) {
            if ($e->hasResponse()) {
                return response()->json([
                    'error' => 'Server responded with error',
                    'message' => (string) $e->getResponse()->getBody()
                ], 500);
            }

            return response()->json(['error' => $e->getMessage()], 500);
        }
        // catch (\Exception $e) {
        //     return response()->json(['error' => 'Failed to fetch data.'], 500);
        // }
        // return response()->json($request->only(['username', 'password', 'edcscode', 'diseasedata']));
    }

    public function destroy($id)
    {
    }
}
