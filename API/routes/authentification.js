const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');




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
    console.log(connection.escape(user));

    connection.query("SELECT EXISTS(SELECT 1 FROM users WHERE username = " +connection.escape(user) + ") AS vysledek", function (err, result) {
        console.log('compare');
        console.log(result[0].vysledek);
        if (err) {
            console.log(err);
        } else if (result[0].vysledek < 1) {
                console.log('1: else if');
                return res.status(200).json({
                    message: 'User not exist'
                })
        } else {
            console.log('2: else');
            res.status(200).json({
                user: req.body.username
            })
        }
    });
});


module.exports = router;
