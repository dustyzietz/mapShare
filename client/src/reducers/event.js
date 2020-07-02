import { LOAD_EVENTS } from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case LOAD_EVENTS:
      return payload;
      default:
        return state;
  }
}