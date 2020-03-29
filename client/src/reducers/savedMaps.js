import { UPDATE_SAVED_MAPS } from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case UPDATE_SAVED_MAPS:
      return [...payload];
      default:
        return state;
  }
}