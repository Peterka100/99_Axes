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
            console.log(hash)
            // ZDE udělat zápis do databáze - zapisujeme hash
        }

    const user = ({
            // _id: new - how to add new ID? Musím, nemůže databáze?
            nickname: req.body.nickname,
            username: req.body.username,
            password: hash
        });

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

    })
});


module.exports = router;


bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    // Store hash in your password DB.
});