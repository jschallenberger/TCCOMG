function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}


const express = require ('express');
const cors = require ('cors');
const routes = require('./routes');
const connection = require('./database/connection');

const app = express();

app.use(cors());
app.use(express.json()); //Habilitar Json
app.use(routes); //Usar arquivo de routes
app.listen(3333);


/*********************************************
 * SOCKET.IO - CHAT STUFF HERE ***************
 *********************************************/

const socketio = require('socket.io');
const app2 = express();
const { addUser, removeUser, getUser, getUsersInRoom } = require('./chatusers');
const chatusers = require('./chatusers');

var server = require('http').createServer(app2);

const io = socketio(server, {cors:{
    origin: "*",
    methods: ["GET", "POST"]
}});


io.on('connection', (socket)=>{
  console.log('we have a new connection');

  socket.on('join', async ({ user_id, jogo_id }, callback)=>{
    console.log(user_id, jogo_id);

    const { error, user } = await addUser({ id: socket.id, user_id, jogo_id });

    if (error) return callback(error);

    socket.emit('message', { user: 'admin', text: `Usuário ${user.user_name}, você entrou na sala!`});
    socket.broadcast.to(user.jogo_id).emit('message', 
    {user: 'admin', text: `Usuário ${user.user_name}, entrou na sala!`})
    
    // chat.forEach((m)=>{
    //       socket.emit('message', {user: m.name, text: m.message});
    //       sleep(1000)
    //       console.log({user: m.name, text: m.message})
    //     })
    socket.join(user.jogo_id);

    io.to(user.jogo_id).emit('roomData', {room: user.jogo_id, users: getUsersInRoom(user.jogo_id)})

    callback();
  });


  socket.on('sendMessage', async(message, callback)=>{
    const user = getUser(socket.id);

    io.to(user.jogo_id).emit('message', {user: user.user_name, text: message});
    io.to(user.jogo_id).emit('roomData', {room: user.jogo_id, users: getUsersInRoom(user.jogo_id)});
   
    const [chat_messageid] = await connection('chat').insert({
      message,
      jogo_id: user.jogo_id,
      user_id: user.user_id
    });
      console.log(chat_messageid);

    callback();
  })


  socket.on('disconnection',()=>{
    const user = removeUser(socket.id);
    if(user){
      io.to(user.jogo_id).emit('message', {user: 'admin', text: `${user.user_name} saiu da sala!`})
    }
  });
});

app2.get('/', (req, res) => {
  res.send('<h1>Hello sad</h1>');
});

server.listen(5000, () => {
  console.log('listening on *:5000');
});