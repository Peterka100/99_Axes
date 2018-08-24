const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const checkAuth = require('../middleware/check-auth');
// const dbmethods = require('./DBmethods')



//Na zaklade uživatele zjistím, které karty má
//-----------------------------------------------------------------------------------------------
router.get('/:user_id', checkAuth, function (req, res) {
    const userID = req.params.user_id;

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'peter',
        password : 'peter',
        database : 'sekera'
    });

    connection.connect(function(err) {
        if (err)
            throw err;
        console.log("Connected!");
    });

        connection.query('SELECT count(*) as test FROM card where user_id = ' + userID, function(err, vysledek) {
            if(err) {
                console.log(err);
            } else {
                const pocetRadku = vysledek[0].test;
                console.log(pocetRadku);
                connection.query('SELECT * from CARD WHERE user_id = ' + userID, function(err, result) {
                if(err) {
                    console.log(err);
                } else {
                    var cardsOfUser = [];
                    for (var i=0; i<pocetRadku; i++) {
                        const cardOfUser = {
                            card_id: result[i].card_id,
                            card_level: result[i].card_level
                        };
                        cardsOfUser.push(cardOfUser)
                    }
                    console.log(cardsOfUser);
                res.status(200).json({
                    cardsOfUser: cardsOfUser
                    });
                };
            });
        }
    });
});

//USER resorces
//------------------------------------------

router.get('/resources/:user_id', function (req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'peter',
        password: 'peter',
        database: 'sekera'
    });

    connection.connect(function (err) {
        if (err)
            throw err;
        console.log("Connected!");
    });

    console.log(req.params.user_id);

    connection.query('select * from player where user_id = ' + req.params.user_id , function(err, result) {
        if(err) {
            console.log(err);
        } else {
            var user_resources = {
                iron: result[0].iron,
                wood: result[0].wood
            };
            res.status(200).json({
                user_resources: user_resources
            });
        }

    });

});



module.exports = router;

