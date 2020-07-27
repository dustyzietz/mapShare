
import axios from 'axios';

export const setAlert = (msg, alertType, timeout = 5000) =>async dispatch => {
 const lang = 'en-GB'
const voiceIndex = 1  

const speak = async text => {
  if (!speechSynthesis) {
    return
  }
  const message = new SpeechSynthesisUtterance(text)
  message.rate = 0.9
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
