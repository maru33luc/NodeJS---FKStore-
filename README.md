# FunkoShop

## Descripción

FunkoShop es una aplicación web para la gestión y compra de figuras Funko Pop. Permite a los usuarios registrarse, iniciar sesión, explorar productos y gestionar su carrito de compras. Los administradores pueden agregar, editar y eliminar productos. La aplicación cuenta con un backend desarrollado en Node.js y utiliza EJS para renderizar las vistas.

## Tecnologías Utilizadas

- Node.js
- Express
- EJS (Embedded JavaScript)
- Express Validator
- Bcrypt para la encriptación de contraseñas
- JSON para almacenamiento de datos

## Estructura de Rutas

### Rutas de Autenticación

- **GET** `/login` - Muestra el formulario de inicio de sesión.
- **POST** `/login` - Procesa el inicio de sesión.
- **GET** `/register` - Muestra el formulario de registro.
- **POST** `/register` - Procesa el registro de un nuevo usuario.
- **GET** `/logout` - Cierra la sesión del usuario.

### Rutas de Administración

- **GET** `/admin` - Muestra el panel de administración con la lista de productos.
- **GET** `/admin/create` - Muestra el formulario para crear un nuevo producto.
- **POST** `/admin/create` - Procesa la creación de un nuevo producto.
- **GET** `/admin/edit/:id` - Muestra el formulario para editar un producto existente.
- **POST** `/admin/edit/:id` - Procesa la edición de un producto.
- **DELETE** `/admin/delete/:id` - Elimina un producto.

### Rutas de Tienda

- **GET** `/shop` - Muestra la lista de productos disponibles.
- **GET** `/shop/item/:id` - Muestra los detalles de un producto específico.
- **GET** `/shop/cart` - Muestra el carrito de compras del usuario.
- **GET** `/shop/local` - Muestra el carrito local.
- **GET** `/shop/add` - Agrega un producto al carrito desde la vista del carrito.
- **GET** `/shop/addItem` - Agrega un producto al carrito desde la vista del producto.
- **POST** `/shop/cart` - Procesa el checkout.

### Rutas de Información

- **GET** `/home` - Muestra la página de inicio.
- **GET** `/contact` - Muestra la página de contacto.
- **GET** `/about` - Muestra información sobre la aplicación.
- **GET** `/faqs` - Muestra preguntas frecuentes.

## Instalación

1. Clona el repositorio.
2. Navega al directorio del proyecto.
3. Ejecuta `npm install` para instalar las dependencias.
4. Configura tu base de datos y archivos de datos según sea necesario.
5. Ejecuta `npm start` para iniciar la aplicación.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT.
