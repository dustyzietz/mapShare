import React, { useEffect, useState } from "react";
import Item from "./Item";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPlayers, addPlayer } from "./actions/players";
import {AddPlayerDialog} from "./AddPlayerDialog";




const Map = ({ players, getPlayers, addPlayer }) => {

  const [activeDrags, setActiveDrags] = useState(0);

  useEffect(() => {
    setInterval(function() {
     if(activeDrags === 0){
        getPlayers();
     } 
    }, 3000);
  }, []);

 
  useEffect(() => {
    async function loadPlayers() {
      await getPlayers();
    }
    loadPlayers();
  }, []);

  return (
    <div className='mapContainer'>
  <AddPlayerDialog addPlayer={addPlayer}/>
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
              pos={p.controlledPosition}
            />
          );
        })}
    </div>
  );
};

Map.propTypes = {
  players: PropTypes.array,
  getPlayers: PropTypes.func.isRequired,
  addPlayer: PropTypes.func.isRequired

};

const mapStateToProps = state => ({
  players: state.players
});

export default connect(mapStateToProps, { getPlayers, addPlayer })(Map);
