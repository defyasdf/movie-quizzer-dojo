define([
	'intern!object',
	'intern/chai!assert',
	"app/utils/FreebaseUtil"
], function (registerSuite, assert, FreebaseUtil) {
	registerSuite(function () {
		var freebaseUtil;
		return {
			name: 'app/utils/FreebaseUtil',

			beforeEach: function () {
				freebaseUtil = new FreebaseUtil();
			},

			afterEach: function () {
				freebaseUtil = null;
			},

			'getRandomNumber': function () {
				var rand;

				rand = freebaseUtil.getRandomNumber(0, 7);
				assert.operator(rand, '>=', 0, 'Random number is less than minimum');
				assert.operator(rand, '<=', 7, 'Random number is greater than maximum');

				rand = freebaseUtil.getRandomNumber(4, 9);
				assert.operator(rand, '>=', 4, 'Random number is less than minimum');
				assert.operator(rand, '<=', 9, 'Random number is greater than maximum');
			}


		};
	});
});
