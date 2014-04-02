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

//create the mongoDB store that will handle sessions
var MongoStore = require('connect-mongo')(express); // session store
var confSessionStore = {
	db: {
		db: 'sessions',
		host: '127.0.0.1',
		//port: 6646,  // optional, default: 27017
		//username: 'admin', // optional
		//password: 'secret', // optional
		collection: 'sessions' // optional, default: sessions
	},
	secret: '82YBkLU_DG09bIUYiLDH6_23KZDJN92I4'
};

//main config of the server
var config = {
	port: 3000,
	services: {},
	htmls: {},
	statics: {},
	session: {
		secret: confSessionStore.secret,
		maxAge: new Date(Date.now() + 3600000),
		store: new MongoStore(confSessionStore.db)
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