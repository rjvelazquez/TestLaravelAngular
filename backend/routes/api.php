<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CursoController;
use App\Http\Controllers\EstudianteController;
use App\Http\Controllers\CursoEstudianteController;



Route::get('/', function () {
    return response()->json(['message' => 'API root']);
});


Route::middleware('api')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);

});


Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/admin', [AuthController::class, 'admin']);  

    Route::get('/cursos', [CursoController::class, 'index']); // Listar todos los cursos
    Route::get('/cursos/{curso}', [CursoController::class, 'show']); // Obtener curso por ID
    Route::post('/cursos', [CursoController::class, 'store']); // Crear un nuevo curso
    Route::put('/cursos/{curso}', [CursoController::class, 'update']); // Actualizar curso
    Route::delete('/cursos/{curso}', [CursoController::class, 'destroy']); // Eliminar curso
    
    Route::get('/estudiantes', [EstudianteController::class, 'index']); // Listar todos los estudiantes
    Route::get('/estudiantes/{estudiante}', [EstudianteController::class, 'show']); // Obtener estudiante por ID
    Route::post('/estudiantes', [EstudianteController::class, 'store']); // Crear un nuevo estudiante
    Route::put('/estudiantes/{estudiante}', [EstudianteController::class, 'update']); // Actualizar estudiante
    Route::delete('/estudiantes/{estudiante}', [EstudianteController::class, 'destroy']); // Eliminar estudiante

    Route::post('/cursos/{curso}/estudiantes/{estudiante}', [CursoEstudianteController::class, 'store']); // Agregar estudiante a curso
    Route::delete('/cursos/{curso}/estudiantes/{estudiante}', [CursoEstudianteController::class, 'destroy']); // Eliminar estudiante de curso


});  




// Puedes añadir más rutas según necesites



/*
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->group(function () {
    // Add your protected routes here
    Route::get('/cursos', 'CursoController@index'); // Listar todos los cursos
    Route::get('/cursos/{curso}', 'CursoController@show'); // Obtener curso por ID
    Route::post('/cursos', 'CursoController@store'); // Crear un nuevo curso
    Route::put('/cursos/{curso}', 'CursoController@update'); // Actualizar curso
    Route::delete('/cursos/{curso}', 'CursoController@destroy'); // Eliminar curso

    Route::get('/estudiantes', 'EstudianteController@index'); // Listar todos los estudiantes
    Route::get('/estudiantes/{estudiante}', 'EstudianteController@show'); // Obtener estudiante por ID
    Route::post('/estudiantes', 'EstudianteController@store'); // Crear un nuevo estudiante
    Route::put('/estudiantes/{estudiante}', 'EstudianteController@update'); // Actualizar estudiante
    Route::delete('/estudiantes/{estudiante}', 'EstudianteController@destroy'); // Eliminar estudiante

    Route::post('/cursos/{curso}/estudiantes/{estudiante}', 'CursoEstudianteController@store'); // Agregar estudiante a curso
    Route::delete('/cursos/{curso}/estudiantes/{estudiante}', 'CursoEstudianteController@destroy'); // Eliminar estudiante de curso

    Route::get('/cursos/{curso}/estudiantes', 'CursoEstudianteController@index'); // Listar estudiantes de un curso
    Route::get('/estudiantes/{estudiante}/cursos', 'CursoEstudianteController@index'); // Listar cursos de un estudiante

    Route::get('/cursos/{curso}/estudiantes/{estudiante}', 'CursoEstudianteController@show'); // Obtener relación entre curso y estudiante
    Route::put('/cursos/{curso}/estudiantes/{estudiante}', 'CursoEstudianteController@update'); // Actualizar relación entre curso y estudiante

    Route::get('/user', 'AuthController@user'); // Obtener usuario autenticado
    Route::post('/logout', 'AuthController@logout'); // Cerrar sesión



});

Route::middleware('api')->group(function () {
    // Add your public routes here
    Route::post('/login', 'AuthController@login'); // Iniciar sesión
    Route::post('/register', 'AuthController@register'); // Registrar usuario




});
*/