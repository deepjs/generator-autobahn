'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var AutobahnGenerator = yeoman.generators.Base.extend({
	init: function () {
		this.pkg = require('../package.json');

		this.on('end', function () {
			if (!this.options['skip-install']) {
				this.installDependencies();
			}
		});
	},
	askFor: function () {
		var done = this.async();

		// have Yeoman greet the user
		this.log(this.yeoman);

		// replace it with a short and sweet description of your generator
		this.log(chalk.magenta('You\'re using the fantastic Autobahn generator.'));

		// var prompts = [{
		// 	type: 'confirm',
		// 	name: 'someOption',
		// 	message: 'Would you like to enable this option?',
		// 	default: true
		// }];

		// this.prompt(prompts, function (props) {
		// 	this.someOption = props.someOption;

		// 	done();
		// }.bind(this));

		done();
	},
	app: function () {
		//this.mkdir('www');
		//this.mkdir('www/templates');

		this.copy('_package.json', 'package.json');
		this.copy('_bower.json', 'bower.json');
		this.copy('_index.js', 'index.js');
	},
	projectfiles: function () {
		this.copy('jshintrc', '.jshintrc');
		this.copy('gitignore', '.gitignore');
	},
	runNpm: function () {
		var done = this.async();
		this.npmInstall('', function () {
			console.log('\nEverything Setup !!!\n');
			done();
		});
	}
});

module.exports = AutobahnGenerator;