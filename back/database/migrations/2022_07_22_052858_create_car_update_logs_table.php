<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('car_update_logs', function (Blueprint $table) {
            $table->id();

            $table->json('before')->nullable();
            $table->json('after')->nullable();

            $table->uuid('car_id');
            $table->foreign('car_id')->references('id')->on('cars')->onDelete('cascade');

            $table->bigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('car_update_logs');
    }
};
