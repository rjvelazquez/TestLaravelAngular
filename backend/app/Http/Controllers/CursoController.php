<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use Illuminate\Http\Request;
use App\Http\Resources\CursoResource;

class CursoController extends Controller
{
    public function index()
{
    try {
        $cursos = Curso::all();  // Listar todos los cursos
        return response()->json($cursos);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Error al listar los cursos', 'message' => $e->getMessage()], 500);
    }
}

public function show(string $id)
{
    try {
        $curso = Curso::with('estudiantes')->findOrFail($id);
        return new CursoResource($curso);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Error al mostrar el curso', 'message' => $e->getMessage()], 500);
    }
}

public function store(Request $request)
{
    try {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:50',
            'horario' => 'required|string',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date',
            'tipo' => 'required|in:Presencial,Virtual'
        ]);

        $curso = Curso::create($validatedData);  // Crear un nuevo curso
        return response()->json($curso, 201);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Error al crear el curso', 'message' => $e->getMessage()], 500);
    }
}

public function update($id, Request $request)
{
    try {
        $curso = Curso::findOrFail($id);  // Buscar curso para actualizar
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:50',
            'horario' => 'required|string',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date',
            'tipo' => 'required|in:Presencial,Virtual'
        ]);

        $curso->update($validatedData);  // Actualizar curso
        return response()->json($curso, 200);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Error al actualizar el curso', 'message' => $e->getMessage()], 500);
    }
}

public function destroy($id)
{
    try {
        $curso = Curso::findOrFail($id);  // Buscar curso para eliminar
        $curso->delete();  // Eliminar curso
        return response()->json(null, 204);  // Respuesta sin contenido
    } catch (\Exception $e) {
        return response()->json(['error' => 'Error al eliminar el curso', 'message' => $e->getMessage()], 500);
    }
}
    
}
