# NodeJS---FKStore-

# Proyecto de NodeJs de una tienda de Funkos

Este es un proyecto de NodeJs que consiste en crear una tienda de Funkos para el curso de Codo a Codo 2023. Los Funkos son figuras coleccionables de personajes de películas, series, videojuegos, cómics y otros medios de entretenimiento. El objetivo del proyecto es desarrollar una aplicación web que permita a los usuarios ver, comprar y vender Funkos de forma fácil y segura.

## Características principales

-La aplicación web está desarrollada en Node.js, un entorno de ejecución de JavaScript que facilita la creación de aplicaciones web escalables y de alto rendimiento.
Se emplea el framework Express, que ofrece características como manejo de rutas, middleware, plantillas, y gestión de errores para facilitar el desarrollo web con Node.js.
-Se integra Express Validator para validar datos del cliente, Bcrypt para el hash de contraseñas, y EJS como motor de plantillas.
-La autenticación permite iniciar sesión solo con el correo "admin@gmail.com" y la contraseña "123456".

## Instrucciones de uso

Para usar la aplicación web, se deben seguir los siguientes pasos:

- Clonar el repositorio del proyecto desde GitHub o descargar el código fuente en formato ZIP.
- Instalar las dependencias del proyecto con el comando `npm install` en la terminal.
- Crear un archivo `.env` en la raíz del proyecto con las variables de entorno necesarias, como el puerto, la cadena de conexión a MongoDB, la clave secreta de Passport y las credenciales de OAuth (si se desea usar esta opción de autenticación).
- Ejecutar el comando `npm start` en la terminal para iniciar el servidor de la aplicación web.
- Abrir un navegador web y acceder a la dirección `http://localhost:3000` (o el puerto que se haya configurado en el archivo `.env`).
- Registrarse o iniciar sesión con una cuenta de usuario para acceder a las funcionalidades de la aplicación web, como ver, comprar y vender Funkos.
- Regístrate o inicia sesión con la cuenta de usuario (para funciones como ver, comprar, y vender Funkos). Ten en cuenta que la sesión de administrador está disponible con el correo "admin@gmail.com" y la contraseña "123456".


