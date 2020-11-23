import './styles.css'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft, FiCheck, FiX } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import api from '../../services/api';

export default function Detalhes(props){
  const jogo = props.location.state;
  
  const [esporte, setEsporte] = useState(jogo.esporte);
  const [modalidade, setModalidade] = useState(jogo.modalidade);
  const [descricao, setDescricao] = useState(jogo.descricao);
  const [idademin, setIdadeMin] = useState(jogo.idademin);
  const [idademax, setIdadeMax] = useState(jogo.idademax);
  const [cidade, setCidade] = useState(jogo.cidade);
  const [uf, setUF] = useState(jogo.uf);
  const [endereco, setEndereco] = useState(jogo.endereco);
  const [date, setDate] = useState(jogo.date);
  const [horario, setHorario] = useState(jogo.horario);

  const [jogadores, setJogadores] = useState([]);

  const history = useHistory();

  useEffect(()=>{
      api.get(`jogadores/${jogo.id}`).then(response => {
      setJogadores(response.data.jogadores)
      console.log(jogadores)
    })  
  }, [])

  async function acceptCandidature(user_id, jogo_id){
    const data = {
      user_id,
      jogo_id
    }
    
    try{
      const response = await api.post('jogadores/acceptCandidature', data);
      setJogadores(jogadores.map(x => {
        if(x.jogo_id !== jogo_id && x.user_id !== user_id) return x
        return {...x, candidatura: 'X'}
   }))
      alert('Candidatura Aceita!')
  
    }catch(err){
      alert('Erro ao processar, tente novamente');
    }
  
  }
async function refuseCandidatura(user_id, jogo_id){

  try{
    const response = await api.delete('jogadores', {
      data: {
        user_id,
        jogo_id
      }
    });
    alert('Candidatura recusada!')
    setJogadores(jogadores.filter(jogo=> jogo.user_id !== user_id));

  }catch(err){
    alert('Erro ao processar, tente novamente');
  }

}

  return(
    <div className="register-container">
        <button className='link' onClick={()=>history.go(-1)}>
          <FiArrowLeft size={16} color="#41414d"/>
          Voltar para página anterior
        </button>
      <h1>Detalhes</h1>
      <div className="content">

        <section className="detalhes">
            <strong>ESPORTE:</strong>
            <p>
              {esporte}
            </p>
          
            <strong>MODALIDADE:</strong>
            <p>
              {modalidade}
            </p>

            <strong>DESCRIÇÃO:</strong>
            <p>
              {descricao}
            </p>

        </section>

        <form className="detalhes">
          <div className="input-group">
            <strong>IDADE MÍNIMA:</strong>
            <p>{idademin}</p>
            <strong>IDADE MÁXIMA:</strong>
            <p>{idademax}</p>
          </div>    

          <strong>ENDEREÇO:</strong>
          <p>{endereco} {" "}  
            ({cidade} / {uf})
          </p>
          
          <div className="input-group">
            <strong>DATA:</strong>
            <p>{date}</p>
            <strong>HORÁRIO:</strong>
            <p>{horario}</p>
          </div>

        </form>
      
      </div>

    {jogadores.map(jogador=>(
      <div key={jogador.id} className="item">
        <div className="desc">
          <strong>{jogador.name}</strong>
          <strong>IDADE:</strong>
          <p>{jogador.idade}</p>
        </div>

        {/* 
        **********************************************
        PARA APARECER APROVAÇÃO DA CANDIDATURA OU NÃO 
        **********************************************
        */}
        <div className="approve">
        {
        
        jogador.candidatura === 'X' 
        ? <p>Aprovado</p>
        :<div>
          <button onClick={()=>acceptCandidature(jogador.user_id, jogador.jogo_id)}>
            <FiCheck  size={18}/>
          </button>
          <button onClick={()=>refuseCandidatura(jogador.user_id, jogador.jogo_id)}>
            <FiX size={18}/>
          </button>
        </div>
        
        }
        </div>
        
      </div>
    ))}
      
    </div>
  )
}