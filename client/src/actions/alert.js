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
    let msgArray = msg.split(".")
    console.log(msgArray, "msgArray")
    const speech = new Speech() // will throw an exception if not browser supported
    if(speech.hasBrowserSupport()) { // returns a boolean
        console.log("speech synthesis supported")
    }
  
    const useSpeech = async sentence => {
        await  speech
        .speak({
          text: sentence,
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
    }
    

    try {
        const data = await  speech
    .init({
      volume: 0.5,
     // lang: "en-GB",
      rate: 1,
      pitch: 1,
     // voice:'Google UK English Male',
     splitSentences: false, })
    console.log(data.voices[5].name)
    if(data.voices[5].name === "Google UK English Male"){
        speech.setLanguage("en-GB")
        speech.setVoice('Google UK English Male')
    }
    msgArray.map(sentence => {
        useSpeech(sentence)
    })
     
    } catch (error) {
        console.log(error)
    }
    
     dispatch({
       type: SET_ALERT,
       payload: { msg, alertType, id },
     });
  
     setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };
  
