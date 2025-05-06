<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Region;
use Carbon\Carbon;

class RefRegionSeeder extends Seeder
{
    public function run()
    {
        $regions = [
            ['old_id' => 0, 'id' => 0, '10digitPSGC' => null, 'region_name' => 'Not Applicable', 'population' => null],
            ['old_id' => 1, 'id' => 1, '10digitPSGC' => '100000000', 'region_name' => 'Region I (Ilocos Region)', 'population' => null],
            ['old_id' => 2, 'id' => 2, '10digitPSGC' => '200000000', 'region_name' => 'Region II (Cagayan Valley)', 'population' => null],
            ['old_id' => 3, 'id' => 3, '10digitPSGC' => '300000000', 'region_name' => 'Region III (Central Luzon)', 'population' => null],
            ['old_id' => 4, 'id' => 4, '10digitPSGC' => '400000000', 'region_name' => 'Region IV-A (CALABARZON)', 'population' => null],
            ['old_id' => 5, 'id' => 5, '10digitPSGC' => '500000000', 'region_name' => 'Region V (Bicol Region)', 'population' => null],
            ['old_id' => 6, 'id' => 6, '10digitPSGC' => '600000000', 'region_name' => 'Region VI (Western Visayas)', 'population' => null],
            ['old_id' => 7, 'id' => 7, '10digitPSGC' => '700000000', 'region_name' => 'Region VII (Central Visayas)', 'population' => null],
            ['old_id' => 8, 'id' => 8, '10digitPSGC' => '800000000', 'region_name' => 'Region VIII (Eastern Visayas)', 'population' => null],
            ['old_id' => 9, 'id' => 9, '10digitPSGC' => '900000000', 'region_name' => 'Region IX (Zamboanga Peninsula)', 'population' => null],
            ['old_id' => 10, 'id' => 10, '10digitPSGC' => '1000000000', 'region_name' => 'Region X (Northern Mindanao)', 'population' => null],
            ['old_id' => 11, 'id' => 11, '10digitPSGC' => '1100000000', 'region_name' => 'Region XI (Davao Region)', 'population' => null],
            ['old_id' => 12, 'id' => 12, '10digitPSGC' => '1200000000', 'region_name' => 'Region XII (SOCCSKSARGEN)', 'population' => null],
            ['old_id' => 13, 'id' => 13, '10digitPSGC' => '1300000000', 'region_name' => 'National Capital Region (NCR)', 'population' => null],
            ['old_id' => 14, 'id' => 14, '10digitPSGC' => '1400000000', 'region_name' => 'Cordillera Administrative Region (CAR)', 'population' => null],
            ['old_id' => 16, 'id' => 16, '10digitPSGC' => '1600000000', 'region_name' => 'Region XIII (Caraga)', 'population' => null],
            ['old_id' => 17, 'id' => 17, '10digitPSGC' => '1700000000', 'region_name' => 'MIMAROPA Region', 'population' => null],
            ['old_id' => 15, 'id' => 19, '10digitPSGC' => '1900000000', 'region_name' => 'Bangsamoro Autonomous Region In Muslim Mindanao (BARMM)', 'population' => null],
        ];

        foreach ($regions as $region) {
            Region::create([
                'old_id' => $region['old_id'],
                'id' => $region['id'],
                '10digitPSGC' => $region['10digitPSGC'],
                'region_name' => $region['region_name'],
                'population' => $region['population'],
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
