<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('specimen', function (Blueprint $table) {
            $table->id();
            $table->string('case_id', 50);
            $table->string('lab_data', 1)->nullable();
            $table->string('API_ID', 255)->nullable();
            $table->string('epi_id', 50)->nullable();
            $table->date('date_specimen_collected')->nullable();
            $table->string('specimen_type', 100)->nullable();
            $table->string('lab_sent_RITM', 1)->nullable();
            $table->date('date_sent_RITM')->nullable();
            $table->date('date_received_by_lab')->nullable();
            $table->time('time_received_by_lab')->nullable();
            $table->string('lab_received_by', 100)->nullable();
            $table->string('type_test', 100)->nullable();
            $table->date('date_testing')->nullable();
            $table->string('lab_result', 255)->nullable();
            $table->date('date_result')->nullable();
            $table->string('typeoforganism', 100)->nullable();
            $table->string('interpretation', 100)->nullable();
            $table->string('remarks', 100)->nullable();
            $table->string('updatedby_RITM', 1)->nullable();
            $table->string('last_modified_by_RITM', 50)->nullable();
            $table->dateTime('last_modified_date_RITM')->nullable();
            $table->string('API_labdata_ID', 255);

            $table->timestamps();    // created_at, updated_at
            $table->softDeletes();   // deleted_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('specimen');
    }
};
