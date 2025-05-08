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
        Schema::create('ref_region', function (Blueprint $table) {
            $table->integer('old_id')->nullable(); // old_id can be nullable
            $table->string('id', 10)->nullable(); // id, allowing for null
            $table->string('10digitPSGC', 10)->nullable(); // 10digitPSGC
            $table->string('region_name')->nullable(); // region_name
            $table->integer('population')->nullable(); // population
            $table->timestamps(); // created_at, updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ref_region');
    }
};
