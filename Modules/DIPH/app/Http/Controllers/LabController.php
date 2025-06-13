<?php

namespace Modules\DIPH\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Labresult;
use App\Models\SpecimenType;
use App\Models\TestType;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Carbon;
use Modules\DIPH\Http\Requests\LabFormRequest;
use Modules\DIPH\Models\DIPH;
use Modules\DIPH\Models\Lab;
use Modules\DIPH\Models\Patient;

class LabController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return view('diph::index');
    }

    /**
     * Show the form for creating a new resource.
     *
     *
     */
    public function create(Request $request)
    {
        $case_id = $request->query('id');

        $epi_id = DIPH::where('case_id', '=', $case_id)->pluck('epi_id');
        $specimenType = SpecimenType::all();
        $testType = TestType::all();
        $labResult = Labresult::all();
        return inertia(
            'DIPH::Lab/create',
            ['case_id' => $case_id, 'epi_id'=>$epi_id, 'specimenType' => $specimenType, 'testType' => $testType, 'labResult' => $labResult]
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  LabFormRequest  $request
     * @return Redirect
     */
    public function store(LabFormRequest $request): RedirectResponse
    {
        $lab = Lab::create($request->validated());

        return redirect(route('diph.index'))->with('success', 'Successfully saved laboratory data');
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
    public function edit(Lab $lab)
    {
        $specimenType = SpecimenType::all();
        $testType = TestType::all();
        $labResult = Labresult::all();


        // return dd('sample');
        return Inertia::render(
            'DIPH::Lab/edit',
            ['lab' => $lab, 'specimenType' => $specimenType, 'testType' => $testType, 'labResult' => $labResult]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  LabFormRequest  $request
     * @param  Lab  $lab
     * @return Redirect
     */
    public function update(LabFormRequest $request, Lab $lab):RedirectResponse
    {
        $lab->update(
            collect($request->validated())
            ->except('case_id', 'API_labdata_ID', 'API_ID')
            ->toArray()
        );


        $diph = DIPH::where('patient_number', '=', $lab['case_id'])->update(['last_modified_date_lab'=> Carbon::now()->format('Y-m-d H:i:s')]);

        return redirect(route('diph.index'))->with('success', "Successfully updated patient's laboratory data");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
    }
}
