<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use Illuminate\Http\Request;

class CursoController extends Controller
{
    public function index()
    {
        $cursos = Curso::all();  // Listar todos los cursos
        return response()->json($cursos);
    }

    public function show($id)
    {
        $curso = Curso::findOrFail($id);  // Obtener curso por ID
        return response()->json($curso);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:50',
            'horario' => 'required|string',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date',
            'tipo' => 'required|in:Presencial,Virtual'
        ]);

        $curso = Curso::create($validatedData);  // Crear un nuevo curso
        return response()->json($curso, 201);
    }

    public function update($id, Request $request)
    {
        $curso = Curso::findOrFail($id);  // Buscar curso para actualizar
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:50',
            'horario' => 'required|string',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date',
            'tipo' => 'required|in:Presencial,Virtual'
        ]);

        $curso->update($validatedData);  // Actualizar curso
        return response()->json($curso);
    }

    public function destroy($id)
    {
        $curso = Curso::findOrFail($id);  // Buscar curso para eliminar
        $curso->delete();  // Eliminar curso
        return response()->json(null, 204);  // Respuesta sin contenido
    }
    
}
