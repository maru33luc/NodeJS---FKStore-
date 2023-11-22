const express = require('express');
const fs = require('fs');
const mainRoutes = require('./src/routes/mainRoutes');
const shopRoutes = require('./src/routes/shopRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const authRoutes = require('./src/routes/authRoutes');
const cors = require('cors');
const { url } = require('inspector');
const path = require('path');
const methodOverride = require('method-override');

const app = express();
app.use(cors()); // Use this after the variable declaration
app.use(express.json()); // for parsing application/json
// app.use(express.urlencoded()); // for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public'), { strict: false }));
// app.use('/css', express.static('public/css', { 'strict': false }));

const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


app.use ('/', mainRoutes);
app.use ('/shop', shopRoutes);
app.use ('/admin', adminRoutes);
app.use ('/', authRoutes);


