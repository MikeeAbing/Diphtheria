<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('patient_consultation', function (Blueprint $table) {
            $table->id();
            $table->string('patient_number', 30);
            $table->string('consultation_id', 30);
            $table->date('consultation_date');
            $table->time('consultation_time');
            $table->string('mode_of_transaction', 50);
            $table->string('type_of_consultation', 50);
            $table->string('chief_complaint', 255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patient_consultation');
    }
};
