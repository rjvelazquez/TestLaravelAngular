<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Estudiante; // Asegúrate de tener este Modelo Estudiante adecuado
use App\Http\Resources\EstudianteResource;

class EstudianteController extends Controller
{
    /**
     * Display a listing of the resource.
     * Muestra una lista de todos los estudiantes.
     */
    public function index()
    {
        $estudiantes = Estudiante::all();
        return response()->json($estudiantes);
    }

    /**
     * Show the form for creating a new resource.
     * Normalmente para APIs no necesitas este método porque la creación se maneja en el front-end.
     */
    public function create()
    {
        // Form creation is handled by client-side
    }

    /**
     * Store a newly created resource in storage.
     * Almacena un nuevo estudiante en la base de datos.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|max:100',
            'apellido' => 'nullable|max:100',
            'edad' => 'required|integer|min:18',
            'cedula' => 'required|string|max:11|unique:estudiantes,cedula',
            'email' => 'required|email|unique:estudiantes,email',
        ]);

        $estudiante = Estudiante::create($validatedData);
        return response()->json(['message' => 'Estudiante creado con éxito', 'data' => $estudiante], 201);
    }

    /**
     * Display the specified resource.
     * Muestra un estudiante específico.
     */
    /*public function show(string $id)
    {
        $estudiante = Estudiante::findOrFail($id);
        return response()->json($estudiante);
    }*/
    public function show(string $id)
    {
        $estudiante = Estudiante::with('cursos')->findOrFail($id);
        return new EstudianteResource($estudiante);
    }

    /**
     * Show the form for editing the specified resource.
     * Normalmente para APIs no necesitas este método porque la edición se maneja en el front-end.
     */
    public function edit(string $id)
    {
        // Form edit is handled by client-side
    }

    /**
     * Update the specified resource in storage.
     * Actualiza los datos de un estudiante específico.
     */
    public function update(Request $request, string $id)
    {
        $estudiante = Estudiante::findOrFail($id);

        $validatedData = $request->validate([
            'nombre' => 'required|max:100',
            'apellido' => 'nullable|max:100',
            'edad' => 'required|integer|min:18',
            'email' => 'required|email|unique:estudiantes,email,' . $estudiante->id,
        ]);

        $estudiante->update($validatedData);
        return response()->json(['message' => 'Estudiante actualizado con éxito', 'data' => $estudiante]);
    }

    /**
     * Remove the specified resource from storage.
     * Elimina un estudiante específico.
     */
    public function destroy(string $id)
    {
        $estudiante = Estudiante::findOrFail($id);
        $estudiante->delete();
        return response()->json(['message' => 'Estudiante eliminado con éxito']);
    }
}
