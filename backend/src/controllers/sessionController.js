const connection = require('../database/connection');


module.exports = {
  async create (req, res){
    const { email, senha } = req.body;

    const user = await connection('usuarios').where('email', email).select('name').first();
    const id = await connection('usuarios').where('email', email).andWhere('senha', senha).select('id').first();
    const useremail = await connection('usuarios').where('email', email).select('email').first();


    if (!user && !useremail){
      return res.status(400).json({error: "Nenhum usuário encontrado com este ID ou senha incorreta"});
    }
    return res.json({user, id});
  }
}