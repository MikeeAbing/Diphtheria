<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Outcome;

class OutcomeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $outcomes = [
            ['id' => 1, 'outcome_code' => 'A', 'outcome_description' => 'Alive'],
            ['id' => 2, 'outcome_code' => 'D', 'outcome_description' => 'Died'],
            ['id' => 3, 'outcome_code' => 'HAMA', 'outcome_description' => 'Home Against Medical Advice'],
           
        ];
        foreach ($outcomes as $outcome) {
            Outcome::insert([
              
                'id' => $outcome['id'],
                'outcome_code' => $outcome['outcome_code'],
                'outcome_description' => $outcome['outcome_description'],
               
            ]);
        }

    }
}
