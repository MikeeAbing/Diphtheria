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
        Schema::table('case_report', function (Blueprint $table) {
            //Ensure case_id exists
            $table->string('case_id')->change();

            // //Add foreign key constraint
            // $table->foreign('patient_number')
            // ->references('patient_number')
            // ->on('patient_info')
            // ->onDelete('cascade')
            // ->onUpdate('cascade');

            //Add foreign key constraint
            $table->foreign('case_id')
            ->references('case_id')
            ->on('patient_info')
            ->onDelete('cascade')
            ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('case_report', function (Blueprint $table) {
            //
        });
    }
};
