var pm2 = require('pm2');
var express = require('express');
var app = express();

/* --------------------------------------------------------------------------- */

pm2.connect(function(err) {
	if(err) {
		console.log(err)
		process.exit(2);
	}
	launchFandCApp();

	app.listen(1555, function() {
		console.log('Listening on port 1555!');
	});
});

/* --------------------------------------------------------------------------- */

function launchFandCApp() {
	pm2.start({
		name: "Focus And Context",
		script: "~/Documents/openFrameworksNightly/apps/FocusAndContext/cove/bin/coveDebug.app/Contents/MacOS/coveDebug",
		exec_mode: "fork",
		instances: "1",
		interpreter: "none",
		maxRestarts: "3"
	}, function(err, proc) {
		if(err) {
			throw err;
		}
		pm2.disconnect();
	});
}