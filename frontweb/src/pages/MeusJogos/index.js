import './styles.css'
import Header from '../../components/Header'
import { FiMessageCircle, FiAward } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'


export default function MeusJogos(){
  const userId = localStorage.getItem('userId')
  const [jogos, setJogos] = useState([]);

  useEffect(()=>{
    api.get('jogos', {
      headers: {
        Authorization: userId,
      }
    }).then(response => {
      setJogos(response.data)
    })
  },[userId]);

  async function handleDeleteJogo(id){
    
    try {
      await api.delete(`infojogo/${id}`, {
        headers:{
          Authorization: userId
        }
      });

      setJogos(jogos.filter(jogo=> jogo.id !== id));
    } catch (err) {
      alert('Erro ao deletar caso, tente novamente')
    }
  }

  return(
    <div className="meusjogos-container">
    <Header/>

    <h1>Meus Jogos</h1>

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
              }} className="button1">Detalhes</Link> 
               
              <Link to={{
              pathname: '/chat',
              state: jogo
              }}>
                <button type="button">
                  <FiMessageCircle size={20} color="#249c44" />
                </button>
              </Link>

              {jogo.user_id === userId 
                ? <FiAward className='lider' size={40} color="#249c44" />
              :null}
            </div>

           </li>
      ))}
    </ul>
    </div>
  )
}