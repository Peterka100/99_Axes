const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




// REGISTRACE
//--------------------------------------------------------------------------------------------
router.post("/signup", function (req, res, next) {

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


    var myPlaintextPassword = req.body.password;
    var saltRounds = 10;

    bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            var user = [req.body.username,req.body.username,hash];

            connection.query('INSERT INTO users (nickname, username, password) VALUES (?)', [user], function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Data inserted');
                }
            });

            var data = {};
            data.nickname =  req.body.username;
            data.username =  req.body.username;
            data.password = hash;


           res.status(200).json({
                user: data
           });
        }
    })
});


// LOGIN
//--------------------------------------------------------------------------------------------
router.post("/login", function (req, res, next) {

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

    var user = req.body.username;


    connection.query("SELECT EXISTS(SELECT 1 FROM users WHERE username = " +connection.escape(user) + ") AS vysledek", function (err, result) {
        console.log(result[0].vysledek);
        if (err) {
            console.log(err);
        } else if (result[0].vysledek < 1) {
                return res.status(401).json({
                    message: 'Authorization failed'
                })
        } else {
            console.log('Authorized');
            connection.query("SELECT * FROM users WHERE username =  ?", [user], function(error, result, fields) {
                if (result[0].password) {
                    bcrypt.compare(req.body.password, result[0].password, function(err, ress) {
                        if (ress) {
                            const token = jwt.sign(
                                {
                                user: result[0].username,
                                userID: result[0].user_id
                                }, 'secret',
                                {
                                   expiresIn: "1h"
                                });
                            res.status(200).json({
                                message: 'Spravne přihlasovací údaje',
                                user_id: result[0].user_id,
                                token: token,
                                role: result[0].user_role
                            })
                        } else
                            res.status(401).json({
                                message: 'Authorization failed'
                            })
                    })
                }

            })

        }
    });
});


module.exports = router;
