<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TestType;
class TestTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $testtypes = [
            ['id' => 4, 'test_id' => 'PCR', 'test_description' => 'Polymerase Chain Reaction', 'disease' => 'DIPH,DENGUE'],
            ['id' => 5, 'test_id' => 'VI', 'test_description' => 'Virus Isolation', 'disease' => 'DIPH,DENGUE'],
       
           
        ];

        foreach ($testtypes as $testtype) {
            TestType::insert([
                'id' => $testtype['id'],
                'test_id' => $testtype['test_id'],
                'test_description' => $testtype['test_description'],
                'disease' => $testtype['disease'],
   
            ]);
        }


    }
}
