const mysql = require('mysql');

var dbmethods = {};


//Connection

dbmethods.doconnect = function () {
    console.log('Connecting to database');
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
};


module.exports = dbmethods;
