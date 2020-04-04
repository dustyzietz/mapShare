import {  ADD_CHAT } from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case ADD_CHAT:
      return [payload, ...state];
      default:
        return state;
  }
}