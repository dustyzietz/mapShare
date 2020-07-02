import {combineReducers } from 'redux';
import players from './players';
import savedPlayers from './savedPlayers';
import savedMaps from './savedMaps';
import map from './map';
import chatbox from './chatbox';
import savedMonsters from './savedMonsters';
import hitPoints from './hitPoints';
import alert from './alert';
import event from './event';
import savedEvents from './savedEvents'


export default combineReducers({
  event,
  hitPoints,
  players,
  savedPlayers,
  map,
  savedMaps,
  chatbox,
  savedMonsters,
  alert,
  savedEvents
});