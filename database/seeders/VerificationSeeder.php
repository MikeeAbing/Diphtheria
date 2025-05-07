<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\DB;
class VerificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('ref_verification_level')->insert([
            ['id' => 1, 'verification_code' => 'HOSP', 'verification_level' => 'Hospital'],
            ['id' => 2, 'verification_code' => 'RESU', 'verification_level' => 'Region'],
            ['id' => 3, 'verification_code' => 'EB', 'verification_level' => 'Epidemiology Bureau'],
           
        ]);
    }
}
