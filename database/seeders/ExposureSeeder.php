<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\DB;
class ExposureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('ref_diph_exposure')->insert([
            ['id' => 1, 'exposure_code' => 'CON', 'exposure_desc' => 'Confirmed Case'],
            ['id' => 2, 'exposure_code' => 'PROB', 'exposure_desc' => 'Probable Case'],
            ['id' => 3, 'exposure_code' => 'CAR', 'exposure_desc' => 'Carrier'],
            ['id' => 4, 'exposure_code' => 'TRAV', 'exposure_desc' => 'International Traveller'],
        ]);
    }
}
