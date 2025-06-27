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
        Schema::create('patient_info', function (Blueprint $table) {
            $table->id();
            $table->string('patient_number', 30);
            $table->string('case_id', 50)->nullable()->unique();
            $table->string('firstname', 255);
            $table->string('middlename', 255);
            $table->string('lastname', 255);
            $table->string('suffixname', 5)->nullable();
            $table->string('sex', 1);
            $table->date('dateofbirth');
            $table->integer('ageinyears')->nullable();
            $table->integer('ageinmonths')->nullable();
            $table->integer('ageindays')->nullable();
            $table->string('member_of_IP', 1);
            $table->string('IP_tribe', 50)->nullable();
            $table->string('IP_tribe_specify', 255)->nullable();
            $table->string('pat_address_reg', 255)->nullable();
            $table->string('pat_address_prov', 255)->nullable();
            $table->string('pat_address_city', 255)->nullable();
            $table->string('pat_address_brgy', 255)->nullable();
            $table->string('pat_address_street_name', 255)->nullable();
            $table->string('pat_perm_address_reg', 255)->nullable();
            $table->string('pat_perm_address_prov', 255)->nullable();
            $table->string('pat_perm_address_city', 255)->nullable();
            $table->string('pat_perm_address_brgy', 255)->nullable();
            $table->string('pat_perm_address_street_name', 255)->nullable();
            $table->string('facilityname', 150)->nullable();
            $table->string('occupation', 150)->nullable();
            $table->string('phone_no', 50)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('patient_info');
    }
};
