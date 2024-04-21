<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CursoEstudiante extends Model
{
    use HasFactory;

    protected $table = 'curso_estudiante'; // specify the pivot table name if it's not the default

    protected $fillable = [
        'curso_id',
        'estudiante_id',
        // Add any additional pivot table columns here
    ];
}