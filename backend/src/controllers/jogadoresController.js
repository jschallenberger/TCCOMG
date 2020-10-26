const connection = require('../database/connection');

module.exports = {

  async list (req, res){
    const { jogo_id } = req.params;

    const jogadores = await connection('jogadores').where('jogo_id', jogo_id).select('*');
  
    return res.json({jogadores});
  },

  async listByUser (req, res){
    const user_id = req.headers.authorization;

    var jogosByUser = await connection('jogadores')
      .where('user_id', user_id).distinct().select('jogo_id');

    var jogosArray= [];
    jogosByUser.map((el)=>{
       jogosArray.push(el.jogo_id);
    });
      
    const infoJogos = await connection('infojogo').whereIn("id", jogosArray).select('*');
    return res.json(infoJogos);
  },

  async create (req, res){
    const candidatura = '';
    const { jogo_id } = req.body;
    const user_id = req.headers.authorization;

    const [id] = await connection('jogadores').insert({
      candidatura,
      user_id,
      jogo_id
    });

    return res.json({ id });
  },

  async acceptCandidature (req, res){
    const { jogo_id, user_id } = req.body;

    await connection('jogadores').where({jogo_id: jogo_id,
    user_id: user_id}).update({candidatura: 'X'});

    return res.json({ msg: "Candidatura aceita"});

  }
}