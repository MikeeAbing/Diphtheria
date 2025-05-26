<?php

namespace Modules\DIPH\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Labresult;
use App\Models\SpecimenType;
use App\Models\TestType;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
    public function create()
    {
        $specimenType = SpecimenType::all();
        $testType = TestType::all();
        $labResult = Labresult::all();
        return inertia(
            'DIPH::Lab/create',
            ['specimenType' => $specimenType, 'testType' => $testType, 'labResult' => $labResult]
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
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
