<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\DB;

class OutcomeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('ref_outcome')->insert([
            ['id' => 1, 'outcome_code' => 'A', 'outcome_description' => 'Alive'],
            ['id' => 2, 'outcome_code' => 'D', 'outcome_description' => 'Died'],
            ['id' => 3, 'outcome_code' => 'HAMA', 'outcome_description' => 'Home Against Medical Advice'],
           
        ]);
    }
}
