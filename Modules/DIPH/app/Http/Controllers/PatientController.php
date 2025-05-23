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
use Modules\DIPH\Http\Requests\PatientFormRequest;
use Modules\DIPH\Http\Resources\ProviderResource;
use Modules\DIPH\Models\DIPH;
use Modules\DIPH\Models\Patient;
use Modules\DIPH\Services\PatientService;
use Modules\IAM\Http\Resources\UserResource;
use Modules\IAM\Models\User;

class PatientController extends Controller
{
    protected PatientService $patientService;
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct(PatientService $patientService)
    {
        $this->authorizeResource(User::class, 'user');
        $this->patientService = $patientService;
    }
    /**
     * Display a listing of the resource.
     *
     * @param  Request  $request
     * @return Inertia
     */
    public function index()
    {
        $patients = $this->patientService->index();
        return inertia(
            'DIPH::Patient/index',
            ['patients' => $patients]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $provinces = Province::select('id', 'province_name', 'region_id')->get();
        $regions = Region::select('id', 'region_name')->get();
        $citymun = Municipality::select('id', 'city_name', 'region_id', 'province_id')->get();
        return inertia('DIPH::Patient/create', ['provinces' => $provinces, 'regions' => $regions, 'citymun' => $citymun]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PatientFormRequest $request): RedirectResponse
    {
        $patient = Patient::create($request->validated());
        return redirect(route('patient.index'))->with('Success', 'Successfully saved patient');
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
    public function edit($id)
    {
        return view('diph::edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
    }
}
