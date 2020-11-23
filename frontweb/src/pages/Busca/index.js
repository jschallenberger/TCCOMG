import './styles.css'
import Header from '../../components/Header'
import { FiMessageCircle, FiAward } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'


export default function BuscarJogos(){
  const userId = localStorage.getItem('userId')
  const [esporte, setEsporte] = useState();
  const [modalidade, setModalidade] = useState();
  const [idademin, setIdadeMin] = useState();
  const [idademax, setIdadeMax] = useState();
  const [cidade, setCidade] = useState();
  const [uf, setUF] = useState();
  const [jogos, setJogos] = useState([]);
  const [baseJogos, setBaseJogos] = useState([]);

  useEffect(()=>{
    api.get('infojogo', {
    }).then(response => {
      setJogos(response.data);
      setBaseJogos(response.data);
    })
  },[userId]);

  function filterJogos(){
    setJogos(baseJogos.filter(jogo=> jogo.esporte    === esporte));
  }
  function limparFiltro(){
    setEsporte('');
    setModalidade('');
    setIdadeMin('');
    setIdadeMax('');
    setCidade('');
    setUF('');
    setJogos(baseJogos)

  }

  return(
    <div className="buscarjogos-container">
    <Header/>

    <h1>Buscar Jogos</h1>
    <div className="filtros">
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

      <input value={cidade} onChange={e=>setCidade(e.target.value)}
        placeholder="Cidade"style={{width: 150 ,marginLeft: 5}}/>
      <input value={uf} onChange={e=>setUF(e.target.value)}
       placeholder="UF" style={{width: 80, marginRight: 5}}/>

      <input type='number' value={idademin} onChange={e=>setIdadeMin(e.target.value)}
      placeholder="Idade Mín" style={{width: 110}}/>
      <input type='number' value={idademax} onChange={e=>setIdadeMax(e.target.value)}
      placeholder="Idade Máx" style={{width: 110}}/>

      <button className="button1" onClick={()=>filterJogos()}>
        Buscar
      </button>
      <button className="button5" onClick={()=>limparFiltro()}>
        Limpar
      </button>
    </div>

    <ul>
      {jogos.map(jogo=>(
        
             <li key={jogo.id}>

             <div className="group1">
               <strong>ESPORTE:</strong>
               <p>{jogo.esporte}</p>
               <strong>FAIXA ETÁRIA:</strong>
               <p>De {jogo.idademin} à {jogo.idademax} anos</p>
               <strong>ENDEREÇO:</strong>
               <p>{jogo.endereco} </p>
               <p>({jogo.cidade} / {jogo.uf})</p>
             </div>

             <div className="group2">
              <strong>MODALIDADE:</strong>
              <p>{jogo.modalidade}</p>
              <strong>DATA:</strong>
              <p>{jogo.date}</p>
              <strong>HORÁRIO:</strong>
              <p>{jogo.horario}</p>
             </div>
     
             <div className="group3">
             
              <Link to={{
              pathname: "/detalhes",
              state: jogo // your data array of objects
              }} >
                <button className='button6'>
                Detalhes</button></Link>  
              
              {jogo.user_id === userId 
                ? null
              :<button className='button6' onClick={()=>{alert("oi")}} style={{marginTop: 20, marginBottom: 10}}>
                Participar
                </button>}

              {jogo.user_id === userId 
                ? <FiAward className='lider' size={30} color="#249c44" />
              :null}
            </div>

           </li>
      ))}
    </ul>
    </div>
  )
}