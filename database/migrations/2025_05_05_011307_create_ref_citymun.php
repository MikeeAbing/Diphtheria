<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('ref_citymun', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('old_id');
            $table->bigInteger('region_id');
            $table->bigInteger('province_id');
            $table->string('10digitPSGC', 10);
            $table->string('city_name');
            $table->string('geographic_level')->nullable();
            $table->string('city_class')->nullable();
            $table->string('uhc_class')->nullable();
            $table->string('income_class')->nullable();
            $table->bigInteger('population')->nullable();
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ref_citymun');
    }
};
