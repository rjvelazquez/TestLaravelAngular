<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Administrador;
use Illuminate\Support\Facades\Hash;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function testRegister()
    {
        // Datos del administrador
        $adminData = [
            'nombre' => 'John',
            'apellido' => 'Doe',
            'email' => 'johndoe@example.com',
            'password' => 'secret123',
            'password_confirmation' => 'secret123',
        ];

        // Realiza una solicitud POST a la ruta de registro
        $response = $this->post('/register', $adminData);

        // Asegúrate de que la respuesta fue exitosa
        $response->assertStatus(200);

        // Verifica que el administrador fue creado en la base de datos
        $this->assertDatabaseHas('administradores', [
            'email' => 'johndoe@example.com',
        ]);
    }

    public function testLogin()
    {
        // Crea un administrador
        Administrador::create([
            'nombre' => 'John',
            'apellido' => 'Doe',
            'email' => 'johndoe@example.com',
            'password' => Hash::make('secret123'),
        ]);

        // Datos de login
        $loginData = [
            'email' => 'johndoe@example.com',
            'password' => 'secret123',
        ];

        // Realiza una solicitud POST a la ruta de login
        $response = $this->post('/login', $loginData);

        // Asegúrate de que la respuesta fue exitosa
        $response->assertStatus(200);
    }
}