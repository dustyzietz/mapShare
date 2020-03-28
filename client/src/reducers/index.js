import {combineReducers } from 'redux';
import players from './players';
import savedPlayers from './savedPlayers';
import map from './map';

export default combineReducers({
  players,
  savedPlayers,
  map
});