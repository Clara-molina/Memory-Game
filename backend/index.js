const mysql = require('mysql');
const express = require('express');
const { response } = require('express');
const app = express();

const con = mysql.createConnection({
    host: "localhost",
    user: "memory",
    password: "memory",
    database: "memory",
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
});

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});


// --------------
// LECTURE EN BDD
// --------------
app.get('/score', (req, res) => {
    con.query("SELECT chrono FROM score ORDER BY chrono LIMIT 3", function (err, result) {
        if (err) {
            res.status(500).json(err);
        } else if (!result) {
            res.status(404).json();
        }
        res.status(200).json(result)
        console.log(result);
    })
});


// --------------
// ENVOI EN BDD
// --------------
app.post('/score/add', (req, res) => {
    const chrono = req.body.data.chrono;

    con.query("INSERT INTO score (chrono) VALUES(" + chrono + ")", function (err, result) {
        if (err) {
            res.status(500).json(err);
        } else if (!result) {
            res.status(404).json();
        }
        res.status(200).json(result)
        console.log(result);
    })
});


// --------------
// Lancer la commande 'node index.js' depuis le dossier backend
// --------------
app.listen(8080, () => {
    console.log("Serveur à l'écoute")
});
