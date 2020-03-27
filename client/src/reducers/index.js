import {combineReducers } from 'redux';
import players from './players';
import savedPlayers from './savedPlayers';

export default combineReducers({
  players,
  savedPlayers
});