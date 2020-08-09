import {  LOAD_ACTIVE } from '../actions/types';

const initialState = 0;

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case LOAD_ACTIVE:
      return payload;
      default:
        return state;
  }
}