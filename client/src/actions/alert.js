
import axios from 'axios';

export const setAlert = (msg, alertType, timeout = 5000, voice, pitch = 1, rate = 1) =>async dispatch => {
 let lang = 'en-GB'
let voiceIndex = 1 
if(voice === 1){
 lang = 'en-US'
     voiceIndex = 0
} else if (voice === 2){
     lang = 'en-US'
     voiceIndex = 1 
} else if (voice === 3){
     lang = 'en-GB'
     voiceIndex = 0 
}else if (voice === 4){
    lang = 'en-US'
    voiceIndex = 0 
    pitch = 1
    rate = 1.1
}else if (voice === 5){
    lang = 'en-GB'
    voiceIndex = 0 
    pitch = 1.5
    rate = 1.5
}

const speak = async text => {
  if (!speechSynthesis) {
    return
  }
  const message = new SpeechSynthesisUtterance(text)
  message.rate = rate
   message.pitch = pitch

  message.voice = await chooseVoice()
  speechSynthesis.speak(message)
}

const getVoices = () => {
  return new Promise(resolve => {
    let voices = speechSynthesis.getVoices()
    if (voices.length) {
      resolve(voices)
      return
    }
    speechSynthesis.onvoiceschanged = () => {
      voices = speechSynthesis.getVoices()
      resolve(voices)
    }
  })
}

const chooseVoice = async () => {
  const voices = (await getVoices()).filter(voice => voice.lang == lang)
  return new Promise(resolve => {
    resolve(voices[voiceIndex])
  })
}

speak(msg)

  const config = {headers: {'Content-Type': 'application/json' } };
  const body = JSON.stringify({msg, alertType, timeout});
  try {
    await axios.post('/map/alerts', body, config);
  } catch (err) {
    console.log(err); 
  }
 
};
