/* jshint esversion: 6 */
const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const get_ip = require('ipware')().get_ip;
const errorhandler = require('errorhandler');
const cors = require('cors');

const app = express();
const PORT = process.env.REACT_APP_SERVER_PORT;

//require fibonacci number calculation function
const fib = require('./fibCalc.js');

app.use(morgan('dev'));
app.use(errorhandler());
app.use(cors());

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST_IP,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  //port: '8889',
  database: process.env.MYSQL_DATABASE,
  dateStrings: true
});

//function called before every database query reassuring that database and table exist
async function validateConnection(connection) {
  await new Promise((resolve, reject) => {
    connection.query('CREATE DATABASE IF NOT EXISTS `myDB`', (err) => {
    if (err) throw err;
    connection.changeUser({database: 'myDB'}, err => {
      if (err) throw err;
    });
    connection.query('CREATE TABLE IF NOT EXISTS `fib` (`id` int(11) unsigned NOT NULL AUTO_INCREMENT, ' +
    '`ip` text NOT NULL, `request` int(11) NOT NULL, `result` bigint NOT NULL, ' +
    '`dateAndTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, ' +
    'PRIMARY KEY (`id`)) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;', err => {
      if (err) throw err;
      resolve();
      });
    });
  });
}

//initial database connect
pool.getConnection(function(err, connection) {
  if (err) {
    console.log(err);
    return;
  }
  validateConnection(connection).then(() => {
    connection.release();
  });
});


app.use('/', (req, res, next) => {
    let ip = get_ip(req);
    req.ip = ip.clientIp;
    next();
});

//client's data validation
app.use('/number/:num', (req, res, next) => {
    req.num = Number(req.params.num);
    if (!Number.isInteger(req.num) || req.num < 0) {
      res.status(400).send();
    }
    else next();
});

//fibonacci number request
app.get('/number/:num', (req, res, next) => {

  //acquiring fibonacci number
  const result = fib(req.num);

  //trying to insert into database
  pool.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
      res.status(500).send({ result: result });
      return;
    }
    connection.query('INSERT INTO `myDB`.`fib` (`ip`, `request`, `result`) VALUES (?,?,?)',
    [req.ip, req.num, result],
    err => {
      if (err) {
        console.log(err);
        res.status(500).send({ result: result });
      }
      else res.status(200).send({ result: result });
    });
    connection.release();
  });
});

//history request
app.get('/history', (req, res, next) => {
  pool.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
      res.status(500).send({result: [], ip: req.ip});
      return;
    }
    connection.query('SELECT * FROM `myDB`.`fib` WHERE `ip` = ?', [req.ip], (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send({ result: [], ip: req.ip });
      }
      else if (!rows) res.status(404).send({result: [], ip: req.ip});
      else res.send( {result: rows, ip: req.ip} );
    });
    connection.release();
  });
});

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});

module.exports = app;
