import React, { useEffect } from "react";
import Item from "./Item";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPlayers, addPlayer, getSavedPlayers, addSavedPlayer, addMap, getMap } from "../actions/players";
import {SavedPlayers} from "./SavedPlayers";
import PlayerStats from './PlayerStats';
import { AddMap } from "./AddMap";

const Map = ({ players, getPlayers, addPlayer, savedPlayers, getSavedPlayers, addSavedPlayer, addMap, map, getMap }) => {


  useEffect(() => {
    setInterval(  function() {
      getMap();
         getPlayers();
    }, 5000);
  }, []);

 
  useEffect(() => {
    async function loadPlayers() {
      getMap();
      await getPlayers();
    }
    loadPlayers();
  }, []);

  return (
    <div className='mapContainer'>
 
      <img
      draggable='false'
        className="map "
        src={map.url}
        alt="map"
      /> 
      <div className='statContainer'>
         <SavedPlayers getSavedPlayers={getSavedPlayers} addPlayer={addPlayer} savedPlayers={savedPlayers}  addSavedPlayer={addSavedPlayer}/>
         <AddMap addMap={addMap} />
        {players &&
        players.map(p => {
          return (   
             <PlayerStats key={p._id} player={p } />
          );
        })
        }</div>
      {players &&
        players.map(p => {
          return (  
            <Item
              key={p.name}
              name={p.name}
              url={p.playerUrl}
              id={p._id}
              pos={p.controlledPosition}
            />
          );
        })}
    </div>
  );
};

Map.propTypes = {
  players: PropTypes.array,
  savedPlayers: PropTypes.array,
  getPlayers: PropTypes.func.isRequired,
  addPlayer: PropTypes.func.isRequired,
  getSavedPlayers:PropTypes.func.isRequired,
  addSavedPlayer: PropTypes.func.isRequired,
  addMap: PropTypes.func.isRequired,
  getMap: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  players: state.players,
  savedPlayers: state.savedPlayers,
  map: state.map,
});

export default connect(mapStateToProps, { getPlayers, addPlayer, getSavedPlayers, addSavedPlayer, addMap, getMap })(Map);
