const adminAuth = (req, res, next) => {
    
    if (req.session.userLogged && req.session.userLogged.name == 'Admin') {
        return next();
    }
    return res.redirect('/');
}

module.exports = adminAuth;