<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
    public function estudiantes()
    {
        return $this->belongsToMany(Estudiante::class, 'curso_estudiante');
    }
}