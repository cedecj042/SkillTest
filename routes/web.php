<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/','/login');
Route::redirect('/users','/users');
Route::middleware('guest')->group(function(){
    Route::get('/login', [AuthController::class, 'showLogin'])->name('showLogin');
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::get('/signup', [AuthController::class, 'showSignup'])->name('showSignup');
    Route::post('/signup', [AuthController::class, 'signup'])->name('signup');
}); 

Route::middleware(['auth'])->group(function () {
    Route::redirect('/', '/users');
    Route::redirect('/api', '/users');
    Route::redirect('/users', destination: '/users');
    Route::redirect('/todos', '/todo');
    Route::prefix('users')->name('users.')->group(function(){
        Route::get('/', [UserController::class, 'index'])->name('index');
        Route::post('/',[UserController::class,'store'])->name('store');
        Route::get('/{id}',[UserController::class,'show'])->name('show');
        Route::put('/{id}',[UserController::class,'update'])->name('update');
        Route::delete('/{id}',[UserController::class,'delete'])->name('delete');
    });

    Route::prefix('todo')->name('todo.')->group(function(){
        Route::get('/', [TodoController::class, 'index'])->name('index');
        Route::post('/',[TodoController::class,'store'])->name('store');
        Route::get('/{id}',[TodoController::class,'show'])->name('show');
        Route::put('/{id}',[TodoController::class,'update'])->name('update');
        Route::delete('/{id}',[TodoController::class,'delete'])->name('delete');
    });
    Route::post('/logout',[AuthController::class,'logout'])->name('logout');        
});

Route::fallback(function () {
    return Inertia::render('ErrorPage',[
        'message'=>'We couldn’t find the page you’re looking for.'
    ]);
});