const connection = require('../database/connection');


module.exports = {
  async create (req, res){
    const { id } = req.body;

    const user = await connection('usuarios').where('id', id).select('name').first();

    if (!user){
      return res.status(400).json({error: "Nenhum usuário encontrado com este ID"});
    }

    return res.json(user);
  }
}