<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return view('welcome');
});




Route::middleware('api')->group(function () {

    Route::post('/login', [AuthController::class, 'login']);
 

});

Route::middleware('auth:api')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/admin', [AuthController::class, 'admin']);   

});



