import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import MeusJogos from './pages/MeusJogos'
import NewJogo from './pages/NewJogo'




export default function Routes(){
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login}  />
        <Route path="/register" component={Register}  />
        <Route path="/meusjogos" component={MeusJogos}  />
        <Route path="/newjogo" component={NewJogo}  />



      </Switch>
    </BrowserRouter>
  )
}