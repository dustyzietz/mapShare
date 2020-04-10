import axios from 'axios';
import { LOAD_PLAYERS, UPDATE_SAVED_PLAYERS, LOAD_MAP, UPDATE_SAVED_MAPS, ADD_CHAT, UPDATE_SAVED_MONSTERS, LOAD_HITPOINTS } from './types';

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

export const sendMessage = (message, chatName) => async dispatch => {
  const config = {headers: {'Content-Type': 'application/json' } };
  const body = JSON.stringify({message, chatName});
  try {
    await axios.post('/map/messages', body, config);
  } catch (err) {
    console.log(err); 
  }
}

export const syncPlayers = data => dispatch => {
  dispatch({
    type: LOAD_PLAYERS,
    payload: data.newPlayers
  });
}

export const syncMap = data => dispatch => {
  const {name , url} = data.newMap;
  dispatch({
    type: LOAD_MAP,
    payload: {name, url}
  });
}

export const syncMessage = data => dispatch => {
 // console.log(data);
   dispatch({
     type: ADD_CHAT,
     payload: data.newMessage
   });
}

export const syncHitPoints = data => dispatch => {
  // console.log(data);
    dispatch({
      type: LOAD_HITPOINTS,
      payload: data.newHitPoints
    });
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

export const editPlayer = (player) => async dispatch => {
  try {
   const config = {
     headers: {
       'Content-Type': 'application/json'
     }
   };
   const res = await axios.post('/map/edit-player', player, config);
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

export const editSavedPlayer = (player) => async dispatch => {
  try {
   const config = {
     headers: {
       'Content-Type': 'application/json'
     }
   };
   const res = await axios.post('/map/edit-saved-player', player, config);
   dispatch({
     type: UPDATE_SAVED_PLAYERS,
     payload: res.data
   });
  } catch (error) {
    console.log(error);
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

 export const getSavedMonsters = () => async dispatch => {
  try {
    const res = await axios.get('/map/saved-monsters');
    dispatch({
      type: UPDATE_SAVED_MONSTERS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
}

export const addSavedMonster = (monster) => async dispatch => {
  try {
   const config = {
     headers: {
       'Content-Type': 'application/json'
     }
   };
   const res = await axios.post('/map/add-saved-monster', monster, config);
   dispatch({
     type: UPDATE_SAVED_MONSTERS,
     payload: res.data
   });
  } catch (error) {
    console.log(error);
  }
 }

 export const deleteSavedPlayer = id => async dispatch => {
  try {
  const res = await axios.delete(`/map/saved-player/${id}`);
   dispatch({
    type: UPDATE_SAVED_PLAYERS,
    payload: res.data
  });
  } catch (err) {
    console.log(err);
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
   const res = await axios.post('/map/size', body, config);
  //  await dispatch({
  //     type: LOAD_PLAYERS,
  //     payload: res.data
  //   });
  } catch (err) {
    console.log(err); 
  }
}

export const setHp = (newHitPoints) => async dispatch => {
   const config = {headers: {'Content-Type': 'application/json' } };
   const body = JSON.stringify(newHitPoints);
   try {
    await axios.post('/map/hit-points', body, config);
     await dispatch({
        type: LOAD_HITPOINTS,
        payload: newHitPoints
      }); 
   } catch (err) {
     console.log(err); 
 }
}