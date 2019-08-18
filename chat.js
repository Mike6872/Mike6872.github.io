var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var nicknames = [];

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/chat2.html');
});

io.on('connection', function (socket) {
  socket.on("new user", function(data, callback) {
      if (nicknames.indexOf(data) != -1) {
          callback(false);
      }
      else {
        callback(true);
        socket.nickname = data;
        nicknames.push(socket.nickname);
        updateNicknames();
      }    
  });
  function updateNicknames() {
    io.sockets.emit("usernames", nicknames);
  }
  socket.on('chat message', function (data) {
    io.sockets.emit('chat message', {msg: data, nick: socket.nickname});
  });
  socket.on("disconnect", function(data) {
      if (!socket.nickname) return;
      nicknames.splice(nicknames.indexOf(socket.nickname), 1);
      updateNicknames();
  })
});

http.listen(port, function () {
  console.log('listening on *:' + port);
});  