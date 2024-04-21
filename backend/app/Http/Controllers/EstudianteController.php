<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Estudiante; // Asegúrate de tener este Modelo Estudiante adecuado
use App\Http\Resources\EstudianteResource;

class EstudianteController extends Controller
{
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'nombre' => 'required|max:100',
                'apellido' => 'nullable|max:100',
                'edad' => 'required|integer|min:18',
                'cedula' => 'required|string|max:11|unique:estudiantes,cedula',
                'email' => 'required|email|unique:estudiantes,email',
            ]);

            $estudiante = Estudiante::create($validatedData);
            return response()->json(['message' => 'Estudiante creado con éxito', 'data' => $estudiante], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al crear el estudiante', 'message' => $e->getMessage()], 500);
        }
    }

    public function index()
    {
        try {
            $estudiantes = Estudiante::all();
            return EstudianteResource::collection($estudiantes);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al listar los estudiantes', 'message' => $e->getMessage()], 500);
        }
    }

    public function show(string $id)
    {
        try {
            $estudiante = Estudiante::with('cursos')->findOrFail($id);
            return new EstudianteResource($estudiante);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al mostrar el estudiante', 'message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $estudiante = Estudiante::findOrFail($id);

            $validatedData = $request->validate([
                'nombre' => 'required|max:100',
                'apellido' => 'nullable|max:100',
                'edad' => 'required|integer|min:18',
                'email' => 'required|email|unique:estudiantes,email,' . $estudiante->id,
            ]);

            $estudiante->update($validatedData);
            return response()->json(['message' => 'Estudiante actualizado con éxito', 'data' => $estudiante]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al actualizar el estudiante', 'message' => $e->getMessage()], 500);
        }
    }

    public function destroy(string $id)
    {
        try {
            $estudiante = Estudiante::findOrFail($id);
            $estudiante->delete();
            return response()->json(['message' => 'Estudiante eliminado con éxito']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al eliminar el estudiante', 'message' => $e->getMessage()], 500);
        }
    }
}
