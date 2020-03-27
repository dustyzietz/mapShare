import React, { useEffect, useState } from "react";
import Item from "./Item";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPlayers, addPlayer, getSavedPlayers, addSavedPlayer } from "../actions/players";
import {SavedPlayers} from "./SavedPlayers";





const Map = ({ players, getPlayers, addPlayer, savedPlayers, getSavedPlayers, addSavedPlayer }) => {

  const [activeDrags, setActiveDrags] = useState(0);

  useEffect(() => {
    setInterval(function() {
   //  if(activeDrags === 0){
        getPlayers();
   //  } 
    }, 5000);
  }, []);

 
  useEffect(() => {
    async function loadPlayers() {
      await getPlayers();
    }
    loadPlayers();
  }, []);

  return (
    <div className='mapContainer'>
  <SavedPlayers getSavedPlayers={getSavedPlayers} addPlayer={addPlayer} savedPlayers={savedPlayers}  addSavedPlayer={addSavedPlayer}/>
      <img
        className="map "
        src="https://i.pinimg.com/736x/9f/ec/db/9fecdba47cfcda751e4eadce08ff95a7.jpg" 
        alt="map"
      />
      {players &&
        players.map(p => {
          return (
            <Item
            activeDrags={activeDrags}
            setActiveDrags={setActiveDrags}
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
  addSavedPlayer: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  players: state.players,
  savedPlayers: state.savedPlayers
});

export default connect(mapStateToProps, { getPlayers, addPlayer, getSavedPlayers, addSavedPlayer })(Map);
