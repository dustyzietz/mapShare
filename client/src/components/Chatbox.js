import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Minimize from "@material-ui/icons/Minimize";
import Draggable from "react-draggable";


export const Chatbox = ({
  chatsOpen,
  messages,
  chatName,
  sendMessage,
  setChatsOpen,
}) => {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false)
  const onSubmit = () => {
    sendMessage(message, chatName);
    setChatsOpen(false);
    setMessage("");
  };
  return (
    <>
        {open ?
        <Draggable>
         <div className="card border-dark mb-3" style={{ maxWidth: "20rem", maxHeight: "20rem", overflow: "auto"}}>
<div className="card-header">CHATBOX  
        <IconButton onClick={()=>{setOpen(!open)}} size="small" style={{float:'right'}}>
            <Minimize />
          </IconButton></div>
        <div className="card-body">
          <div className="card-text">
            {messages.length > 0 &&
              messages.map((m, i) => (
                <div key={i}>
                  {" "}
                  {m.chatName}
                  {" : "}
                  {m.message}{" "}
                </div>
              ))}
          </div>
        </div> 
        </div>
        </Draggable>
        :
        <IconButton size="small" onClick={()=>{setOpen(!open)}} style={{background:'white', opacity:'.5'}}>
        <Minimize />
      </IconButton>
        } 
        </>
  );
};
/* {chatsOpen &&
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
      </div> }  */
