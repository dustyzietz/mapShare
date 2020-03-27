import { UPDATE_SAVED_PLAYERS } from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case UPDATE_SAVED_PLAYERS:
      return [...payload];
      default:
        return state;
  }
}