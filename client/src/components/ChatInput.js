import React, {useState} from 'react';
import Send from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import { connect } from 'react-redux'
import { setAlert } from "../actions/alert"


const ChatInput = ({sendMessage, chatsOpen, setChatsOpen, chatName, setAlert}) => {

  const [message, setMessage] = useState('');

  const onSubmit = () => {
    sendMessage(message, chatName);
    setAlert(message, 'secondary', 10000)
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


export default connect(null, {setAlert})(ChatInput)