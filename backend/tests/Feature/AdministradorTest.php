<?php 
namespace Tests\Feature;

use App\Models\Administrador;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdministradorTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test creating an administrator.
     *
     * @return void
     */
    public function testCreateUserAndLinkToAdministrator()
    {
        $user = User::factory()->create([
            'name' => 'John Doe',
            'email' => 'johndoe@example.com',
            'password' => Hash::make('secret123')
        ]);
        
        $admin = Administrador::factory()->create([
            'user_id' => $user->id,
            'nombre' => 'John',
            'apellido' => 'Doe',
            'email' => 'johndoe@example.com',
        ]);

        // Login as the created user
        $this->actingAs($user);

        // Assert the user was created
        $this->assertDatabaseHas('users', [
            'email' => 'johndoe@example.com'
        ]);

        // Assert the administrator was created
        $this->assertDatabaseHas('administradores', [
            'user_id' => $user->id
        ]);

        // Check password is hashed
        $this->assertTrue(Hash::check('secret123', $user->password));

        // Test the relationship
        $this->assertEquals($admin->user->id, $user->id);

       
    }
}