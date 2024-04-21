<?php

namespace Database\Factories;

use App\Models\Estudiante;
use Illuminate\Database\Eloquent\Factories\Factory;

class EstudianteFactory extends Factory
{
    protected $model = Estudiante::class;

    public function definition()
    {
        return [
            'nombre' => $this->faker->name,
            'apellido' => $this->faker->lastName,
            'email' => $this->faker->unique()->safeEmail,
            'edad' => $this->faker->numberBetween(18, 60),
            'cedula' => $this->faker->randomNumber(5) . $this->faker->randomNumber(6),        ];
    }
}