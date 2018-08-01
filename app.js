const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');

// Import routes - user
const usersRoutes = require('./API/routes/users');          // nastavujem jenom cestu k souboru cards.js
app.use('/users', usersRoutes);


const cardsRoutes = require('./API/routes/cards');    // nastavujem jenom cestu k souboru cards.js
app.use('/cards', cardsRoutes);

module.exports = app;


//HANDLEBARS VIEW ENGINE SETUP - NASTAVENI HANDLEBARS
// ------------------------------------------------------------------------------------------
app.set('view engine', 'html'); // nastavení view engine
app.set('views', path.join(__dirname, '/public/html'));
app.engine('html', hbs.__express);

hbs.registerPartials(__dirname + '/public/html/partials');



//Definice Homepage
//-------------------------------------------------------------------------------------------
app.use(express.static(__dirname ));

app.get('/', function (req, res) {
    res.render('Card.html');

});
