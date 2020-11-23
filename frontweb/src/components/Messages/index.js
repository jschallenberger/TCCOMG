import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message'
import SavedMessage from './SavedMessage'

import './styles.css';

const Messages = ({ messages, name, savedMessages }) => (
  <ScrollToBottom className="messages">
    {savedMessages.map((savedMessage,i)=>
    <div key={i}><SavedMessage key={i} savedMessage={savedMessage} 
    name={name}/></div>
    )}

    {messages.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)}
  </ScrollToBottom>
);

export default Messages;