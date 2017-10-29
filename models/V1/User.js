var express = require('express');
var fs = require('fs');
var todos = require('./Todo');

var data = JSON.parse(fs.readFileSync( __dirname + '/../../data/users.json', 'utf8'));

var methods = {

	details: function(id, callback){
		var details = data[id-1];
		if(details == null) {
			callback({"Error": "User does not exist!"}, {});
		} else {
			todos.alltodos(id, true, function(err, data) {
				if(err == null) {
					details["todos"] = data;
					callback(null, details);
				} else {
					details["todos"] = [];
					console.log(err);
					callback(null, details);
				}
			});
		}
	},

	todoDetails: function(userid, todoid, callback) {
		if(data[userid-1] == null) {
			callback({"Error": "User does not exist!"}, {});
		} else {
			todos.todoDetails(userid, todoid, callback);
		}
	},

	activeusers: function(callback) {
		var users = [], details;
		for(var idx in data) {
			if(data[idx]["isActive"] == true) {
				details = data[idx];
				todos.alltodos(idx, false, function(err, data) {
					if(err == null) {
						details["todos"] = data;
					} else {
						details["todos"] = [];
						console.log(err);
					}
				});
				users.push(details);
			}
		}
		callback(null, users);
	},

	getTodayTomTodos: function(userid, callback) {
		todos.getTodayTomTodos(userid, callback);
	}

};

module.exports = methods;