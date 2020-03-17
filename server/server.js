/* jshint esversion: 6 */
const express = require('express');
const morgan = require('morgan');
const get_ip = require('ipware')().get_ip;
const errorhandler = require('errorhandler');
const cors = require('cors');
const { Sequelize, Model } = require('sequelize');

const app = express();
const PORT = process.env.REACT_APP_SERVER_PORT;

const { Fib } = require('./ORM/models');
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
host: process.env.MYSQL_HOST_IP,
dialect: 'mysql',
useUTC: false,
timezone: '+03:00'
});

// require fibonacci number calculation function
const fibCalc = require('./fibCalc.js');

app.use(morgan('dev'));
app.use(errorhandler());
app.use(cors());

app.use('/', (req, res, next) => {
    let ip = get_ip(req);
    req.ip = ip.clientIp;
    next();
});

// client's data validation
app.use('/number/:num', (req, res, next) => {
    req.num = Number(req.params.num);
    if (!Number.isInteger(req.num) || req.num < 0) {
      res.status(400).send();
    }
    else next();
});

// fibonacci number request
app.get('/number/:num', (req, res, next) => {

  // acquiring fibonacci number
  const result = fibCalc(req.num);

  // insert into database
  Fib.create({
    ip: req.ip,
    request: req.num,
    result: result
  }).then( () => {
    res.status(201).send({result: result});
  }).catch(err => {
    console.log(err);
    res.status(500).send();
  });
});

// history request
app.get('/history', (req, res, next) => {
  Fib.findAll({
    where: {
      ip: req.ip
    }
  }).then(rows => {
    if (rows) res.send({result: rows, ip: req.ip});
    else res.status(404).send({result: [], ip: req.ip});
  }).catch( (err) => {
    console.log(err);
    res.status(500).send({ result: [], ip: req.ip });
  });
});

// syncing with database table and starting server to listen
Fib.sync().then(function() {
  app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT);
  });
});

module.exports = app;
