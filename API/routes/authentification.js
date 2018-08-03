const express = require('express');
const router = express.Router();
const mysql = require('mysql');



router.post('/signup', function (req, res, next ) {
    const user = new User({
        const User = ({
            // _id: new - how to add new ID? Musím, nemůže databáze?
            nickname: req.body.nickname,
            username: req.body.username,
            password: req.body.password
        })
    });
 });


module.exports = router;