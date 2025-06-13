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
        Schema::create('case_report', function (Blueprint $table) {
            $table->id();
            $table->string('case_id', 50);
            $table->string('epi_id', 50)->nullable()->unique();
            // $table->string('epi_id', 50)->nullable();
            $table->string('patient_number', 30);
            $table->integer('disease_age')->nullable();
            $table->string('admitted', 1)->nullable();
            $table->date('date_admitted')->nullable();
            $table->string('caregiver', 150)->nullable();
            $table->string('caregiver_no', 50)->nullable();
            $table->date('date_report')->nullable();
            $table->string('reporter', 150)->nullable();
            $table->string('reporter_no', 50)->nullable();
            $table->date('date_investigation')->nullable();
            $table->string('investigator', 150)->nullable();
            $table->string('investigator_no', 50)->nullable();
            $table->string('diphtheria_dose', 1)->nullable();
            $table->integer('total_dose')->nullable();
            $table->date('date_last_vaccination')->nullable();
            $table->string('sourceinformation', 150)->nullable();
            $table->string('known_exposure', 50)->nullable();
            $table->string('exposure_other', 150)->nullable();
            $table->string('name_school', 150)->nullable();
            $table->string('travel14days', 1)->nullable();
            $table->string('travel_detail', 150)->nullable();
            $table->date('date_onset')->nullable();
            $table->string('fever', 1)->nullable();
            $table->string('cough', 1)->nullable();
            $table->string('sorethroat', 1)->nullable();
            $table->string('pseudomembrane', 1)->nullable();
            $table->string('swallowing', 1)->nullable();
            $table->string('breathing', 1)->nullable();
            $table->string('other_symptoms', 1)->nullable();
            $table->string('other_symptoms_specify', 150)->nullable();
            $table->string('outcome', 255)->nullable();
            $table->date('datedied')->nullable();
            $table->string('antibiotic', 1)->nullable();
            $table->date('antibiotic_date')->nullable();
            $table->string('diphtheriatoxin', 1)->nullable();
            $table->date('diphtheriatoxin_date')->nullable();
            $table->string('final_classi', 150)->nullable();
            $table->string('user_id', 100)->nullable();
            $table->dateTime('timestamp')->nullable();
            $table->string('verification_level', 50)->nullable();
            $table->string('case_code', 50)->nullable();
            $table->string('last_modified_by', 100)->nullable();
            $table->dateTime('last_modified_date_patient')->nullable();
            $table->dateTime('last_modified_date_disease')->nullable();
            $table->dateTime('last_modified_date_lab')->nullable();
            $table->string('hfhudcode', 255)->nullable();
            $table->dateTime('datevalidated_resu')->nullable();
            $table->integer('user_citycode')->nullable();
            $table->integer('user_provcode')->nullable();
            $table->integer('user_regcode')->nullable();
            $table->string('charteredcity', 20)->nullable();
            $table->string('dohretained', 20)->nullable();
            $table->string('hfhudcode_pesu')->nullable();
            $table->string('hfhudcode_resu', 255)->nullable();
            $table->char('duplicate', 1)->nullable();
            $table->string('timelapse_dateadmittodateencode', 50)->nullable();
            $table->string('timelapse_dateonsettodateencode', 50)->nullable();
            $table->string('timelapse_dateencodetodatevalidatedresu', 50)->nullable();
            $table->integer('ageinmonths')->nullable();
            $table->integer('ageindays')->nullable();
            $table->integer('morbiditymonth')->nullable();
            $table->string('pidsr_status', 10)->nullable();
            $table->timestamps();    // created_at, updated_at
            $table->softDeletes();   // deleted_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('case_report');
    }
};
