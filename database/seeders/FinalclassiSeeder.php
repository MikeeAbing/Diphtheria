<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Finalclassi;
class FinalclassiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $finalclassifications= [
            ['id' => 1, 'finalclassi_code' => 'SUS', 'finalclassi_desc' => 'Suspect Case'],
            ['id' => 2, 'finalclassi_code' => 'LAB', 'finalclassi_desc' => 'Laboratory Confirmed'],
            ['id' => 3, 'finalclassi_code' => 'EPI', 'finalclassi_desc' => 'Epidemiologically Linked'],
            ['id' => 4, 'finalclassi_code' => 'COMP', 'finalclassi_desc' => 'Clinically Compatible'],
            ['id' => 5, 'finalclassi_code' => 'DISC', 'finalclassi_desc' => 'Discarded'],
        ];

        foreach ($finalclassifications as $finalclassification) {
            Finalclassi::insert([
                'id' => $finalclassification['id'],
                'finalclassi_code' => $finalclassification['finalclassi_code'],
                'finalclassi_desc' => $finalclassification['finalclassi_desc'],
   
            ]);
               
        }
    }
}
