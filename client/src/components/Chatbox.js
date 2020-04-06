import React, {useState} from 'react';
import Send from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import Draggable from "react-draggable";





export const Chatbox = ({chatsOpen, messages, chatName, sendMessage, setChatsOpen}) => {
 
 

  const [message, setMessage] = useState('');

  const onSubmit = () => {
sendMessage(message, chatName);
setChatsOpen(false);
setMessage('');    
  }
  return (
    <Draggable >
    <div className='chatbox'>
      CHATBOX
     {/* {chatsOpen &&
     <div style={{position: 'fixed', top: 0, backgroundColor: 'black'}}>
        <form>
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
      </form>
      </div> }  */}
      {messages.length > 0 &&
      messages.map((m, i) => 
      <div key={i}> {m.chatName}{' : '}{m.message} </div>
      )}
    </div>
    </Draggable>
  )
}
