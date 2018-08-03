const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');        // Handlebars
const morgan = require('morgan');  // Logovací Middleware, který loguje, jak dlouho trval request
const bodyParser = require('body-parser');
const mysql = require('mysql');

// Zapnutí logovacího middlewaru - všechny requesty jdou přes Morgan middleware
//----------------------------------------------------------------------------------
app.use(morgan('dev'));


//nastavení parserů - prekladač struktury dat
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//další MW - CORS
app.use(function (req, res, next) {
   res.header('Access-Control-Allow-Origin','*');
   res.header('Access-Control-Allow-Headers','*');
   if(req.method === 'OPTIONS'){
       res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
       return res.status(200).json({});
   }
   next();
});



// Import routes - řeš9 všechny requesty
//--------------------------------------------------------------------------------------
const usersRoutes = require('./API/routes/users');          // nastavujem jenom cestu k souboru cards.js
const cardsRoutes = require('./API/routes/cards');
const authRoutes = require('./API/routes/authentification');// nastavujem jenom cestu k souboru cards.js

app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);
app.use('/auth', authRoutes);

/*
// Connection to database - připojení k DB
//------------------------------------------------------------------------------------------
const DBmethods = require('./DBmethods');
DBmethods.doconnect();  // připojí se k DB
*/

//Definice Homepage
//-------------------------------------------------------------------------------------------
app.use(express.static(__dirname ));

app.get('/', function (req, res) {
    res.render('Card.html');

});


//ERROR HANDLING - Mnou definovaný error - pro všechny věci, které hodí error v rámci funkce
//-----------------------------------------------------------------------------------------
app.use(function (req, res, next) {
   const error = new Error('Volané API neexistuje');
   error.status = 404;
   next(error);
 });

//ERROR HANDLING - Pro všechny věci, které padnu na error ihned
//------------------------------------------------------------------------------------------
app.use(function (error, req, res, next) {
    res.status(error.status || 500);
        res.json({
            error: {
                message: error.message
            }
        });
});




//HANDLEBARS VIEW ENGINE SETUP - NASTAVENI HANDLEBARS
// ------------------------------------------------------------------------------------------
app.set('view engine', 'html'); // nastavení view engine
app.set('views', path.join(__dirname, '/public/html'));
app.engine('html', hbs.__express);

hbs.registerPartials(__dirname + '/public/html/partials');


module.exports = app;
