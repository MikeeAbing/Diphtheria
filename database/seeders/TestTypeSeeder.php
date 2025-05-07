<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\DB;
class TestTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('ref_type_test')->insert([
            ['id' => 4, 'test_id' => 'PCR', 'test_description' => 'Polymerase Chain Reaction', 'disease ' => 'AFP,PERTUSSIS,SARI,ROTAVIRUS,NON_NTETANUS,NTETANUS,LEPTO,ILI,CHIKUNGUNYA,HEPA,MEASLES,HFMD,DIPH,MENINGO,DENGUE'],
            ['id' => 5, 'test_id' => 'VI', 'test_description' => 'Virus Isolation', 'disease ' => 'AFP,PERTUSSIS,SARI,ROTAVIRUS,NON_NTETANUS,NTETANUS,ILI,CHIKUNGUNYA,MEASLES,RABIES,HFMD,DIPH,DENGUE'],
       
           
        ]);
    }
}
