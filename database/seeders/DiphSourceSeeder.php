<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\DiphSource;
use Database\Seeders\DB;

class DiphSourceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('ref_diph_source')->insert([
            ['id' => 1, 'source_code' => 'CARD', 'source_desc' => 'Vaccination Card'],
            ['id' => 2, 'source_code' => 'RECALL', 'source_desc' => 'By Recall'],
            ['id' => 3, 'source_code' => 'TCL', 'source_desc' => 'Target Client List'],
        ]);

    }
}