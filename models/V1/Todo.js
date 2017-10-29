var express = require('express');
var fs = require('fs');

var data = JSON.parse(fs.readFileSync( __dirname + '/../../data/todos.json', 'utf8'));

var methods = {

	alltodos: function(userid, active, callback) {
		var todos = [];
		for(var idx in data) {
			if(data[idx]["userid"] == userid && ((active == true && data[idx]["done"] == false) || active == false)) {
				todos.push(data[idx]);
			}
		}
		callback(null, todos);
	},

	todoDetails: function(userid, todoid, callback) {
		if(data[todoid-1] != null && data[todoid-1] != undefined && data[todoid-1]["userid"] == userid) {
			callback(null, data[todoid-1]);
		} else {
			callback({"Error:": "Access Denied!"}, {});
		}
	},

	getTodayTomTodos: function(userid, callback) {
		var todos = [];
		var date = new Date(), targetDate, td;
		var today = new Date(date.getFullYear(),date.getMonth(), date.getDate());
		console.log(today);
		for(var idx in data) {
			if(data[idx]["userid"] == userid && data[idx]["done"] == false) {
				td = data[idx]["targetDate"].split("-");
				console.log(td);
				targetDate = new Date(td[2], td[1], td[0]);
				console.log(targetDate);
				if(today == targetDate || today.getDate()+1 == targetDate) {
					todos.push(data[idx]);
				}
			}
		}
		callback(null, todos);
	}

};

module.exports = methods;