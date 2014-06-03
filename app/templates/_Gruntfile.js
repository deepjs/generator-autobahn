module.exports = function(grunt) {

	require('deep-shell');

	grunt.initConfig({
		gitify: {
			namespace:"node",
			prefixes: ["deep", "autobahn"],
			exclude: ["deep-shell"]
		}
	});

	grunt.registerTask('default', 'My "default" task description.', function() {
		grunt.log.writeln('Currently running the "default" task.');
	});

	grunt.registerTask('gitify', 'Making git repository of deep* and autobahn modules.', function() {
		var done = this.async();
		grunt.log.writeln('Grunt Gitify task start.');

		var config = grunt.config('gitify'),
			packageFile, 
			folder;

		if(config.namespace == 'bower')
		{
			packageFile = "bower.json";
			folder = "bower_components"
		}
		else
		{
			packageFile = "package.json";
			folder = "node_modules"
		}
		var packages = grunt.file.readJSON(packageFile);
		var prefixes = config.prefixes;
		var exclude = config.exclude;

		var regex = new RegExp("^((" + prefixes.join(')|(') + "))");
		var regexExclude = new RegExp("^((" + exclude.join(')|(') + "))");
		var promises = [];
		for (var key in packages) {
			var pack = packages[key].split("#");
			var packURI = pack[0].substring(4);
			var packVersion = pack[1] || "master";
			if (!regexExclude.test(key) && regex.test(key))
			{
				console.log(key, ":", packURI);
				var d = deep.shell()
				.exec("rm -rf ./"+folder+"/" + key)
				.cd("./"+folder)
				//.log("git clone " + packURI + " " + key)
				.exec("git clone " + packURI + " " + key)
				//.log("git cloned " + packURI)
				.cd("./" + key)
				.exec("git checkout " + packVersion).log();
				promises.push(d);
			}
		}

		deep.all(promises)
		.done(function (success) {
			done(true);
		}).fail(function (argument) {
			done(false);
		});

	});

};