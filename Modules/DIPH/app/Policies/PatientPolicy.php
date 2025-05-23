<?php

namespace Modules\DIPH\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use Modules\DIPH\Models\Patient;

class PatientPolicy
{
    use HandlesAuthorization;


    use HandlesAuthorization;

    /**
     * Perform pre-authorization checks.
     *
     * @param  \Modules\DIPH\Models\Patient  $patient
     * @param  string  $ability
     * @return void|bool
     */
    public function before(Patient $patient, $ability)
    {
        // visitors cannot view unpublished items
        if ($patient === null) {
            return false;
        }
    }

    /**
     * Determine whether the user can view any models.
     *
     * @param  \Modules\DIPH\Models\Patient  $patient
     * @return mixed
     */

    /**
     * Determine whether the user can view the model.
     *
     * @param  \Modules\DIPH\Models\Patient  $patient
     * @return mixed
     */
    public function view(Patient $patient)
    {
        if ($patient->can('view role')) {
            return true;
        }
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \Modules\DIPH\Models\Patient  $patient
     * @return mixed
     */
    public function create(Patient $patient)
    {
        if ($patient->can('create role')) {
            return true;
        }
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \Modules\DIPH\Models\Patient  $patient
     * @return mixed
     */
    public function update(Patient $patient)
    {
        if ($patient->can('update role')) {
            return true;
        }
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \Modules\DIPH\Models\Patient  $patient
     * @return mixed
     */
    public function delete(Patient $patient)
    {
        if ($patient->can('delete role')) {
            return true;
        }
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \Modules\DIPH\Models\Patient  $patient
     * @return mixed
     */
    public function restore(Patient $patient)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \Modules\DIPH\Models\Patient  $patient
     * @return mixed
     */
    public function forceDelete(Patient $patient)
    {
        //
    }
}
