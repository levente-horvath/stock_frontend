<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\StockDataController;
use App\Http\Controllers\VolumeController;
use App\Http\Controllers\PriceController;




Route::get('/', function () {
    return Inertia::render('welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/login', function () {
    return Inertia::render('/login');
})->name('login');

Route::get('/register', function () {
    return Inertia::render('register');
})->name('register');

Route::get('/dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/stocks', [StockDataController::class, 'index']);

Route::get('/volume', [VolumeController::class, 'index']);

Route::get('/stockprice', [PriceController::class, 'index']);


require __DIR__.'/settings.php';

require __DIR__.'/auth.php';
