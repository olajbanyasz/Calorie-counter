"use strict"

var express = require("express");
var bodyParser = require("body-parser");
var app = express();


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

app.delete('/meals/:id', function (req, res) {
  meal.del(req.params.id, function(err, result) {
    if (err) {
      res.json({status: 'not exists'});
    } else {
      res.json({status: 'ok'});
    }
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
