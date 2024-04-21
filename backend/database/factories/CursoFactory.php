<?php

namespace Database\Factories;

use App\Models\Curso;
use Illuminate\Database\Eloquent\Factories\Factory;

class CursoFactory extends Factory
{
    protected $model = Curso::class;

    public function definition()
    {
        return [
            'nombre' => $this->faker->word,
            'horario' => $this->faker->sentence,
            'fecha_inicio' => $this->faker->date,
            'fecha_fin' => $this->faker->date,
            'tipo' => $this->faker->randomElement(['Presencial', 'Virtual']),
        ];
    }
}