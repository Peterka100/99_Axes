const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');

//myPlaintextPassword = req.body.password;  // tohle bude správne
var myPlaintextPassword = "test";
var saltRounds = 10;

router.post("/signup", function (req, res, next) {
    bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            //const user = ({
            //    nickname: req.body.username,
            //    username: req.body.username,
            //    password: hash
            //});

            var user = [req.body.username,req.body.username,hash];

            console.log(user);
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

            connection.query('INSERT INTO users (nickname, username, password) VALUES (?)', [user], function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(user);
                }
            });
        }
    })
});


module.exports = router;



/*
user
    .save()
    .then(function (result) {
        console.log(result);
        res.status(201).json({
            message: 'User created'
        });
    })
    .catch(function (err) {
        res.status(500).json({
            error: err
        });
    })
*/