require("deepjs/lib/view");
require("deep-node/lib/fs/file/json").create({
	protocol: "json",
	basePath: "/www"
});

require("deep-swig");
deep.Swig.init({});
deep.Swig({
	protocol: "swig",
	basePath: "/www"
});


var htmls = {
	/*index:deep.View({
		how:"swig::/index.html",
		where:"dom.appendTo::"
	}),*/
	head:deep.View({
		how:"<title>title from server</title>",
		where:"dom.appendTo::head"
	}),
	body:deep.View({
		how:"<div>body from server</div>",
		where:"dom.appendTo::body"
	})
};

module.exports = htmls;
