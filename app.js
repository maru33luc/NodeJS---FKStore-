const express = require('express');
const fs = require('fs');
const mainRoutes = require('./src/routes/mainRoutes');
const shopRoutes = require('./src/routes/shopRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const authRoutes = require('./src/routes/authRoutes');

const app = express();
const port = 3000;

app.use(express.static('public'));

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + 'public/index.html');
// });

// app.get('/admin', (req, res) => {
//     res.sendFile(__dirname + '/public/pages/admin/admin.html');
// });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


// app.get('/funkos', (req, res) => {
//     res.sendFile(__dirname + '/public/data/mis_funkos.json');
// });

// app.get('/funkos/:id', (req, res) => {
    
//     const id = req.params.id;
    
//     const data = fs.readFileSync(__dirname + '/public/data/mis_funkos.json', 'utf8');
//     const funkos = JSON.parse(data);
//     const funko = funkos.find(f => f.id == id);
//     res.send(funko);
// });

app.use ('/', mainRoutes);
app.use ('/shop', shopRoutes);
app.use ('/admin', adminRoutes);
app.use ('/', authRoutes);


