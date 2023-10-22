const adminControllers = {
    home: (req, res) => {
        res.send('Route for Admin Home View');
    },
    create: (req, res) => {
        res.send('Route for get a create view in Admin View');
    },
    store: (req, res) => {
        res.send('Route for post a create view in Admin View');
    },
    addCart: (req, res) => {
        res.send('Route for add the current item to the shop cart');
    },
    getEdit: (req, res) => {
        res.send('Route for get an edit product view from an id');
    },
    postEdit: (req, res) => {
        res.send('Route for post an edit product view from an id');
    },
    delete: (req, res) => {
        res.send('Route for delete a product from an id');
    }
}

module.exports = adminControllers;





