<?php

namespace Database\Seeders;

use App\Models\Province;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RefProvSeeder extends Seeder
{
   /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $provinces = [
            ['old_id' => 1013, 'id' => 10013, 'region_id' => 10, '10digitPSGC' => '1001300000', 'province_name' => 'Bukidnon', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 1018, 'id' => 10018, 'region_id' => 10, '10digitPSGC' => '1001800000', 'province_name' => 'Camiguin', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 1035, 'id' => 10035, 'region_id' => 10, '10digitPSGC' => '1003500000', 'province_name' => 'Lanao del Norte', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 1042, 'id' => 10042, 'region_id' => 10, '10digitPSGC' => '1004200000', 'province_name' => 'Misamis Occidental', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 1043, 'id' => 10043, 'region_id' => 10, '10digitPSGC' => '1004300000', 'province_name' => 'Misamis Oriental', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => null, 'id' => 10305, 'region_id' => 10, '10digitPSGC' => '1030500000', 'province_name' => 'City of Cagayan De Oro', 'geographic_level' => 'City/HUC', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => null, 'id' => 10309, 'region_id' => 10, '10digitPSGC' => '1030900000', 'province_name' => 'City of Iligan', 'geographic_level' => 'City/HUC', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 133, 'id' => 1033, 'region_id' => 1, '10digitPSGC' => '1033000000', 'province_name' => 'La Union', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 155, 'id' => 1055, 'region_id' => 1, '10digitPSGC' => '1055000000', 'province_name' => 'Pangasinan', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 1123, 'id' => 11023, 'region_id' => 11, '10digitPSGC' => '1102300000', 'province_name' => 'Davao del Norte', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 1124, 'id' => 11024, 'region_id' => 11, '10digitPSGC' => '1102400000', 'province_name' => 'Davao del Sur', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 1125, 'id' => 11025, 'region_id' => 11, '10digitPSGC' => '1102500000', 'province_name' => 'Davao Oriental', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 1182, 'id' => 11082, 'region_id' => 11, '10digitPSGC' => '1108200000', 'province_name' => 'Davao de Oro', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 1186, 'id' => 11086, 'region_id' => 11, '10digitPSGC' => '1108600000', 'province_name' => 'Davao Occidental', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => null, 'id' => 11307, 'region_id' => 11, '10digitPSGC' => '1130700000', 'province_name' => 'City of Davao', 'geographic_level' => 'City/HUC', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 1247, 'id' => 12047, 'region_id' => 12, '10digitPSGC' => '1204700000', 'province_name' => 'Cotabato', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 1263, 'id' => 12063, 'region_id' => 12, '10digitPSGC' => '1206300000', 'province_name' => 'South Cotabato', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 1265, 'id' => 12065, 'region_id' => 12, '10digitPSGC' => '1206500000', 'province_name' => 'Sultan Kudarat', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 1280, 'id' => 12080, 'region_id' => 12, '10digitPSGC' => '1208000000', 'province_name' => 'Sarangani', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => null, 'id' => 12308, 'region_id' => 12, '10digitPSGC' => '1230800000', 'province_name' => 'City of General Santos', 'geographic_level' => 'City/HUC', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 1339, 'id' => 13806, 'region_id' => 13, '10digitPSGC' => '1380600000', 'province_name' => 'NCR, City of Manila, First District (Not a Province)', 'geographic_level' => 'Dist', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 1374, 'id' => 13807, 'region_id' => 13, '10digitPSGC' => '1380700000', 'province_name' => 'NCR, Second District (Not a Province)', 'geographic_level' => 'Dist', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 1375, 'id' => 13808, 'region_id' => 13, '10digitPSGC' => '1380800000', 'province_name' => 'NCR, Third District (Not a Province)', 'geographic_level' => 'Dist', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 1376, 'id' => 13809, 'region_id' => 13, '10digitPSGC' => '1380900000', 'province_name' => 'NCR, Fourth District (Not a Province)', 'geographic_level' => 'Dist', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 1401, 'id' => 14001, 'region_id' => 14, '10digitPSGC' => '1400100000', 'province_name' => 'Abra', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 1411, 'id' => 14011, 'region_id' => 14, '10digitPSGC' => '1401100000', 'province_name' => 'Benguet', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 1427, 'id' => 14027, 'region_id' => 14, '10digitPSGC' => '1402700000', 'province_name' => 'Ifugao', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 1432, 'id' => 14032, 'region_id' => 14, '10digitPSGC' => '1403200000', 'province_name' => 'Kalinga', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 1444, 'id' => 14044, 'region_id' => 14, '10digitPSGC' => '1404400000', 'province_name' => 'Mountain Province', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 1481, 'id' => 14081, 'region_id' => 14, '10digitPSGC' => '1408100000', 'province_name' => 'Apayao', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => null, 'id' => 14303, 'region_id' => 14, '10digitPSGC' => '1430300000', 'province_name' => 'City of Baguio', 'geographic_level' => 'City/HUC', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 1602, 'id' => 16002, 'region_id' => 16, '10digitPSGC' => '1600200000', 'province_name' => 'Agusan del Norte', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 1603, 'id' => 16003, 'region_id' => 16, '10digitPSGC' => '1600300000', 'province_name' => 'Agusan del Sur', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 1667, 'id' => 16067, 'region_id' => 16, '10digitPSGC' => '1606700000', 'province_name' => 'Surigao del Norte', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 1668, 'id' => 16068, 'region_id' => 16, '10digitPSGC' => '1606800000', 'province_name' => 'Surigao del Sur', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 1685, 'id' => 16085, 'region_id' => 16, '10digitPSGC' => '1608500000', 'province_name' => 'Dinagat Islands', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => null, 'id' => 16304, 'region_id' => 16, '10digitPSGC' => '1630400000', 'province_name' => 'City of Butuan', 'geographic_level' => 'City/HUC', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 1740, 'id' => 17040, 'region_id' => 17, '10digitPSGC' => '1704000000', 'province_name' => 'Marinduque', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 1751, 'id' => 17051, 'region_id' => 17, '10digitPSGC' => '1705100000', 'province_name' => 'Occidental Mindoro', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 1752, 'id' => 17052, 'region_id' => 17, '10digitPSGC' => '1705200000', 'province_name' => 'Oriental Mindoro', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 1753, 'id' => 17053, 'region_id' => 17, '10digitPSGC' => '1705300000', 'province_name' => 'Palawan', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 1759, 'id' => 17059, 'region_id' => 17, '10digitPSGC' => '1705900000', 'province_name' => 'Romblon', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => null, 'id' => 17315, 'region_id' => 17, '10digitPSGC' => '1731500000', 'province_name' => 'City of Puerto Princesa', 'geographic_level' => 'City/HUC', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 1507, 'id' => 19007, 'region_id' => 19, '10digitPSGC' => '1900700000', 'province_name' => 'Basilan', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 1536, 'id' => 19036, 'region_id' => 19, '10digitPSGC' => '1903600000', 'province_name' => 'Lanao del Sur', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 1566, 'id' => 19066, 'region_id' => 19, '10digitPSGC' => '1906600000', 'province_name' => 'Sulu', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 1570, 'id' => 19070, 'region_id' => 19, '10digitPSGC' => '1907000000', 'province_name' => 'Tawi-Tawi', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 0, 'id' => 19087, 'region_id' => 19, '10digitPSGC' => '1908700000', 'province_name' => 'Maguindanao del Norte', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 0, 'id' => 19088, 'region_id' => 19, '10digitPSGC' => '1908800000', 'province_name' => 'Maguindanao del Sur', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 209, 'id' => 2009, 'region_id' => 2, '10digitPSGC' => '200900000', 'province_name' => 'Batanes', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 215, 'id' => 2015, 'region_id' => 2, '10digitPSGC' => '201500000', 'province_name' => 'Cagayan', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 231, 'id' => 2031, 'region_id' => 2, '10digitPSGC' => '203100000', 'province_name' => 'Isabela', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 250, 'id' => 2050, 'region_id' => 2, '10digitPSGC' => '205000000', 'province_name' => 'Nueva Vizcaya', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 257, 'id' => 2057, 'region_id' => 2, '10digitPSGC' => '205700000', 'province_name' => 'Quirino', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 308, 'id' => 3008, 'region_id' => 3, '10digitPSGC' => '300800000', 'province_name' => 'Bataan', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 314, 'id' => 3014, 'region_id' => 3, '10digitPSGC' => '301400000', 'province_name' => 'Bulacan', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 349, 'id' => 3049, 'region_id' => 3, '10digitPSGC' => '304900000', 'province_name' => 'Nueva Ecija', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 354, 'id' => 3054, 'region_id' => 3, '10digitPSGC' => '305400000', 'province_name' => 'Pampanga', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 369, 'id' => 3069, 'region_id' => 3, '10digitPSGC' => '306900000', 'province_name' => 'Tarlac', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 371, 'id' => 3071, 'region_id' => 3, '10digitPSGC' => '307100000', 'province_name' => 'Zambales', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 377, 'id' => 3077, 'region_id' => 3, '10digitPSGC' => '307700000', 'province_name' => 'Aurora', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => null, 'id' => 3301, 'region_id' => 3, '10digitPSGC' => '330100000', 'province_name' => 'City of Angeles', 'geographic_level' => 'City/HUC', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => null, 'id' => 3314, 'region_id' => 3, '10digitPSGC' => '331400000', 'province_name' => 'City of Olongapo', 'geographic_level' => 'City/HUC', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 410, 'id' => 4010, 'region_id' => 4, '10digitPSGC' => '401000000', 'province_name' => 'Batangas', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 421, 'id' => 4021, 'region_id' => 4, '10digitPSGC' => '402100000', 'province_name' => 'Cavite', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 434, 'id' => 4034, 'region_id' => 4, '10digitPSGC' => '403400000', 'province_name' => 'Laguna', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 456, 'id' => 4056, 'region_id' => 4, '10digitPSGC' => '405600000', 'province_name' => 'Quezon', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 458, 'id' => 4058, 'region_id' => 4, '10digitPSGC' => '405800000', 'province_name' => 'Rizal', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => null, 'id' => 4312, 'region_id' => 4, '10digitPSGC' => '431200000', 'province_name' => 'City of Lucena', 'geographic_level' => 'City/HUC', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 505, 'id' => 5005, 'region_id' => 5, '10digitPSGC' => '500500000', 'province_name' => 'Albay', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 516, 'id' => 5016, 'region_id' => 5, '10digitPSGC' => '501600000', 'province_name' => 'Camarines Norte', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 517, 'id' => 5017, 'region_id' => 5, '10digitPSGC' => '501700000', 'province_name' => 'Camarines Sur', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
            ['old_id' => 520, 'id' => 5020, 'region_id' => 5, '10digitPSGC' => '502000000', 'province_name' => 'Catanduanes', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
    ['old_id' => 541, 'id' => 5041, 'region_id' => 5, '10digitPSGC' => '504100000', 'province_name' => 'Masbate', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
    ['old_id' => 562, 'id' => 5062, 'region_id' => 5, '10digitPSGC' => '506200000', 'province_name' => 'Sorsogon', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
    ['old_id' => 604, 'id' => 6004, 'region_id' => 6, '10digitPSGC' => '600400000', 'province_name' => 'Aklan', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
    ['old_id' => 606, 'id' => 6006, 'region_id' => 6, '10digitPSGC' => '600600000', 'province_name' => 'Antique', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
    ['old_id' => 619, 'id' => 6019, 'region_id' => 6, '10digitPSGC' => '601900000', 'province_name' => 'Capiz', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
    ['old_id' => 630, 'id' => 6030, 'region_id' => 6, '10digitPSGC' => '603000000', 'province_name' => 'Iloilo', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
    ['old_id' => 645, 'id' => 6045, 'region_id' => 6, '10digitPSGC' => '604500000', 'province_name' => 'Negros Occidental', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
    ['old_id' => 679, 'id' => 6079, 'region_id' => 6, '10digitPSGC' => '607900000', 'province_name' => 'Guimaras', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
    ['old_id' => null, 'id' => 6310, 'region_id' => 6, '10digitPSGC' => '631000000', 'province_name' => 'City of Iloilo', 'geographic_level' => 'City/HUC', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
    ['old_id' => 712, 'id' => 7012, 'region_id' => 7, '10digitPSGC' => '701200000', 'province_name' => 'Bohol', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
    ['old_id' => 722, 'id' => 7022, 'region_id' => 7, '10digitPSGC' => '702200000', 'province_name' => 'Cebu', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
    ['old_id' => 746, 'id' => 7046, 'region_id' => 7, '10digitPSGC' => '704600000', 'province_name' => 'Negros Oriental', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
    ['old_id' => 761, 'id' => 7061, 'region_id' => 7, '10digitPSGC' => '706100000', 'province_name' => 'Siquijor', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
    ['old_id' => null, 'id' => 7306, 'region_id' => 7, '10digitPSGC' => '730600000', 'province_name' => 'City of Cebu', 'geographic_level' => 'City/HUC', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
    ['old_id' => null, 'id' => 7311, 'region_id' => 7, '10digitPSGC' => '731100000', 'province_name' => 'City of Lapu-Lapu', 'geographic_level' => 'City/HUC', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
    ['old_id' => null, 'id' => 7313, 'region_id' => 7, '10digitPSGC' => '731300000', 'province_name' => 'City of Mandaue', 'geographic_level' => 'City/HUC', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
    ['old_id' => 826, 'id' => 8026, 'region_id' => 8, '10digitPSGC' => '802600000', 'province_name' => 'Eastern Samar', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
    ['old_id' => 837, 'id' => 8037, 'region_id' => 8, '10digitPSGC' => '803700000', 'province_name' => 'Leyte', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
    ['old_id' => 848, 'id' => 8048, 'region_id' => 8, '10digitPSGC' => '804800000', 'province_name' => 'Northern Samar', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
    ['old_id' => 860, 'id' => 8060, 'region_id' => 8, '10digitPSGC' => '806000000', 'province_name' => 'Samar', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
    ['old_id' => 864, 'id' => 8064, 'region_id' => 8, '10digitPSGC' => '806400000', 'province_name' => 'Southern Leyte', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
    ['old_id' => 878, 'id' => 8078, 'region_id' => 8, '10digitPSGC' => '807800000', 'province_name' => 'Biliran', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
    ['old_id' => null, 'id' => 8316, 'region_id' => 8, '10digitPSGC' => '831600000', 'province_name' => 'City of Tacloban', 'geographic_level' => 'City/HUC', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
    ['old_id' => 972, 'id' => 9072, 'region_id' => 9, '10digitPSGC' => '907200000', 'province_name' => 'Zamboanga del Norte', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
    ['old_id' => 973, 'id' => 9073, 'region_id' => 9, '10digitPSGC' => '907300000', 'province_name' => 'Zamboanga del Sur', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
    ['old_id' => 983, 'id' => 9083, 'region_id' => 9, '10digitPSGC' => '908300000', 'province_name' => 'Zamboanga Sibugay', 'geographic_level' => 'Prov', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
    ['old_id' => null, 'id' => 9317, 'region_id' => 9, '10digitPSGC' => '931700000', 'province_name' => 'City of Zamboanga', 'geographic_level' => 'City/HUC', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
    ['old_id' => 997, 'id' => 9901, 'region_id' => 9, '10digitPSGC' => '990100000', 'province_name' => 'City of Isabela (Not a Province)', 'geographic_level' =>'Dist', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
    
    ['old_id' => null, 'id' => 19999, 'region_id' => 19, '10digitPSGC' => '1999900000', 'province_name' => 'BARMM, Special Government Unit', 'geographic_level' => 'SGU', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],
    ['old_id' => null, 'id' => 6302, 'region_id' => 6, '10digitPSGC' => '630200000', 'province_name' => 'City of Bacolod', 'geographic_level' => 'City/HUC', 'income_class' => null, 'population' => null, 'created_at' => null, 'updated_at' => null],        
    // Add the rest of the rows as needed...
         
        ];

        foreach ($provinces as $province) {
            Province::create($province);
        }

    }


}
