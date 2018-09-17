# Focus And Context Control App

This is a node.js app designed to run and monitor the Focus and Context project while it is installed remotely. We can schedule shutdowns and startups as well as reboot from a crashed launch.

I also aspire to have the app send a "still alive" call to my control app so it can reboot it on a hang and to create a web GUI which will allow me to access it remotely.

### Requirements

* [node.js](https://nodejs.org/en/) developed with version 10.8.0
* [pm2](http://pm2.keymetrics.io/) developed with version 3.0.4
* [npm](https://www.npmjs.com/) developed with version 6.2.0

### Development

For development clone this repository and run `npm install`

### Usage

To launch the application you can call it from the command line quite easily.

### Using Videos

Sometimes we want to convert our videos from H264 files to .mp4 files so we can share them more easily. you dan co that with the following command on a PC that has ffmpeg installed"

`ffmpeg -framerate 24 -i input.264 -c copy output.mp4`
