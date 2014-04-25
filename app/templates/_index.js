var deep = require('deepjs');
deep.globals.rootPath = deep.context.cwd = __dirname + '/';
var autobahn = require('autobahnjs');
var express = require('express');

//set the default role
deep.Modes({
	roles: 'public',
	env: 'dev'
});

//main config of the server
var config = {
	port: 3000,
	services: require("./server/services.js"),
	htmls: require("./server/htmls.js"),
	statics: require("./server/statics.js"),
	session: {
		secret: 'paezijp7YlhgiGOUYgtogz',
		maxAge: new Date(Date.now() + 3600000)
	},
	sessionModes: function (session) {
		//console.log('------ GET modes ******** : ', session);
		if (session && session.user) {
			//console.log(' Return the passport roles', session.passport.roles);
			return { roles: session.user.roles || 'user' };
		}
		return { roles: 'public' };
	},
	user: {
		store: 'user',
		encryption: 'sha1',
		login: {
			loginField: 'email',
			passwordField: 'password'
		},
		loggedIn: function (session) {
			// session has been decorated with user's object.
			if (!session || !session.user) {
				return deep.errors.Unauthorized();
			}
			return session;
		}
	}
};

//launch the server
var app = autobahn.init(config);
console.log('server listening on port : ', config.port);
deep.App(config);
//start the repl
var repl = require('repl');
repl.start({
	prompt: 'node via stdin> ',
	input: process.stdin,
	output: process.stdout
});