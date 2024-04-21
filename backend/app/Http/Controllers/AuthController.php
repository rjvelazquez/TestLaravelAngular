<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            $credentials = $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);
    
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Credenciales inválidas'], 401);
            }
    
            return response()->json(compact('token'));
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error en el inicio de sesión', 'message' => $e->getMessage()], 500);
        }
    }
    
    public function logout(Request $request)
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
    
            return response()->json(['message' => 'Logout exitoso'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al cerrar sesión', 'message' => $e->getMessage()], 500);
        }
    }
    
    public function user(Request $request)
    {
        try {
            return response()->json(['user' => Auth::user()], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener el usuario', 'message' => $e->getMessage()], 500);
        }
    }
    
    public function admin(Request $request)
    {
        try {
            return response()->json(['administradores' => Auth::user()->administradores], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener los administradores', 'message' => $e->getMessage()], 500);
        }
    }

    
}