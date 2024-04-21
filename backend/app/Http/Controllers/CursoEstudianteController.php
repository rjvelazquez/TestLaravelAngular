<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use App\Models\Estudiante;
use Illuminate\Http\Request;

class CursoEstudianteController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Curso $curso, Estudiante $estudiante)
{
    try {
        // Add the student to the course
        $curso->estudiantes()->attach($estudiante); 

        // Return a response
        return response()->json(['message' => 'Estudiante agregado al curso con éxito'], 201);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Error al agregar el estudiante al curso', 'message' => $e->getMessage()], 500);
    }
}

public function destroy(Curso $curso, Estudiante $estudiante)
{
    try {
        // Remove the student from the course
        $curso->estudiantes()->detach($estudiante);

        // Return a response
        return response()->json(['message' => 'Estudiante eliminado del curso con éxito'], 200);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Error al eliminar el estudiante del curso', 'message' => $e->getMessage()], 500);
    }
}
}