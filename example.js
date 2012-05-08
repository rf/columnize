var spawn = require('child_process').spawn;
var columnize = require('./columnize');
var out = columnize(3);

setInterval(function() {
  spawn('uptime').stdout.on('data', out(1));
}, 1000);

setInterval(function() {
  spawn('ps', ['-fe']).stdout.on('data', out(0));
}, 1000);

setInterval(function() {
  spawn('ls', ['-lah', '/']).stdout.on('data', out(2));
}, 1000);
