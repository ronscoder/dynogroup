'use strict';
// var Engine = require('tingodb')();
var assert = require('assert');

//Lite database setup

// var db = new Engine.Db('./tdb', {});

var express = require("express");
var fs = require('fs');

var app = express();
app.use(express.static(__dirname + "/dist"));
app.use(express.static(__dirname + "/under_construction"));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    //x origin for domain
    res.header("Access-Control-Allow-Origin", "http://www.dynamicgroupoffoundations.org");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT, PATCH");
    next();
});


app.get('/', (req, res) => {
    res.sendFile('dist/index.html');
    //     res.sendFile(__dirname + '/under_construction/index.html');
});
app.get('/under', (req, res) => {
    res.sendFile(__dirname + '/under_construction/index.html');
    // res.sendFile('under_construction/index.html');
});
app.listen(process.env.PORT || 5000, () => {
    console.log('app is running on port', '5000');
});

app.get('/contacts', (req, res) => {
    // db.collection("contacts").find({}).toArray((err, docs) => {
    //     res.json(docs);
    // });
});

app.delete('/contacts/:id', (req, res) => {
    // var id = req.params['id'];
    // db.collection("contacts").remove({ _id: id }, (err, result) => {
    //     res.send('Contact deleted successfully');
    // })
});

app.post('/contacts', (req, res) => {
    // getBody(req, (body) => {
    //     var col = db.collection("contacts");
    //     col.insert(body, (err, result) => {
    //         assert.equal(null, err);
    //         console.log(req.body);
    //         res.send('Contact successfully added');
    //     });
    // });
});

function getBody(req, cb) {
    var body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        cb(JSON.parse(body));
    });
}


const nodemailer = require('nodemailer');

app.post('/sendmail', (req, res) => {
    getBody(req, (body) => {
        _sendMail(body, (error, info) => {
            if (error) {
                console.log(error);
                res.send(error);
            }
            console.log(info);
            res.send(info);
        });
    });
});

function _sendMail(maildata, cb) {
    let transporter = nodemailer.createTransport({
        service: "Zoho",
        auth: {
            user: 'site@dynamicgroupoffoundations.org',
            pass: 'dyno@2017'
        }
    });
    console.log(maildata);
    transporter.sendMail(maildata, (error, info)=>{
        cb(error, info);
    });
};

