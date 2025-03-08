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
        Schema::create('stock_data', function (Blueprint $table) {
            $table->id();
            $table->foreignId(User::class);
            $table->json('Date');
            $table->json('Open');
            $table->json('Close');
            $table->string('Ticker');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock_data');
    }
};
