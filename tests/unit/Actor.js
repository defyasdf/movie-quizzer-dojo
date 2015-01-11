define([
	'intern!object',
	'intern/chai!assert',
	"app/dijit/Actor"
], function (registerSuite, assert, Actor) {
	registerSuite(function () {
		var actor;
		return {
			name: 'app/dijit/Actor',

			beforeEach: function () {
				actor = new Actor("Brad Pitt", "http://www.someurl.com/image.jpg");
			},

			afterEach: function () {
				actor.destroyRecursive();
			}

		};
	});
});
