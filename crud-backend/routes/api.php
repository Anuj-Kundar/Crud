<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ProductController;


Route::get('/product',[App\Http\Controllers\ProductController::class, 'index']);

Route::post('/save',[App\Http\Controllers\ProductController::class, 'store']);

Route::put('/update/{id}',[App\Http\Controllers\ProductController::class, 'update']);

Route::delete('/delete/{id}',[App\Http\Controllers\ProductController::class, 'destroy']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});