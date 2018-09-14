var pm2 = require('pm2');
var express = require('express');
var app = express();
var schedule = require('node-schedule');
var nodeCleanup = require('node-cleanup');
var moment = require('moment');

var appName = "DiscoverInfrastructure"

/* --------------------------------------------------------------------------- */

pm2.connect(function(err) {
	if(err) {
		console.log(err)
		process.exit(2);
	}

	launchApp();

	var now = new Date();

	nowPlus1Minute = moment(now).add(1, 'm').toDate();

	scheduleShutdown(nowPlus1Minute);

	app.listen(1555, function() {
		console.log('Listening on port 1555!');
	});
});

nodeCleanup(function (exitCode, signal) {
	if(signal) {
		console.log(signal);
		pm2.delete(appName, function(err) {
			console.log(appName + " closed and removed from PM2.");
		});
		nodeCleanup.uninstall();
		return false;
	}
});

/* --------------------------------------------------------------------------- */

function scheduleShutdown(date) {
	var shutdownJob = schedule.scheduleJob(date, closeApp);
	console.log('Shutdown FandC Job:' + date);
	return shutdownJob;
}

/* --------------------------------------------------------------------------- */

function scheduleStartup(date) {
	var shutdownJob = schedule.scheduleJob(date, launchApp);
	console.log('Startup FandC Job:' + date);
	return shutdownJob;
}

/* --------------------------------------------------------------------------- */

function launchApp() {
	pm2.start({
		name: appName,
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
			// console.log(proc);
		}
		pm2.disconnect();
	});
}

/* --------------------------------------------------------------------------- */

function closeApp() {
		pm2.delete(appName, function(err) {
			console.log(appName + " closed and removed from PM2.");
		});
}
