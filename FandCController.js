var pm2 = require('pm2');
var express = require('express');
var app = express();
var nodeCleanup = require('node-cleanup');

/* --------------------------------------------------------------------------- */

pm2.connect(function(err) {
	if(err) {
		console.log(err)
		process.exit(2);
	}
	launchApp();

	app.listen(1555, function() {
		console.log('Listening on port 1555!');
	});
});

nodeCleanup(function (exitCode, signal) {
	if(signal) {
		console.log(signal);
		pm2.delete("DiscoverInfrastructure", function(err) {
			console.log("Test");
		});
		nodeCleanup.uninstall();
		return false;
	}
});

/* --------------------------------------------------------------------------- */

function launchApp() {
	pm2.start({
		name: "DiscoverInfrastructure",
		script: "coveDebug.app/Contents/MacOS/coveDebug",
	  	args: 	[
					"hide-mouse",
					"flip-mouse"
				],	
		exec_mode: "fork",
		instances: "1",
		interpreter: "none",
		maxRestarts: "3"
	}, function(err, proc) {
		if(err) {
			throw err;
		} else {
			console.log(proc);
		}
		pm2.disconnect();
	});
}
