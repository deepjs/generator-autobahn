var deep = require('deepjs');
deep.globals.rootPath = __dirname + '/';
var autobahn = require('autobahnjs');
require('deep-node/lib/fs/json').create(); // allow to load or post/put/patch/del json files with deep('json::/path/from/root/file.json').log() or deep.store('json').post({ aProp:true }, { id:'/path/from/root/output.json'}).log()
require('deepjs/lib/stores/collection'); // allow to load or post/put/patch/del json files with deep('json::/path/from/root/file.json').log() or deep.store('json').post({ aProp:true }, { id:'/path/from/root/output.json'}).log()
require('deep-swig').createDefault(); // allow to load swigjs template files with deep('swig::/path/from/root/file.html').log()
require('deep-mongo');
var argv = require('optimist').argv;
var express = require('express');

//set the default role
deep.Modes({
	roles: 'public'
});

//main config of the server
var config = {
	port: 3000,
	services: {},
	htmls: {},
	statics: {},
	session: {
		secret: 'paezijp7YlhgiGOUYgtogz',
		maxAge: new Date(Date.now() + 3600000)
	},
	sessionModes: function (session) {
		//console.log('------ GET modes ******** : ', session);
		if (session && session.passport) {
			console.log(' Return the passport roles', session.passport.roles);
			return {roles: session.passport.roles};
		}
		return {roles: 'public'};
	},
	user: {
		store: 'user',
		encryption: 'sha1',
		login: {
			loginField: 'email',
			passwordField: 'password',
			schema: {}//,
			//allowImpersonation: ['admin'],

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