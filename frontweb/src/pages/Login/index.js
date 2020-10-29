import './styles.css'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import logo from '../../assets/logoFYTDream.png'
import api from '../../services/api'
import { useState } from 'react'


export default function Login(){
const [email, setEmail] = useState('');
const [senha, setSenha] = useState('');
const history = useHistory();

async function handleLogin(e){
  e.preventDefault();

  try {
    const response = await api.post('sessions',{email, senha});

    localStorage.setItem('userId',response.data.id.id);
    localStorage.setItem('userName',response.data.user.name);

    history.push('/meusjogos');

  } catch (err) {
    alert('Falha no Login, tente novamente!');
  }

}


  return(
    <div className="login-container">

      <div className="landing">
        <img src={logo} alt="Logo"/>
        <h1>FYT.Dream</h1>
      </div>

      <section className="form">

        <form onSubmit={handleLogin}>
        <h1>Faça seu login</h1>

        <input 
        value={email}
        onChange={e=> setEmail(e.target.value)}
        placeholder="Seu e-mail"
        />
        <input 
        value={senha}
        onChange={e=> setSenha(e.target.value)}
        type="password" 
        placeholder="Sua senha"/>
        <button className="button" type="submit">Fazer Login</button>

        <Link className='link' to="/register">
          <FiLogIn size={16} color="#41414d"/>
          Fazer Cadastro
        </Link>
        </form>

      </section>

    </div>
  )
}