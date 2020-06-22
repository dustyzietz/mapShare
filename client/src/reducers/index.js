import {combineReducers } from 'redux';
import players from './players';
import savedPlayers from './savedPlayers';
import savedMaps from './savedMaps';
import map from './map';
import chatbox from './chatbox';
import savedMonsters from './savedMonsters';
import hitPoints from './hitPoints';
import alert from './alert';

export default combineReducers({
  hitPoints,
  players,
  savedPlayers,
  map,
  savedMaps,
  chatbox,
  savedMonsters,
  alert
});