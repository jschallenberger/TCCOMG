import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ChatBox from '../../components/ChatBox';
import InfoBar from '../../components/InfoBar/InfoBar'
import Messages from '../../components/Messages/index'
import './styles.css';
import api from '../../services/api'

let socket;


export default function Chat(props){
  // const [user_id, setUser_id] = useState('');
  // const [id, setId] = useState('');
  const [savedMessages, setSavedMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const ENDPOINT = 'localhost:5000'
  const { user_id, id: jogo_id } = props.location.state;
  const userId = localStorage.getItem('userId')
  const userName = localStorage.getItem('userName')

  
  //UseEffect pra criar socket Join e Leave.
  useEffect(()=>{
    socket = io(ENDPOINT);

    socket.emit('join', { user_id: userId, jogo_id }, ()=>{
    });
    return ()=>{
      socket.emit('disconnection');
      socket.off();
    }
  }, [props.location.state, ENDPOINT, jogo_id, userId]);

  //UseEffect para mensagens
  useEffect(()=>{
    socket.on('message', (message)=>{
      setMessages([...messages, message]);
    })
    console.log(messages)
  }, [message]);

  //UseEffect para msgs salvas
  useEffect(()=>{
    api.get(`chat/${jogo_id}`).then(response => {
      setSavedMessages(response.data)
    })  
  },[])

  //function for sending messages

  const sendMessage = (event)=>{
    event.preventDefault();
    if(message){
      socket.emit('sendMessage', message, ()=>setMessage(''));
    }
  }

  return(
    <div className="outerContainer">
    <div className="container">
      <InfoBar jogo_id={jogo_id} />
        <Messages messages={messages} name={userName} savedMessages={savedMessages} />
      <ChatBox message={message} setMessage={setMessage} sendMessage={sendMessage} />
    </div>
    {/* <TextContainer users={users}/> */}
  </div>
  );
}