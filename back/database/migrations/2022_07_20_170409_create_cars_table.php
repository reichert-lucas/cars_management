<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->string('name');
            $table->unsignedSmallInteger('year');
            $table->string('model');
            $table->decimal('price', 8, 2);
            $table->string('fuel');
            $table->string('banner')->nullable();

            $table->bigInteger('color_id')->nullable();
            $table->foreign('color_id')->references('id')->on('colors');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};
