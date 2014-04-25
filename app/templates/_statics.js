var deep = require("deepjs");
var statics = {
	"/": [{
		path: deep.globals.rootPath + '/www',
		options: {
			maxAge: 86400000,
			redirect: false,
			index:"none"
		}
	}]
};

module.exports = statics;