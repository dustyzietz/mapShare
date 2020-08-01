import { v4 as uuidv4 } from 'uuid';

import {
     SET_ALERT,
     REMOVE_ALERT,
  } from "./types";
import axios from 'axios';
import Speech from "speak-tts";

export const setAlert = (msg, alertType, timeout = 5000) =>async dispatch => {

console.log('gets here')
  const config = {headers: {'Content-Type': 'application/json' } };
  const body = JSON.stringify({msg, alertType, timeout});
  try {
    await axios.post('/map/alerts', body, config);
  } catch (err) {
    console.log(err); 
  }
 
};

export const syncAlert = (data) => async (
    dispatch
  ) => {
    const {msg, alertType, timeout} = data.newAlert
    const id = uuidv4();
    const speech = new Speech() // will throw an exception if not browser supported
    if(speech.hasBrowserSupport()) { // returns a boolean
        console.log("speech synthesis supported")
    }

    speech
    .init({
      volume: 0.5,
      lang: "en-GB",
      rate: 1,
      pitch: 1,
      voice:'Google UK English Male',
      splitSentences: false,
    })
    .then(data => {
      console.log("Speech is ready", data);
    })
    .catch(e => {
      console.error("An error occured while initializing : ", e);
    });

    speech.setLanguage('en-US')
    speech.setVoice('Google UK English Male')
    
    speech
    .speak({
      text: msg,
      queue: true,
      listeners: {
        onstart: () => {
          console.log("Start utterance");
        },
        onend: () => {
          console.log("End utterance");
        },
        onresume: () => {
          console.log("Resume utterance");
        },
        onboundary: event => {
          console.log(
            event.name +
              " boundary reached after " +
              event.elapsedTime +
              " milliseconds."
          );
        }
      }
    })
    .then(data => {
      console.log("Success !", data);
    })
    .catch(e => {
      console.error("An error occurred :", e);
    });
     dispatch({
       type: SET_ALERT,
       payload: { msg, alertType, id },
     });
  
     setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };
  
