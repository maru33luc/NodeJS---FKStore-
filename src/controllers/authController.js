const authControllers = {
    login: (req, res) => {
        // res.send('Route for get a login view');
        res.render ('auth/login');
    },
    processLogin: (req, res) => {
        // res.send('Route for post a login view');
        res.render ('auth/login');
    },
    register: (req, res) => {
        // res.send('Route for get a register view');
        res.render ('auth/register');
    },
    processRegister: (req, res) => {
        // res.send('Route for post a register view');
        res.render ('auth/register');
    },
    logout: (req, res) => {
        res.send('Route for logout');
    }

};

module.exports = authControllers;