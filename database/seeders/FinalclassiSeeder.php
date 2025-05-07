<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FinalclassiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('ref_diph_finalclassi')->insert([
            ['id' => 1, 'finalclassi_code' => 'SUS', 'exposure_desc' => 'Suspect Case'],
            ['id' => 2, 'finalclassi_code' => 'LAB', 'exposure_desc' => 'Laboratory Confirmed'],
            ['id' => 3, 'finalclassi_code' => 'EPI', 'exposure_desc' => 'Epidemiologically Linked'],
            ['id' => 4, 'finalclassi_code' => 'COMP', 'exposure_desc' => 'Clinically Compatible'],
            ['id' => 5, 'finalclassi_code' => 'DISC', 'exposure_desc' => 'Discarded'],
        ]);
    }
}
