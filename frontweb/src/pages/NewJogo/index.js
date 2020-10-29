import './styles.css'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { useState } from 'react'
import api from '../../services/api';

export default function NewJogo(){
  const [esporte, setEsporte] = useState();
  const [modalidade, setModalidade] = useState();
  const [descricao, setDescricao] = useState();
  const [idademin, setIdadeMin] = useState(0);
  const [idademax, setIdadeMax] = useState(0);
  const [cidade, setCidade] = useState();
  const [uf, setUF] = useState();
  const [endereco, setEndereco] = useState();
  const [date, setDate] = useState();
  const [horario, setHorario] = useState();
  const history = useHistory();

async function handleNewJogo(e){
  e.preventDefault();
  const user_id = localStorage.getItem('userId');
  
  const data = {
    esporte,
    modalidade,
    descricao,
    idademin,
    idademax,
    cidade,
    uf,
    endereco,
    date,
    horario,
  }
  try {
    const res = await api.post('/infojogo', data, {
      headers:{
        Authorization: user_id
      }
    });
    history.push('/meusjogos')
  } catch (err) {
    alert('Erro ao cadastrar jogo, tente novamente');
  }
}

  return(
    <div className="register-container">
      <h1>Criar Jogo</h1>
      <div className="content">

        <section>
            <select value={esporte} onChange={e=>setEsporte(e.target.value)} 
            required name="esporte" id="esporte">
            <option value="" disabled selected>Esporte</option>
              <option value="Futebol">Futebol</option>
              <option value="Vôlei">Vôlei</option>
              <option value="Basquete">Basquete</option>
              <option value="Futebol Americano">Futebol Americano</option>
              <option value="Tênis">Tênis</option>
            </select>
          
            <select value={modalidade} onChange={e=>setModalidade(e.target.value)} 
            required name="genero" id="genero">
            <option value="" disabled selected>Modalidade</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Misto">Misto</option>
            </select>

            <textarea value={descricao} onChange={e=>setDescricao(e.target.value)}
            placeholder="Descriação da quadra"/>

        <Link className='link' to="/meusjogos">
          <FiArrowLeft size={16} color="#41414d"/>
          Voltar para Meus Jogos
        </Link>
        </section>

        <form onSubmit={handleNewJogo} >

            <div className="input-group">
              <input type='number' value={idademin} onChange={e=>setIdadeMin(e.target.value)} 
              placeholder="Idade Mínima" style={{width: 200}}/>
              <span>à</span>
              <input type='number' value={idademax} onChange={e=>setIdadeMax(e.target.value)}
              placeholder="Idade Máxima" style={{width: 200}}/>
            </div>

          <div className="input-group">
            <input value={cidade} onChange={e=>setCidade(e.target.value)}
            placeholder="Cidade"/>
            <input value={uf} onChange={e=>setUF(e.target.value)}
             placeholder="UF" style={{width: 110}}/>
          </div>

          <input value={endereco} onChange={e=>setEndereco(e.target.value)}
          placeholder="Endereço"/>
          <div className="input-group">
          <input value={date} onChange={e=>setDate(e.target.value)}
          placeholder="Data" type="date"/>
          <input value={horario} onChange={e=>setHorario(e.target.value)}
          placeholder="Horário" type="time" style={{width: 200}}/>
          </div>

          <button type="submit" className="button">Cadastrar</button>
        </form>

      </div>
    </div>
  )
}