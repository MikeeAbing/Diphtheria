<?php

namespace Modules\DIPH\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class CipherPatientUnique implements ValidationRule
{
    /**
     * Run the validation rule.
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void {}
}
