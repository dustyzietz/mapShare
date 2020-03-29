import axios from 'axios';
import { LOAD_PLAYERS, UPDATE_SAVED_PLAYERS, LOAD_MAP, UPDATE_SAVED_MAPS } from './types';

export const updatePosition = (name, x, y, _id) => async dispatch => {
 
  const config = {headers: {'Content-Type': 'application/json' } };
  const body = JSON.stringify({name, x, y, _id});
  try {
     await axios.post('/map', body, config);
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
    const res = await axios.get('/map/players');
    dispatch({
      type: LOAD_PLAYERS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
}

export const addPlayer = (player) => async dispatch => {
 try {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const res = await axios.post('/map/add-player', player, config);
  dispatch({
    type: LOAD_PLAYERS,
    payload: res.data
  });
 } catch (error) {
   console.log(error);
 }
}

export const deletePlayer = id => async dispatch => {
  try {
  const res = await axios.delete(`/map/player/${id}`);
   dispatch({
    type: LOAD_PLAYERS,
    payload: res.data
  });
  } catch (err) {
    console.log(err);
  }
}

export const getSavedPlayers = () => async dispatch => {
  try {
    const res = await axios.get('/map/saved-players');
    dispatch({
      type: UPDATE_SAVED_PLAYERS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
}

export const addSavedPlayer = (player) => async dispatch => {
  try {
   const config = {
     headers: {
       'Content-Type': 'application/json'
     }
   };
   const res = await axios.post('/map/add-saved-player', player, config);
   dispatch({
     type: UPDATE_SAVED_PLAYERS,
     payload: res.data
   });
  } catch (error) {
    console.log(error);
  }
 }

 export const getMap = () => async dispatch => {
  try {
   const res = await axios.get('/map/map');
   dispatch({
     type: LOAD_MAP,
     payload: res.data
   });
  } catch (error) {
    console.log(error);
  }
 }

 export const addMap = (map) => async dispatch => {
  try {
   const config = {
     headers: {
       'Content-Type': 'application/json'
     }
   };
   const res = await axios.post('/map/map', map, config);
   dispatch({
     type: LOAD_MAP,
     payload: res.data
   });
  } catch (error) {
    console.log(error);
  }
 }

 export const addSavedMap = (map) => async dispatch => {
  try {
   const config = {
     headers: {
       'Content-Type': 'application/json'
     }
   };
   const res = await axios.post('/map/saved-map', map, config);
    dispatch({
      type: UPDATE_SAVED_MAPS,
      payload: res.data
   });
  res.json(null);
  } catch (error) {
    console.log(error);
  }
 }

 export const getSavedMaps = () => async dispatch => {
  try {
    const res = await axios.get('/map/saved-maps');
    dispatch({
      type: UPDATE_SAVED_MAPS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
}

 export const updateSize = (mySize, id) => async dispatch => {
 
  const config = {headers: {'Content-Type': 'application/json' } };
  const body = JSON.stringify({mySize, id});
  try {
     await axios.post('/map/size', body, config);
  // await dispatch({
   //   type: UPDATE_PLAYERS,
    //  payload: res.data
  //  });
  } catch (err) {
    console.log(err); 
  }
}