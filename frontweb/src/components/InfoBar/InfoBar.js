import './styles.css';
import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';

export default function InfoBar({jogo_id}){


  return(
    <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>Sala do jogo {jogo_id}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/meusjogos"><img src={closeIcon} alt="close icon" /></a>
    </div>
  </div>
  )
}