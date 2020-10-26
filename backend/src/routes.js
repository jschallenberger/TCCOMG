const express = require('express');
const usuariosController = require('./controllers/usuariosController');
const infojogoController = require('./controllers/infojogoController');
const jogadoresController = require('./controllers/jogadoresController');
const sessionController = require('./controllers/sessionController');

const routes = express.Router();


routes.post('/sessions', sessionController.create);


routes.get('/users', usuariosController.list);
routes.post('/users', usuariosController.create);

routes.get('/infojogo', infojogoController.list);
routes.post('/infojogo', infojogoController.create);
routes.delete('/infojogo/:id', infojogoController.delete);


routes.get('/jogadores/:jogo_id', jogadoresController.list);
routes.get('/jogos', jogadoresController.listByUser);
routes.post('/jogadores', jogadoresController.create);
routes.post('/jogadores/acceptCandidature', jogadoresController.acceptCandidature);






module.exports = routes;