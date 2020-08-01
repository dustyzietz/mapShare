
import axios from 'axios';
import { LOAD_SAVED_EVENTS, LOAD_EVENTS } from './types';

export const addEvent = (event, mapName)  => async(dispatch) => {
  const config = {headers: {'Content-Type': 'application/json' } };
  const body = JSON.stringify({event, mapName});
  try {
    await axios.post('/map/add-event', body, config);
  } catch (err) {
    console.log(err); 
  }
};

export const editEvent = (event, mapName)  => async(dispatch) => {
  const config = {headers: {'Content-Type': 'application/json' } };
  const body = JSON.stringify({event, mapName});
  try {
    await axios.post('/map/edit-event', body, config);
  } catch (err) {
    console.log(err); 
  }
};

export const deleteEvent = (eventId, mapName) => async (dispatch) => {
  try {
    const res = await axios.delete(`/map/event/${eventId}/${mapName}`);
  } catch (err) {
    console.log(err);
  }
};

export const getSavedEvents = () => async(dispatch) => {
  try {
 const res = await axios.get('/map/get-saved-events');
 dispatch({
  type: LOAD_SAVED_EVENTS,
  payload: res.data,
});
  } catch (err) {
    console.log(err); 
  }
};

export const addSavedEvent = (event)  =>  async (dispatch)=> {
    console.log('Event ', event)
  const config = {headers: {'Content-Type': 'application/json' } };
  const body = JSON.stringify(event);
  try {
 const res = await axios.post('/map/add-saved-event', body, config);
 dispatch({
    type: LOAD_SAVED_EVENTS,
    payload: res.data,
  });
  } catch (err) {
    console.log(err); 
  }
};

export const deleteSavedEvent = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/map/saved-event/${id}`);
    dispatch({
      type: LOAD_SAVED_EVENTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getEvents = (mapName) => async(dispatch) => {
  const config = {headers: {'Content-Type': 'application/json' } };
  const body = JSON.stringify({mapName});
  try {
 const res = await axios.post('/map/get-events', body, config);
  dispatch({
   type: LOAD_EVENTS,
   payload: res.data,
 });
  } catch (err) {
    console.log(err); 
  }
};