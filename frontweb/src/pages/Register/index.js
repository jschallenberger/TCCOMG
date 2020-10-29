import './styles.css'
import logo from '../../assets/logoFYTDream.png'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api'
import { useState } from 'react'

export default function Register(){

  const [name, setName] = useState('');
  const [email,setEmail] = useState('');
  const [senha,setSenha] = useState('');
  const [idade,setIdade] = useState(0);
  const [genero,setGenero] = useState('');

  const history = useHistory();

  async function handleRegister(e){
    e.preventDefault();
    const data = {
      name,
      email,
      senha,
      genero,
      idade
    }
    try{
      const response = await api.post('users', data);
      console.log(response)

      alert(`Seu ID de acesso: ${response.data.id}`);
      history.push('/');

    }catch(err){
      alert('Erro no cadastro, tente novamente');
    }
  } 

  return(
    <div className="register-container">
      <div className="content">

        <section>
        <img src={logo} alt="Logo"/>
        <h1>Cadastro</h1>
        <p>Faça seu cadastro e comece agora mesmo a 
          procurar times na região desejada.
        </p>

        <Link className='link' to="/">
          <FiArrowLeft size={16} color="#41414d"/>
          Voltar para página anterior
        </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input 
          value={name}
          onChange={e=> setName(e.target.value)}
          placeholder="Nome do usuário"
          />
          
          <div className="input-group">
            <select
            value={genero}
            onChange={e=> setGenero(e.target.value)}
            required 
            name="genero" 
            id="genero">
            <option value="" disabled selected>Gênero</option>
              <option value="masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </select>
            <input 
            value={idade}
            onChange={e=> setIdade(e.target.value)}
            type='number' 
            placeholder="Idade" 
            style={{width: 110}}
            />
          </div>

          <input 
          value={email}
          onChange={e=> setEmail(e.target.value)}
          type="email" 
          placeholder="E-mail"
          />
          <input 
          value={senha}
          onChange={e=> setSenha(e.target.value)}
          type="password" 
          placeholder="Senha"
          />

          <button type="submit" className="button">Cadastrar</button>
        </form>

      </div>
    </div>
  )
}