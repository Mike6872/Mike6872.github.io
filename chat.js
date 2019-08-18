var Faye = require('faye');

var client = Faye.Client("http://localhost:8001/faye");

client.subscribe("/messages", function(message) {
    
})