<?php

namespace Modules\DIPH\Http\Controllers;

use Modules\Core\Http\Controllers\CoreController as Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\DIPH\Services\DIPHService;
use Modules\DIPH\Models\DIPH;

class DIPHController extends Controller
{
    protected DIPHService $dIPHService;
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct(DIPHService $dIPHService)
    {
        $this->authorizeResource(DIPH::class, 'user');
        $this->dIPHService = $dIPHService;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  Request  $request
     * @return Inertia
     */

    public function index()
    {
        return inertia('DIPH::index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('DIPH::create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {}

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
    public function update(Request $request, $id) {}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id) {}
}
