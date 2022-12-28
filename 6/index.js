const io = require('socket.io');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((request, response) => {
  const indexPath = path.join(__dirname, "index.html");
  const readStream = fs.createReadStream(indexPath);
  readStream.pipe(response);
});

const socket = io(server);
let usersList = [];
let delUsersList = [];

socket.on('connection', client => {
  console.log('Client ID: ' + client.id);
  client.broadcast.emit('NEW_CLIENT_CONNECTED');

  client.on('NewPlayer', name => {
    let user = {
      name: '',
      id: ''
    }
    let index = delUsersList.findIndex(function (user) {
      if (user.name === name) {
        return true;
      };
    })
    if (index > -1) {
      oldUser = delUsersList.splice(index, 1);
      usersList.push(oldUser[0]);
      console.log("Welcome back " + oldUser[0].name);
    } else {
      user.name = name;
      user.id = client.id;
      usersList.push(user);
      console.log('New client connected ' + name);
    }
    console.log(usersList);
  })

  client.on('disconnect', () => {
    let index = usersList.findIndex(function (user) {
      if (user.id === client.id) {
        return true;
      }
    });

    delUser = usersList.splice(index, 1);
    delUsersList.push(delUser[0])
    console.log('Client  disconnected: ' + delUser[0].name);
    console.log(usersList);

  })
  client.on('CLIENT_MSG', data => {
    const payload = {
      message: data.message.split('').join(''),
    };
    client.emit('SERVER_MSG', payload)
    client.broadcast.emit('SERVER_MSG', payload);
  });
});

server.listen(3000);