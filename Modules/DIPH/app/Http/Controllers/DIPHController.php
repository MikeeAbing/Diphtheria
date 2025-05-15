<?php

namespace Modules\DIPH\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Modules\Core\Http\Controllers\CoreController as Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\DIPH\Services\DIPHService;
use Modules\DIPH\Models\DIPH;
use Modules\IAM\Models\User;
use Modules\DIPH\Http\Requests\DIPHFormRequest;
use Illuminate\Support\Facades\Auth;
class DIPHController extends Controller
{
    protected DIPHService $diphService;
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct(DIPHService $diphService)
    {
        $this->authorizeResource(User::class, 'user');
        $this->diphService = $diphService;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  Request  $request
     * @return Inertia
     */

    public function index()
    {
        return inertia('DIPH::DIPH/index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        return Inertia::render('DIPH::DIPH/create');
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

        return redirect(route('diph.diph.index'))->with('success', 'Diphtheria case investigation form submitted.');

        ;
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
