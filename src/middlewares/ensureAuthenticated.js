

// Middleware para verificar si el usuario ya está autenticado
const ensureAuthenticated = (req, res, next) => {
    // Si el usuario está autenticado, redirigir a otra ruta (por ejemplo, la página principal)

    if (req.session.userLogged) {
        return res.redirect('/'); // Cambia esto según tu ruta principal
    }
    // Si el usuario no está autenticado, continúa con la siguiente ruta
    return next();



    
  };
  
    module.exports = ensureAuthenticated;