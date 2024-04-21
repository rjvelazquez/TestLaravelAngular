<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'horario',
        'fecha_inicio',
        'fecha_fin',
        'tipo',
    ];

    public function estudiantes()
    {
        return $this->belongsToMany(Estudiante::class);
    }
}