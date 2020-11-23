const connection = require('../src/database/connection');

const chatusers = [];

const addUser = async ({ id, user_id, jogo_id }) => {

  const existingUser = chatusers.find((user) => user.jogo_id === jogo_id && user.user_id === user_id);

  if(!user_id || !jogo_id) return { error: 'Username and jogo_id are required.' };
  // if(existingUser) return { error: 'Username is taken.' };

  const users = await connection('usuarios').select('*').where('id', user_id).first();
  const user_name = users.name;

  const user = { id, user_id, jogo_id, user_name };

  chatusers.push(user);

  return {user};
}

const removeUser = (id) => {
  const index = chatusers.findIndex((user) => user.id === id);

  if(index !== -1) return chatusers.splice(index, 1)[0];
}

const getUser = (id) => chatusers.find((user) => user.id === id);

const getUsersInRoom = (jogo_id) => chatusers.filter((user) => user.jogo_id === jogo_id);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };