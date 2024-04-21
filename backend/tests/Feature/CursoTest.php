<?php

namespace Tests\Feature;

use App\Models\Curso;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CursoTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_course_can_be_created()
    {
        // Create a course
        $course = Curso::factory()->create([
            'nombre' => 'Curso de prueba',
            'horario' => 'Lunes a Viernes',
            'fecha_inicio' => '2022-01-01',
            'fecha_fin' => '2022-12-31',
            'tipo' => 'Presencial',
        ]);

        // Assert the course was created
        $this->assertDatabaseHas('cursos', [
            'nombre' => 'Curso de prueba',
            'horario' => 'Lunes a Viernes',
            'fecha_inicio' => '2022-01-01',
            'fecha_fin' => '2022-12-31',
            'tipo' => 'Presencial',
        ]);
    }
}