<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Verification;
class VerificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $verifications = [
            ['id' => 1, 'verification_code' => 'HOSP', 'verification_level' => 'Hospital'],
            ['id' => 2, 'verification_code' => 'RESU', 'verification_level' => 'Region'],
            ['id' => 3, 'verification_code' => 'EB', 'verification_level' => 'Epidemiology Bureau'],
           
        ];
        foreach ($verifications as $verification) {
            Verification::insert([
                'id' => $verification['id'],
                'verification_code' => $verification['verification_code'],
                'verification_level' => $verification['verification_level'],

   
            ]);
        }
    }
}
