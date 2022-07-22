<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CarsController;
use App\Http\Controllers\Api\CarUpdateLogsController;
use App\Http\Controllers\Api\ColorsController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Auth routes
Route::group(['prefix' => 'auth'], function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
});

// Protected routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    // auth
    Route::get('auth/profile', [AuthController::class, 'profile']);
    Route::post('auth/logout', [AuthController::class, 'logout']);

    // Colors
    Route::resource('colors', ColorsController::class);

    // Cars
    Route::get('cars/logs', [CarUpdateLogsController::class, 'index']);
    Route::resource('cars', CarsController::class);
    
});
