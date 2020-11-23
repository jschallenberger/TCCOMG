const connection = require('../database/connection');

module.exports = {
  async list (req, res){

    const [count] = await connection('infojogo').count();

    console.log(count);

    res.header('X-Total-Count', count['count(*)']);
    
    const infoJogos = await connection('infojogo')
    .join('usuarios', 'usuarios.id', '=', 'infojogo.user_id')
    .select(['infojogo.*', 'usuarios.name', 'usuarios.email', 'usuarios.genero', 'usuarios.idade']);
  
    return res.json(infoJogos);
  },

  async create (req, res){
    const { esporte, modalidade, idademin, idademax, cidade, uf, endereco, horario, descricao, date } = req.body;
    const user_id = req.headers.authorization;
 
    try {
      const [jogo_id] = await connection('infojogo').insert({
      esporte, 
      modalidade, 
      idademin, 
      idademax,
      cidade, 
      uf, 
      endereco, 
      horario,
      descricao,
      date,
      user_id
    });
    
    const candidatura = 'X';
    await connection('jogadores').insert({
      candidatura,
      user_id,
      jogo_id
    });

    return res.json({ jogo_id });  
    } catch (error) {
      return res.status(400).json({error: "Tente novamente"});
    }
  },

  async delete (req, res){
    const { id } = req.params;
    const user_id = req.headers.authorization;

    const infojogo = await connection('infojogo')
    .where('id', id)
    .select('user_id').first();

    if (infojogo.user_id != user_id){
      return res.status(401).json({error: 'No authorization'});
    }

    await connection('infojogo').where('id', id).delete();

    return res.status(204).send();

  }
}