import './styles.css'
import logo from '../../assets/logoFYTDream.png'
import { Link, useHistory } from 'react-router-dom'
import { FiPower } from 'react-icons/fi'



export default function Header(){
  const userName = localStorage.getItem('userName');
  const history = useHistory();
  
  function handleLogout(){
    localStorage.clear();
    history.push('/');
  }

  return(
    <div className="header-container">
      <header>
      <div className="logot">
        <img src={logo} alt="Logo"/>
        <p>FYT.Dream</p>
      </div>
      <span>Bem vindo, {userName}</span>

      <Link className="button" to="/newjogo">Criar jogo</Link>
      <button onClick={handleLogout} type="button">
        <FiPower size={18} color="#249c44" />
      </button>
      </header>
    </div>
  )
}
