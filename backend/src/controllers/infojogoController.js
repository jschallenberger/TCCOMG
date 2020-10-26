const connection = require('../database/connection');

module.exports = {
  async list (req, res){
    const { page = 1 } = req.query;

    const [count] = await connection('infojogo').count();

    console.log(count);

    res.header('X-Total-Count', count['count(*)']);
    
    const infoJogos = await connection('infojogo')
    .join('usuarios', 'usuarios.id', '=', 'infojogo.user_id')
    .limit(5)
    .offset((page -1) * 5)
    .select(['infojogo.*', 'usuarios.name', 'usuarios.email', 'usuarios.genero', 'usuarios.idade']);
  
    return res.json(infoJogos);
  },

  async create (req, res){
    const { esporte, modalidade, idademin, idademax, cidade, uf, endereco, horario } = req.body;
    const user_id = req.headers.authorization;

    const [jogo_id] = await connection('infojogo').insert({
      esporte, 
      modalidade, 
      idademin, 
      idademax,
      cidade, 
      uf, 
      endereco, 
      horario,
      user_id
    });
    

    const candidatura = 'X';
    await connection('jogadores').insert({
      candidatura,
      user_id,
      jogo_id
    });

    return res.json({ jogo_id });
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