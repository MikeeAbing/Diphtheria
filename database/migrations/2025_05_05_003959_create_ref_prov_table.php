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
        Schema::create('ref_prov', function (Blueprint $table) {
            $table->id();
            $table->integer('old_id')->nullable();
            $table->integer('region_id');
            $table->string('10digitPSGC', 10);
            $table->string('province_name');
            $table->string('geographic_level');
            $table->string('income_class')->nullable()->default('N/A');
            $table->integer('population')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ref_prov');
    }
};
