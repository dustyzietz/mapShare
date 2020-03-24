import axios from 'axios';
import { UPDATE_PLAYERS, LOAD_PLAYERS } from './types';

export const updatePosition = (name, x, y) => async dispatch => {
 
  const config = {headers: {'Content-Type': 'application/json' } };
  const body = JSON.stringify({name, x, y});
  try {
    const res = await axios.post('/map', body, config);
    console.log(res.data)
   await dispatch({
      type: UPDATE_PLAYERS,
      payload: res.data
    });
  } catch (err) {
    console.log(err); 
  }
}

export const getPlayers = () => async dispatch => {
  try {
    const res = await axios.get('/map');
    console.log(res.data);
    dispatch({
      type: LOAD_PLAYERS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
}