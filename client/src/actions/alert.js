
import axios from 'axios';

export const setAlert = (msg, alertType, timeout = 5000) =>async dispatch => {
  const config = {headers: {'Content-Type': 'application/json' } };
  const body = JSON.stringify({msg, alertType, timeout});
  try {
    await axios.post('/map/alerts', body, config);
  } catch (err) {
    console.log(err); 
  }
 
};
