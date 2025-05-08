<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SpecimenType;
class SpecimenTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $specimentypes = [
            ['id' => 4, 'specimen_id' => 'SLV', 'specimen_description' => 'Saliva', 'disease' => 'PERTUSSIS,TYPHOID,SARI,NON_NTETANUS,NTETANUS,ILI,RABIES,DIPH,COVID19'],
            ['id' => 5, 'specimen_id' => 'NPS-OPS', 'specimen_description' => 'Nasopharyngeal/Oropharyngeal Swab (NPS/OPS)' , 'disease' => 'PERTUSSIS,SARI,NON_NTETANUS,NTETANUS,ILI,MEASLES,DIPH,COVID19'],

           
        ];
        foreach ($specimentypes as $specimentype) {
            SpecimenType::insert([
                'id' => $specimentype['id'],
                'specimen_id' => $specimentype['specimen_id'],
                'specimen_description' => $specimentype['specimen_description'],
                'disease' => $specimentype['disease'],
            ]);
        }

        
    }
}
