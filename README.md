
# Test Angular Laravel

Este proyecto es una aplicación completa que integra Angular con Laravel, proporcionando una solución de stack completo para el desarrollo web. La aplicación está diseñada para demostrar las capacidades de integración entre un frontend Angular y un backend Laravel.

## Características

- **Frontend Angular**: Interfaz de usuario moderna y reactiva, construida con Angular.
- **Backend Laravel**: API robusta y escalable, desarrollada con Laravel.
- **Autenticación de Usuarios**: Gestión de sesiones y autenticación de usuarios.
- **CRUD Completo**: Ejemplos de operaciones de crear, leer, actualizar y eliminar.

## Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:
- Node.js
- npm
- Angular CLI
- Composer
- PHP
- MySQL

## Instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/rjvelazquez/TestLaravelAngular.git
   cd TestLaravelAngular
   ```

2. **Configura el backend Laravel:**
   ```bash
   cd backend
   composer install
   cp .env.example .env
   php artisan key:generate
   php artisan migrate
   php artisan serve
   ```

3. **Configura el frontend Angular:**
   ```bash
   cd frontend
   npm install
   ng serve
   ```

Navega a `http://localhost:4200/` para ver la aplicación en acción.

## Usuario de prueba
 Email = 'johndoe@example.com'
 Password = 'secret123'

## Contacto

Roberto Velazquez - [rjvelazquez96@gmail.com](mailto:rjvelazquez96@gmail.com)
