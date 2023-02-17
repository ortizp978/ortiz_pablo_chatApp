const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

const port = process.env.PORT || 3000;

//tell express where to find static web files
app.use(express.static('public'));

// app.get is a route handler
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/contact.html');
});

server.listen(port, () => {
  console.log(`listening on ${port}`);
});

//socket.io stuff goes here
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('connected', { sID: socket.id, message: 'new connection' });

  // listen for incoming messages from Anyone connected to the chat service and then see what the message is
  socket.on('chat_message', function(msg) { // step one - recieve the message
    console.log(msg);

    //step 2 - show everyone what just sent though (send the message to everyone conected to the service)
    io.emit('new_message', { message: msg });
  })

  // listen for a typing event and broadcast to all
  socket.on('user_typing', function(user) {
    console.log(user);

    io.emit('typing', { currentlytyping: user })
  });

  socket.on('stopTyping', function(user) {
    console.log(user);
    io.emit('stopTyping', { currentlytyping: user });
});

  socket.emit('connected', {sID: socket.id, message: 'new connection'});


  socket.on ('typing', (data) => {
    socket.broadcast.emit('typing', (data));
    });

});