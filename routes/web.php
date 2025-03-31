<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\StockDataController;
use App\Http\Controllers\GeneralStockController;
use App\Http\Controllers\PriceController;
use App\Http\Controllers\SavedPlotController;




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
    
    // Saved plots API routes
    Route::get('/api/saved-plots', [SavedPlotController::class, 'index']);
    Route::post('/api/saved-plots', [SavedPlotController::class, 'store']);
    Route::get('/api/saved-plots/{id}', [SavedPlotController::class, 'show']);
    Route::delete('/api/saved-plots/{id}', [SavedPlotController::class, 'destroy']);
});

Route::get('/movingstocks', [StockDataController::class, 'index']);

Route::get('/stocks', [GeneralStockController::class, 'index']);

Route::get('/general-stock-form', function () {
    return Inertia::render('general-stock-form');
})->middleware(['auth', 'verified'])->name('general-stock-form');

require __DIR__.'/settings.php';

require __DIR__.'/auth.php';
