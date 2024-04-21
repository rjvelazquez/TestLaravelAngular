<?php

namespace Tests\Feature;

use App\Models\Curso;
use App\Models\Estudiante;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CursoEstudianteTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_student_can_be_added_to_a_course()
    {
        // Create a course and a student
        $curso = Curso::factory()->create();
        $estudiante = Estudiante::factory()->create();

        // Add the student to the course
        $curso->estudiantes()->attach($estudiante);

        // Assert the student was added to the course
        $this->assertDatabaseHas('curso_estudiante', [
            'curso_id' => $curso->id,
            'estudiante_id' => $estudiante->id,
        ]);
    }

    /** @test */
    public function a_student_can_be_removed_from_a_course()
    {
        // Create a course and a student
        $curso = Curso::factory()->create();
        $estudiante = Estudiante::factory()->create();

        // Add the student to the course
        $curso->estudiantes()->attach($estudiante);

        // Remove the student from the course
        $curso->estudiantes()->detach($estudiante);

        // Assert the student was removed from the course
        $this->assertDatabaseMissing('curso_estudiante', [
            'curso_id' => $curso->id,
            'estudiante_id' => $estudiante->id,
        ]);
    }
}