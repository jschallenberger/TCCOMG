import './styles.css'
import logo from '../../assets/logoFYTDream.png'
import { Link, useHistory } from 'react-router-dom'
import { FiMenu, FiPower } from 'react-icons/fi'
import { Menu, Button, MenuItem } from '@material-ui/core'
import { useState } from 'react'



export default function Header(){
  const userName = localStorage.getItem('userName');
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  
  function handleLogout(){
    localStorage.clear();
    history.push('/');
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleBuscarJogos(){
    history.push('/busca');
  }

  function handleCriarJogos(){
    history.push('/newjogo');
  }
  
  function handleMeusJogos(){
    history.push('/meusjogos');
  }

  return(
    <div className="header-container">
      <header>
      <div className="logot">
        <img src={logo} alt="Logo"/>
      </div>
      <span>Bem vindo, {userName}</span>
       <div className="buttons">
       <Button className="hamb" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <FiMenu size={18} color="#249c44" />
       </Button>
       <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
       >
        <MenuItem onClick={handleCriarJogos} >Criar jogo</MenuItem>
        <MenuItem onClick={handleMeusJogos} >Meus jogos</MenuItem>
        <MenuItem onClick={handleBuscarJogos} >Buscar jogos</MenuItem>
      </Menu>

       {/* <Link className="button3" to="/meusjogos">Meus jogos</Link>
        <Link className="button2" to="/busca">Buscar jogos</Link>
        <Link className="button" to="/newjogo">Criar jogo</Link>*/}
      </div>
      <button onClick={handleLogout} type="button">
        <FiPower size={18} color="#249c44" />
      </button>
      </header>
    </div>
  )
}
