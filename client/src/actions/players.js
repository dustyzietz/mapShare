import axios from 'axios';
import { UPDATE_PLAYERS, LOAD_PLAYERS } from './types';

export const updatePosition = (name, x, y) => async dispatch => {
 
  const config = {headers: {'Content-Type': 'application/json' } };
  const body = JSON.stringify({name, x, y});
  try {
    const res = await axios.post('/map', body, config);
  // await dispatch({
   //   type: UPDATE_PLAYERS,
    //  payload: res.data
  //  });
  } catch (err) {
    console.log(err); 
  }
}

export const getPlayers = () => async dispatch => {
  try {
    const res = await axios.get('/map');
    dispatch({
      type: LOAD_PLAYERS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
}

export const addPlayer = (formData) => async dispatch => {
 try {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const res = await axios.post('/map/add-player', formData, config);
  dispatch({
    type: LOAD_PLAYERS,
    payload: res.data
  });
 } catch (error) {
   console.log(error);
 }
}