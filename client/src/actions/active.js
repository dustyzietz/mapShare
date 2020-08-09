import {
 LOAD_ACTIVE
} from "./types";
import axios from 'axios';

export const setActive = (num) => async dispatch => {
 const config = {headers: {'Content-Type': 'application/json' } };
 const body = JSON.stringify({activeIndex: num});
 try {
   await axios.post('/map/active', body, config);
 } catch (err) {
   console.log(err); 
 }

};

export const syncActive = (data) => async (
   dispatch
 ) => {
  console.log('syncActive')
  const { newActive } = data;
  dispatch({
    type: LOAD_ACTIVE,
    payload: newActive,
  });
 };
