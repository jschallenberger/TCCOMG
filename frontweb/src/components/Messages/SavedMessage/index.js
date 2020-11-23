import './styles.css';

import ReactEmoji from 'react-emoji';

const SavedMessage = ({savedMessage}, name ) => {
  let isSentByCurrentUser = false;
  const userName = localStorage.getItem('userName')
  console.log(savedMessage)

  if(savedMessage.name === userName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{savedMessage.name}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{savedMessage.message}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{savedMessage.message}</p>
            </div>
            <p className="sentText pl-10 ">{savedMessage.name}</p>
          </div>
        )
  );
}

export default SavedMessage;