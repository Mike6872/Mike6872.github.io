var http = require('http'),
Faye = require('faye');

var server = new Faye.NodeAdapter({mount: '/faye', timeout: 5});

server.attach(8001);