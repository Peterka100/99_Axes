const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// const ConnectionController = require('../controllers/connection');

// GET localhost:5000/cards/ -->



// GET localhost:5000/cards/card_id/card_level  --> slouží na načtení detailu
//----------------------------------------------------------------------------------
router.get('/:card_id/:card_level', function (req, res) {
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


    connection.query('select * from types where card_id = ' + req.params.card_id + ' and card_level = ' + req.params.card_level, function(err, result) {
        if(err) {
            console.log(err);
        } else {
            console.log(req.params.card_id);
            console.log(req.params.card_level);
            var card_details = {
                card_id: result[0].card_id,
                card_level: result[0].card_level,
                iron: result[0].iron,
                wood: result[0].wood
            };
            res.status(200).json({
                card_details: card_details
            });
        }

    });

});


// CREATE NEW CARD
//--------------------------------------------------------
router.post("/insert", function (req, res) {
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

    var newCard = [req.body.user_id, req.body.card_id, req.body.card_level];


    console.log(newCard);

    connection.query('INSERT INTO card (user_id, card_id, card_level) VALUES (?)', [newCard] , function (err, result) {
        if(err) {
            console.log(err);
             return res.status(500).json({
                error: err
            })
        } else {
            res.status(200).json({
                message: 'data inserted'
            });
        }
    })
});

module.exports = router;


