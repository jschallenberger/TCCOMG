const connection = require('../database/connection');

module.exports = {
  async list (req, res){
    const { jogo_id } = req.params;

    const chat = await connection('chat')
    .join('usuarios', 'usuarios.id', '=', 'chat.user_id')
    .select(['chat.message', 'usuarios.name'])
    .where('jogo_id', jogo_id);
  
    return res.json(chat);
  },

  async create (req, res){
    const { message, jogo_id, user_id } = req.body;
 
    try {
      const [jogo_id] = await connection('chat').insert({
        message,
        jogo_id,
        user_id
    });
    

    return res.json({ jogo_id });  
    } catch (error) {
      return res.status(400).json({error: "Tente novamente"});
    }
  },

}