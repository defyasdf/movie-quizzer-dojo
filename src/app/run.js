define([
	'app/dijit/Main',
	'dojo/domReady!'
], function (Main) {
	var app = {};

	app.main = new Main().placeAt(document.body);
	app.main.startup();

	return app;
});
