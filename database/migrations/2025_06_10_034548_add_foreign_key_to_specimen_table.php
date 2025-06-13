<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('specimen', function (Blueprint $table) {
            //Ensure epi_id exists
            $table->string('epi_id')->change();

            //Add foreign key constraint
            $table->foreign('epi_id')
                ->references('epi_id')
                ->on('case_report')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('specimen', function (Blueprint $table) {
            //
        });
    }
};
