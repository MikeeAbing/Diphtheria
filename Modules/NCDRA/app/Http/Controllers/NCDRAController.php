<?php

namespace Modules\NCDRA\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NCDRAController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('ncdra::index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('ncdra::create');
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
        return view('ncdra::show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return view('ncdra::edit');
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
