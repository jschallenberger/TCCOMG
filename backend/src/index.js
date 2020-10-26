const express = require ('express');
const cors = require ('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json()); //Habilitar Json

app.use(routes); //Usar arquivo de routes

app.listen(3333);