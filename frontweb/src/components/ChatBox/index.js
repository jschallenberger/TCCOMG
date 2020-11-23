import './styles.css'

export default function ChatBox({ setMessage, sendMessage, message }){

  return(
    <form className="formbox">
    <input
      className="input"
      type="text"
      placeholder="Digite uma mensagem..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className="sendButton" onClick={e => sendMessage(e)}>Enviar</button>
  </form>
  );
}