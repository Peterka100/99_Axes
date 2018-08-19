const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const checkAuth = require('../middleware/check-auth');
// const dbmethods = require('./DBmethods')



//Na zaklade uživatele zjistím, které karty má
//-----------------------------------------------------------------------------------------------
router.get('/:user_id', checkAuth, function (req, res) {
    const userID = req.params.user_id;
   // dbmethods.doconnect();  // připojí se k DB
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
                res.status(200).json({
                    cardsOfUser: cardsOfUser
                    });
                };
            });
        }
    });
});

module.exports = router;

