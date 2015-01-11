var profile = {
	basePath: '../src/',
	action: 'release',
	cssOptimize: 'comments',
	mini: true,
	optimize: 'closure',
	layerOptimize: 'closure',
	packages: [
		// Using a string as a package is shorthand for `{ name: 'app', location: 'app' }`
		'app',
		'dgrid',
		'dijit',
		'dojo',
		'dojox',
		'put-selector',
		'xstyle'
	],
	stripConsole: 'all',
	selectorEngine: 'lite',
	layers: {
		'dojo/dojo': {
			include : [
				"dojo/dojo",
				"dojo/_base/window",
				"dojo/dom",
				"dojo/dom-class",
				"dojo/ready",
				"dojo/store/Memory",
				"app/run"
			],
			boot: true,
			customBase: true
		}

	},

	staticHasFeatures: {
		'dojo-trace-api': false,
		'dojo-log-api': false,
		'dojo-publish-privates': false,
		'dojo-sync-loader': false,
		'dojo-xhr-factory': false,
		'dojo-test-sniff': false
	}
};