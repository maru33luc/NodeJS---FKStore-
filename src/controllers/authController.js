const authControllers = {
    login: (req, res) => {
        res.send('Route for get a login view');
    },
    processLogin: (req, res) => {
        res.send('Route for post a login view');
    },
    register: (req, res) => {
        res.send('Route for get a register view');
    },
    processRegister: (req, res) => {
        res.send('Route for post a register view');
    }
};

module.exports = authControllers;