import React, { useState } from "react";
import Send from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import { connect } from "react-redux";
import { setAlert } from "../actions/alert";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const ChatInput = ({
  sendMessage,
  chatsOpen,
  setChatsOpen,
  chatName,
  setAlert,
}) => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [message, setMessage] = useState("");

  const onSubmit = () => {
    sendMessage(message, chatName);
    let alertMessage = `${chatName} . ${message}`;
    setAlert(alertMessage, "secondary", 15000, 4);
    setMessage("");
  };

  const chatStop = () => {
    SpeechRecognition.stopListening()
    sendMessage(transcript, chatName);
    let alertMessage = `${chatName} . ${transcript}`;
    setAlert(alertMessage, "secondary", 15000, 4);
    setMessage("");
    resetTranscript()
  }

  return (
    <div>
      {chatsOpen && (
        <div style={{ backgroundColor: "black" }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            <div className="form-group">
              <input
                type="text"
                placeholder={chatName}
                name="message"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
             
              <IconButton type="submit">
                <Send style={{ color: "white" }} />
              </IconButton>
              <IconButton
                onClick={() => {
                  setChatsOpen(false);
                }}
              >
                 
                <Close style={{ color: "white" }} />
              </IconButton> 
               {SpeechRecognition.browserSupportsSpeechRecognition() &&
                <div>
                <button type="button" onClick={()=>{SpeechRecognition.startListening()}}>Start</button>
                <button type="button" onClick={chatStop}>Stop</button>
                <button type="button" onClick={resetTranscript}>Reset</button>
              <p style={{color:"white"}}>{transcript}</p>
              </div>
            }
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default connect(null, { setAlert })(ChatInput);
