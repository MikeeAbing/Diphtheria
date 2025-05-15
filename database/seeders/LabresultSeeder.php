<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Labresult;

class LabresultSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $labresults = [
             
            ['id' => 1, 'lab_result' => 'POS', 'lab_result_desc' => 'POSITIVE', 'disease' => 'ABD,TYPHOID,PERTUSSIS,SARI,ROTAVIRUS,NON_NTETANUS,NTETANUS,LEPTO,ILI,HEPA,CHIKUNGUNYA,MEASLES,RABIES,CHOLERA,HFMD,DIPH,DENGUE,COVID19'],
            ['id' => 2, 'lab_result' => 'NEG', 'lab_result_desc' => 'NEGATIVE', 'disease' => 'ABD,AFP,TYPHOID,PERTUSSIS,SARI,ROTAVIRUS,NON_NTETANUS,NTETANUS,LEPTO,ILI,HEPA,MEASLES,RABIES,CHOLERA,HFMD,DIPH,DENGUE,MENINGO,AMES,COVID19'],
            ['id' => 21, 'lab_result' => 'UD', 'lab_result_desc' => 'UNDETERMINED', 'disease' => 'DIPH'],
            ['id' => 22, 'lab_result' => 'NP', 'lab_result_desc' => 'NOT PROCESSED', 'disease' => 'DIPH'],
           
        ];
        foreach ($labresults as $labresult) {
            Labresult::insert([
                'id' => $labresult['id'],
                'lab_result' => $labresult['lab_result'],
                'lab_result_desc' => $labresult['lab_result_desc'],
                'disease' => $labresult['disease'],
            ]);
        }
               
        

    }
}
