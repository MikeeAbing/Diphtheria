<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\DB;
class SpecimenTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('ref_specimen_type')->insert([
            ['id' => 4, 'specimen_id' => 'SLV', 'specimen_description' => 'Saliva', 'disease' => 'PERTUSSIS,TYPHOID,SARI,NON_NTETANUS,NTETANUS,ILI,RABIES,DIPH,COVID19'],
            ['id' => 5, 'specimen_id' => 'NPS-OPS', 'specimen_description' => 'Nasopharyngeal/Oropharyngeal Swab (NPS/OPS)' , 'disease' => 'PERTUSSIS,SARI,NON_NTETANUS,NTETANUS,ILI,MEASLES,DIPH,COVID19'],

           
        ]);
    }
}
