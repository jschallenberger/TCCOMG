const connection = require('../database/connection');
const crypto = require ('crypto');


module.exports = {
  async list (req, res){
    const users = await connection('usuarios').select('*');
  
    return res.json(users);
  },

  async create(req, res){
    const { name, email, genero, idade } = req.body;

    const id = crypto.randomBytes(4).toString('HEX');
  
    await connection('usuarios').insert({
      id,
      name,
      email,
      genero,
      idade
    })

    return res.json(id);
  }
}