const connection = require('../database/connection');

module.exports = {

  async list (req, res){
    const { jogo_id } = req.params;

    const jogadores = await connection('jogadores').where('jogo_id', jogo_id).select(['jogadores.*','usuarios.name', 'usuarios.email', 'usuarios.genero', 'usuarios.idade'])
    .innerJoin('usuarios', 'user_id', 'usuarios.id' );
  
    return res.json({jogadores});
  },

  async listByUser (req, res){
    const user_id = req.headers.authorization;

    var jogosByUser = await connection('jogadores')
      .where('user_id', user_id).andWhere('candidatura', 'X').distinct().select('jogo_id');

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

    const candExists = await connection('jogadores').select('*')
    .where('user_id', user_id).andWhere('jogo_id', jogo_id).first();

    if (!candExists){
      const [id] = await connection('jogadores').insert({
        candidatura,
        user_id,
        jogo_id
      });
      return res.json({ id });
    }
    return res.status(400).json({error: "Usuário já candidatado"});


  },

  async acceptCandidature (req, res){
    const { jogo_id, user_id } = req.body;

    await connection('jogadores').where({jogo_id: jogo_id,
    user_id: user_id}).update({candidatura: 'X'});

    return res.json({ msg: "Candidatura aceita"});

  },

  async delete (req, res){
    const { jogo_id, user_id } = req.body;

    console.log(req.body)

    await connection('jogadores').where('user_id', user_id).andWhere('jogo_id', jogo_id).delete();

    return res.status(204).send();

  }
}