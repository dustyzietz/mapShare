import {  LOAD_MAP } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case LOAD_MAP:
      return {...payload};
      default:
        return state;
  }
}