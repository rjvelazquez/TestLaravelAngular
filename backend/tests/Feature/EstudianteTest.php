<?php

namespace Tests\Feature;

use App\Models\Estudiante;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class EstudianteTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_student_can_be_created()
    {
        // Create a student
        $student = Estudiante::factory()->create([
            'nombre' => 'John',
            'apellido' => 'Doe',
            'email' => 'johndoe@example.com',
            'edad' => 25,
            'cedula' => '12345678901',
        ]);

        // Assert the student was created
        $this->assertDatabaseHas('estudiantes', [
            'nombre' => 'John',
            'apellido' => 'Doe',
            'email' => 'johndoe@example.com',
            'edad' => 25,
            'cedula' => '12345678901',
        ]);
    }
}