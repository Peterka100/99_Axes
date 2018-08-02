const express = require('express');
const router = express.Router();
const mysql = require('mysql');


router.get('/:user_id', function (req, res) {
    //DBmethods.doconnect();  // připojí se k DB
    const userID = req.params.user_id;
    console.log(userID);
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'peter',
        password : 'peter',
        database : 'sekera'
    });

    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });

    connection.query('SELECT * from CARD WHERE user_id = ' + userID, function(err, result) {
        if(err) {
            throw err;
        } else {

            var cardsOfUser = [];
            for (var i=0; i<3; i++) {
                const cardOfUser = {
                    user_id: req.params.user_id,
                    card_id: result[i].card_id,
                    card_level: result[i].card_level
                };
                cardsOfUser.push(cardOfUser)
            }

        res.status(200).json({
            cardsOfUser: cardsOfUser
        });
        }
    });
});

module.exports = router;

