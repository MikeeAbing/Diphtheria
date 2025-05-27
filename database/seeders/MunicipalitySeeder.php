<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Municipality;
class MunicipalitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {

        $cities = [
            ['old_id' => 124701, 'id' => 1204701, 'region_id' => 12, 'province_id' => 12047, '10digitPSGC' => '1204701000', 'city_name' => 'Alamada', 'geographic_level' => 'Mun', 'city_class' => null, 'uhc_class' => null, 'income_class' => null, 'population' => null],
            ['old_id' => 124702, 'id' => 1204702, 'region_id' => 12, 'province_id' => 12047, '10digitPSGC' => '1204702000', 'city_name' => 'Carmen', 'geographic_level' => 'Mun', 'city_class' => null, 'uhc_class' => null, 'income_class' => null, 'population' => null],
            ['old_id' => 124703, 'id' => 1204703, 'region_id' => 12, 'province_id' => 12047, '10digitPSGC' => '1204703000', 'city_name' => 'Kabacan', 'geographic_level' => 'Mun', 'city_class' => null, 'uhc_class' => null, 'income_class' => null, 'population' => null],
            ['old_id' => 124704, 'id' => 1204704, 'region_id' => 12, 'province_id' => 12047, '10digitPSGC' => '1204704000', 'city_name' => 'City of Kidapawan', 'geographic_level' => 'City', 'city_class' => 'CC', 'uhc_class' => null, 'income_class' => null, 'population' => null],
            // Add the rest of the cities here...
        ];

        foreach ($cities as $city) {
            Municipality::create($city);
        }
        
    }
}
