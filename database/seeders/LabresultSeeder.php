<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\DB;
class LabresultSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('ref_diph_finalclassi')->insert([
             
            ['id' => 1, 'lab_result' => 'POS', 'lab_result_desc' => 'POSITIVE', 'disease' => 'ABD,TYPHOID,PERTUSSIS,SARI,ROTAVIRUS,NON_NTETANUS,NTETANUS,LEPTO,ILI,HEPA,CHIKUNGUNYA,MEASLES,RABIES,CHOLERA,HFMD,DIPH,DENGUE,COVID19'],
            ['id' => 2, 'lab_result' => 'NEG', 'lab_result_desc' => 'NEGATIVE', 'disease' => 'ABD,AFP,TYPHOID,PERTUSSIS,SARI,ROTAVIRUS,NON_NTETANUS,NTETANUS,LEPTO,ILI,HEPA,MEASLES,RABIES,CHOLERA,HFMD,DIPH,DENGUE,MENINGO,AMES,COVID19'],
            ['id' => 21, 'lab_result' => 'UD', 'lab_result_desc' => 'UNDETERMINED', 'disease' => 'DIPH'],
            ['id' => 22, 'lab_result' => 'NP', 'lab_result_desc' => 'NOT PROCESSED', 'disease' => 'DIPH'],
           
        ]);
    }
}
