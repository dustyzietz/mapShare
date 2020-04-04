import React, {useState} from 'react';
import Send from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';




export const Chatbox = ({chatsOpen, messages, chatName, sendMessage, setChatsOpen}) => {
 
  const styles = {
    Chatbox : {
      position: 'fixed',
      top: '25px',
      right: '25px',
      height: '300px',
      width: '300px',
      backgroundColor: 'black',
      color: 'white'
    }
  }

  const [message, setMessage] = useState('');

  const onSubmit = () => {
sendMessage(message, chatName);
setChatsOpen(false);
setMessage('');    
  }
  return (
    <div style={styles.Chatbox}>
      CHATBOX
    {chatsOpen && <form>
    <div className="form-group">
        <input
          type="text"
          placeholder={chatName}
          name="message"
          value={message}
          onChange={(e) => {setMessage(e.target.value)}}
        />
        <IconButton onClick={onSubmit}>
          <Send style={{color:'white'}}/>
        </IconButton>
      </div>
      </form> }
      {messages.length > 0 &&
      messages.map((m, i) => 
      <div key={i}> {m.chatName}{' : '}{m.message} </div>
      )}
    </div>
  )
}
