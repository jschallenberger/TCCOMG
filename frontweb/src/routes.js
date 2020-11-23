import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import MeusJogos from './pages/MeusJogos'
import NewJogo from './pages/NewJogo'
import Detalhes from './pages/Detalhes'
import BuscarJogos from './pages/Busca'
import Chat from './pages/Chat'




export default function Routes(){
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login}  />
        <Route path="/register" component={Register}  />
        <Route path="/meusjogos" component={MeusJogos}  />
        <Route path="/busca" component={BuscarJogos}  />
        <Route path="/newjogo" component={NewJogo}  />
        <Route path="/detalhes" component={(props) => <Detalhes {...props}/>}  />
        <Route path="/chat" component={(props) => <Chat {...props}/>}  />



      </Switch>
    </BrowserRouter>
  )
}