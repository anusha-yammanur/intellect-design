var express = require('express');
var router = express.Router();
var user = require('../../models/V1/User');

// get userdetails
router.get('/', function(req, res) {
	if(req.query.id == undefined) {
		res.send("User Id is missing!");
	}
	user.details(req.query.id, function(err, data) {
		if(err == null) {
			res.send(data);
		} else {
			res.send(err);
		}
	});
});

// get a specific todo item based on its id
router.get('/get-todo', function(req, res) {
	if(req.query.id == undefined) {
		res.send("User Id is missing!");
	}
	if(req.query.todo == undefined) {
		res.send("Todo Id is missing!");
	}	
	user.todoDetails(req.query.id, req.query.todo, function(err, data) {
		if(err == null) {
			res.send(data);
		} else {
			res.send(err);
		}
	});
});

// get all active users and related ToDos
router.get('/active', function(req, res) {
	user.activeusers(function(err, data) {
		if(err == null) {
			res.send(data);
		} else {
			res.send(err);
		}
	});
});

// for a specific user get active todos with target date as today or tomorrow
router.get('/get-today-tomo-todos', function(req, res) {
	if(req.query.id == undefined) {
		res.send("User Id is missing!");
	}
	user.getTodayTomTodos(req.query.id, function(err, data) {
		if(err == null) {
			res.send(data);
		} else {
			res.send(err);
		}
	});
});

module.exports = router;