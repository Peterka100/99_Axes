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
            // ZDE udělat zápis do databáze - zapisujeme hash
            const user = ({

                username: req.body.username,
                password: hash,
                nickname: req.body.username
            });

            console.log(user);
            // ZDE udělat zápis do databáze
        }


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
    })
});


module.exports = router;


