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


    connection.query("SELECT EXISTS(SELECT 1 FROM users WHERE username = " +connection.escape(user) + ") AS vysledek", function (err, result) {
        console.log(result[0].vysledek);
        if (err) {
            console.log(err);
        } else if (result[0].vysledek < 1) {
                console.log('Authorization failed');
                return res.status(401).json({
                    message: 'Authorization failed'
                })
        } else {
            console.log('Authorized');
            connection.query("SELECT * FROM users WHERE username =  ?", [user], function(error, result, fields) {
                if (result[0].password) {
                    console.log('>>>>>> ', req.body.password);
                    console.log('>>>>>> ', result[0].password);
                    bcrypt.compare(req.body.password, result[0].password, function(err, ress) {
                        if (ress) {
                            console.log("heslo je OK");
                            res.status(200).json({
                                message: 'Spravne přihlasovací údaje'
                            })
                        } else
                            res.status(401).json({
                                message: 'Authorization failed'
                            })
                    })
                }
            })
            /*
            connection.query("SELECT * FROM sometable WHERE username = ? ", [email], function(error, results, fields) {
      if (results[0].password) {
        bcrypt.compare(req.body.password, results[0].password, function(err, result) {
         console.log('>>>>>> ', password)
         console.log('>>>>>> ', results[0].password)
         if(result) {
           return res.send();
         }
         else {
           return res.status(400).send();
         }




         bcrypt.compare(req.body.password, result[0].password, function(err, res) {
                        if (err) {
                            return res.status(401).json({
                                message: 'Authorization failed'
                            })
                        }

                        else {
                            res.status(200).json({
                                message: 'Heslo je OK'
                            })
                        }
                    })


             */

        }
    });
});


module.exports = router;
