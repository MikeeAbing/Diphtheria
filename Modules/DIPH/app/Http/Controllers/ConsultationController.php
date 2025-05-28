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
       // return dd('sample');

   
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
    public function create()
    {
        // $search = $request->query('search');

        // if ($search) {
        //     $patient_number = Patient::where('patient_number', 'like', "%{$search}%")->select('patient_number')->get();
        //     return Inertia::render(
        //         'DIPH::Consultation/create',
        //         ['patient_number' => $patient_number]
        //     );
        // }   

        return Inertia::render(
                    'DIPH::Consultation/create');
    }
    public function store(ConsultationFormRequest $request): RedirectResponse
    {
        $consultation = Consultation::create($request->validated());
        return redirect(route('consultation.index'))->with('Success', 'Successfully saved consultation');
    }
    // public function jsonFile()
    // {
    //     return response()->json([
    //         'data' => Consultation::all()
    //     ]);
    // }

    public function jsonFile(Request $request)
    {
        $case_id = $request->query('id');
        return response()->json([
            'data' => Consultation::where('case_id',  $case_id)->get()
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
    public function consultation(Request $request)
    {
        $patient_number = $request->query('id');
        return inertia(
            'DIPH::Consultation/index',
            ['patient_number' => $patient_number]
        );
    }
}
