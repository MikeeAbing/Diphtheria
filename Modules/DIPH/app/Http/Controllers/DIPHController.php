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
        return inertia(
            'DIPH::DIPH/index',
            ['diph' => $diph]
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
    
        return response()->json($data);
        // $diph = DIPH::where('case_id', $request->)
        // $case_status = $diph->update()
        // return response()->json([
        //     'data' => DIPH::where('case_id',  $case_id)->get()
        // ]);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
    }
}
