'use strict'

var mysql = require("mysql");

var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'meal'
});

connection.connect();

function startingDatasLoad() {
  add({meal: 'Milk', calories: 100, date: "2016-01-22"});
  add({meal: 'Beer', calories: 300, date: "2016-01-23"});
  add({meal: 'Steak', calories: 1000, date: "2016-01-24"});
}

function add(meal, cb) {
  connection.query('INSERT INTO meal SET ?', meal, cb);
}

function getAll(cb) {
  connection.query('SELECT * FROM meal ORDER BY date DESC' , cb);
}

function del(id, cb) {
  connection.query('DELETE FROM meal WHERE id = ?', id, cb);
}

//startingDatasLoad();

module.exports = {
  add: add,
  getAll: getAll,
  del: del
};
