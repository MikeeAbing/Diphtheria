<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TestType extends Model
{
    protected $table = 'ref_type_test';
    protected $fillable = [
        'id',
        'test_id',
        'test_description',
        'disease',
    ];
}
