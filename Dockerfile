# Build del Frontend
FROM node:18.13 as frontend-build
WORKDIR /app
# Asegúrate de que las rutas a package.json son correctas
COPY frontend/package*.json ./
RUN npm install
# Asegúrate de que la ruta a los archivos del frontend es correcta
COPY frontend/ .
RUN npm run build

# Build del Backend
FROM php:7.4-fpm as backend-build
WORKDIR /app
RUN apt-get update && apt-get install -y \
    libmcrypt-dev \
    default-mysql-client \
    libmagickwand-dev --no-install-recommends \
    && pecl install mcrypt-1.0.3 \
    && docker-php-ext-enable mcrypt \
    && docker-php-ext-install pdo_mysql mbstring
COPY backend .
# Configurar el directorio de trabajo
WORKDIR /var/www/html
# Copiar archivos del proyecto desde la ruta correcta
COPY backend/ /var/www/html/
# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
# Instalar dependencias del proyecto
RUN composer install
# Dar permisos a las carpetas de almacenamiento y cache
RUN chown -R www-data:www-data storage bootstrap/cache

# Stage final
FROM php:8.1-apache
COPY --from=backend-build /var/www/html /var/www/html
COPY --from=frontend-build /app/dist /var/www/html/public

EXPOSE 8000

# Comando para ejecutar Apache en el contenedor
CMD ["apache2-foreground"]
