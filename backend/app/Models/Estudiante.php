<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estudiante extends Model
{
    use HasFactory;

    // Especifica el nombre de la tabla si no sigue la convención de nombres de Laravel
    protected $table = 'estudiantes';

    // Campos asignables masivamente
    protected $fillable = ['nombre', 'apellido', 'edad', 'cedula', 'email'];

    // Campos ocultos en las respuestas JSON
    protected $hidden = ['pivot'];

    // Tipos de datos casteados para garantizar la integridad de los datos
    protected $casts = [
        'edad' => 'integer',
        'email' => 'string',
        'cedula' => 'string'
    ];

    /**
     * Relación muchos a muchos con el modelo Curso.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function cursos()
    {
        return $this->belongsToMany(Curso::class, 'curso_estudiante')
                    ->withTimestamps(); // Asegura que los timestamps se actualicen en la tabla pivote
    }

    /**
     * Accesor para capitalizar automáticamente el primer nombre.
     *
     * @param  string  $value
     * @return string
     */
    public function getNombreAttribute($value)
    {
        return ucfirst($value);
    }

    /**
     * Mutador para asegurarse que la cédula se almacena en mayúsculas.
     *
     * @param  string  $value
     */
    public function setCedulaAttribute($value)
    {
        $this->attributes['cedula'] = strtoupper($value);
    }
}
