const adminControllers = {
    home: (req, res) => {
        // res.send('Route for Admin Home View');
        res.render('admin/admin');
    },
    create: (req, res) => {
        // res.send('Route for get a create view in Admin View');
        res.render('admin/create');
    },
    store: (req, res) => {
        // res.send('Route for post a create view in Admin View');
        res.render('admin/create');
    },
    addCart: (req, res) => {
        res.send('Route for add the current item to the shop cart');
    },
    getEdit: (req, res) => {
        // res.send('Route for get an edit product view from an id');
        res.render('admin/edit');
    },
    postEdit: (req, res) => {
        res.send('Route for post an edit product view from an id');
        res.render('admin/edit');
    },
    delete: (req, res) => {
        // res.send('Route for delete a product from an id');
        res.render('admin/admin');
    }
}

module.exports = adminControllers;





