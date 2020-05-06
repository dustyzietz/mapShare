import React, {useState} from 'react';
import Send from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';


export const ChatInput = ({sendMessage, chatsOpen, setChatsOpen, chatName}) => {

  const [message, setMessage] = useState('');

  const onSubmit = () => {
    sendMessage(message, chatName);
    setMessage('');    
      }

  return (
    <div>
       {chatsOpen &&
     <div
      style={{ backgroundColor: 'black'}}
      >
        <form onSubmit={e => {
          e.preventDefault();
          onSubmit();
        }}>
    <div className="form-group">
        <input
          type="text"
          placeholder={chatName}
          name="message"
          value={message}
          onChange={(e) => {setMessage(e.target.value)}}
        />
        <IconButton type='submit' >
          <Send style={{color:'white'}}/>
        </IconButton>
        <IconButton onClick={() => {setChatsOpen(false)}}>
          <Close style={{color:'white'}}/>
        </IconButton>
      </div>
      </form>
      </div> } 
    </div>
  )
}
