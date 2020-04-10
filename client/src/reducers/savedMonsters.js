import { UPDATE_SAVED_MONSTERS } from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case UPDATE_SAVED_MONSTERS:
      return [...payload];
      default:
        return state;
  }
}