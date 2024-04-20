<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Administrador;

class AdministradorFactory extends Factory
{
    protected $model = Administrador::class;

    public function definition()
    {
        return [
            'user_id' => null, // Se establecerá al crear el administrador
        ];
    }
}