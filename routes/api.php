<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::controller(CategoryController::class)->group(function () {
    Route::post('category_store','store')->name('category_store');
    Route::post('category_update/{category}','update')->name('category_update');
    Route::get('categories','categories')->name('categories');
    Route::delete('category_delete/{category}','category_delete')->name('category_delete');
});
