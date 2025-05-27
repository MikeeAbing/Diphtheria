<?php

namespace Modules\DIPH\Http\Controllers;

use App\Models\Municipality;
use Modules\Core\Http\Controllers\CoreController as Controller;
use App\Models\Province;
use App\Models\Region;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Modules\DIPH\Http\Requests\ConsultationFormRequest;
use Modules\DIPH\Http\Resources\ProviderResource;
use Modules\DIPH\Models\DIPH;
use Modules\DIPH\Models\Consultation;
use Modules\DIPH\Services\ConsultationService;
use Modules\IAM\Http\Resources\UserResource;
use Modules\IAM\Models\User;
use Modules\DIPH\Models\Patient;
use Illuminate\Support\Facades\DB;
class ConsultationController extends Controller
{
    protected ConsultationService $consultationService;
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct(ConsultationService $consultationService)
    {
        // $this->authorizeResource(User::class, 'user');
        $this->consultationService = $consultationService;
    }
    /**
     * Display a listing of the resource.
     *
     * @param  Request  $request
     * @return Inertia
     */
    public function index()
    {
        $consultations = $this->consultationService->index();

        return Inertia::render('DIPH::Consultation/index', [
            'consultations' => $consultations
        ]);

    //     $consultations = DB::table('patient_consultation')
    // ->join('patient_info', 'patient_consultation.patient_number', '=', 'patient_info.patient_number')
    // ->select('patient_consultation.*', 'patient_info.firstname as firstname')
    // ->get();
    //   $consultations = $this->consultationService->index();
    //    return inertia('DIPH::Consultation/index',['consultations' => $consultations]);
    // $consultations = DB::table('patient_consultation')
    //     ->join('patient_info', 'patient_consultation.patient_number', '=', 'patient_info.patient_number')
    //     ->select(
    //         'patient_consultation.*',
    //         'patient_info.firstname as firstname'
    //     )
    //     ->get();

    // return Inertia::render('DIPH::Consultation/index', [
    //     'consultations' => $consultations
    // ]);
    }


    public function getConsultationList(Request $request)
    {
        $patient_number = $request->query('id');
        $consultation = Consultation::where('patient_number', 'EQUALS', $patient_number);
        return inertia('DIPH::Consultation/index', [
            'consultations' => $consultation->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        // $search = $request->query('search');

        // if ($search) {
        //     $patient_number = Patient::where('patient_number', 'like', "%{$search}%")->select('patient_number')->get();
        //     return Inertia::render(
        //         'DIPH::Consultation/create',
        //         ['patient_number' => $patient_number]
        //     );
        // }   
    }

    public function jsonFile()
    {
        return response()->json([
            'data' => Consultation::all()
        ]);
    }
    
    /**
     * Store a newly created resource in storage.
     */
  

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
    public function edit()
    {
       
    }

    /**
     * Update the specified resource
     *  in storage.
     *
     * @param  ConsultationFormRequest  $request
     * @param  Consultation  $consultation
     * @return Redirect
     */
  

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    
    {
    }
}
