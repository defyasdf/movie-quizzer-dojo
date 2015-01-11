define([
	'intern!object',
	'intern/chai!assert',
	"app/dijit/Movie"
], function (registerSuite, assert, Movie) {
	registerSuite(function () {
		var movie;
		return {
			name: 'app/dijit/Movie',

			beforeEach: function () {
				movie = new Movie(
					"Movie Title",
					"Movie Tagline",
					"01/01/2015",
					"Movie Genre",
					"Movie Director",
					100000000,
					[],
					"m/movieID"
				);
			},

			afterEach: function () {
				movie.destroyRecursive();
			},

			'releaseDateYearFormat': function () {
				assert.strictEqual(movie.releaseDate, 2015,
					'Release Date should be format date passed to year only.');

				movie.set({releaseDate: "03/05/1999"});
				assert.strictEqual(movie.releaseDate, 1999,
					'Release Date should be format date passed to year only.');

				movie.set({releaseDate: "09/15/2003"});
				assert.strictEqual(movie.releaseDate, 2003,
					'Release Date should be format date passed to year only.');
			},

			'revenueCurrencyFormat': function () {
				assert.strictEqual(movie.revenue, "$100,000,000.00",
					'Revenue should be currency formatted.');

				movie.set({revenue: 21000.45});
				assert.strictEqual(movie.revenue, "$21,000.45",
					'Revenue should be currency formatted.');

				movie.set({revenue: 45234543.98});
				assert.strictEqual(movie.revenue, "$45,234,543.98",
					'Revenue should be currency formatted.');
			}

		};
	});
});
