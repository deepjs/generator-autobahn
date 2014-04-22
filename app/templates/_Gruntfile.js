module.exports = function(grunt) {

	require('deep-shell');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		gitify: {
			prefixes: ["deep", "autobahn"]
		}
	});

	grunt.registerTask('default', 'My "default" task description.', function() {
		grunt.log.writeln('Currently running the "default" task.');
	});

	grunt.registerTask('gitify', 'Making git repository of deep* and autobahn modules.', function() {
		var done = this.async();
		grunt.log.writeln('Currently running Gitify task.');
		var packages = grunt.config('pkg').dependencies;
		var prefixes = grunt.config('gitify').prefixes;
		var regex = new RegExp("^((" + prefixes.join(')|(') + "))");
		var promises = [];
		for (var key in packages) {
			var pack = packages[key].split("#");
			var packURI = pack[0].substring(4);
			var packVersion = pack[1] || "master";

			if (regex.test(key))
			{
				console.log(key, ":", packURI);
				var d = deep.shell()
				.exec("rm -rf ./node_modules/" + key)
				.cd("./node_modules")
				//.log("git clone " + packURI + " " + key)
				.exec("git clone " + packURI + " " + key)
				//.log("git cloned " + packURI)
				//.pwd()
				//.ls()
				.cd("./" + key)
				//.log()
				//.ls()
				.exec("git checkout " + packVersion).log();
				promises.push(d);
			}
		}

		deep.all(promises)
		.done(function (success) {
			done(true);
		}).fail(function (argument) {
			done(false);
		})

	});

};