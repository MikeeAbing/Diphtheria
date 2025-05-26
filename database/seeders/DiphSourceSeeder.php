<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\DiphSource;


class DiphSourceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $sources = [
            ['id' => 1, 'source_code' => 'CARD', 'source_desc' => 'Vaccination Card'],
            ['id' => 2, 'source_code' => 'RECALL', 'source_desc' => 'By Recall'],
            ['id' => 3, 'source_code' => 'TCL', 'source_desc' => 'Target Client List'],
        ];
        foreach ($sources as $source) {
            DiphSource::insert([
                'id' => $source['id'],
                'source_code' => $source['source_code'],
                'source_desc' => $source['source_desc'],
   
            ]);
               
        }

    }
}