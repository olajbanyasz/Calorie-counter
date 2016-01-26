"use strict"

var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var meal = require('./meal.js');

app.use(logRequest);
app.use(express.static("public"));
app.use(bodyParser.json());

app.post('/meals', function (req, res) {
  meal.add(req.body, function(err, result) {
      	res.json({
    	status: 'ok'
  	});
  });
});

app.get('/meals', function (req, res) {
  meal.getAll(function(err, meals) {
    res.json(meals);
  });
});

app.listen(3000, function () {
  console.log("Listening on port 3000...")
});

function logRequest(req, res, next) {
  var parts = [new Date(), req.method, req.originalUrl];
  console.log(parts.join(" "));
  next();
}