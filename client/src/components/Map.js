import React, { useEffect, useState } from "react";
import Item from "./Item";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { SavedPlayers } from "./SavedPlayers";
import { SavedMaps } from "./SavedMaps";

import {
  getPlayers,
  addPlayer,
  getSavedPlayers,
  addSavedPlayer,
  addMap,
  getSavedMaps,
  getMap,
  addSavedMap,
  deleteSavedPlayer,
} from "../actions/players";
import EditPlayer from "./EditPlayer";


const Map = ({
  players,
  getPlayers,
  addPlayer,
  savedPlayers,
  getSavedPlayers,
  addSavedPlayer,
  addMap,
  map,
  getMap,
  getSavedMaps,
  addSavedMap,
  savedMaps,
  deleteSavedPlayer
}) => {

  const [editedPlayer, setEditedPlayer] = useState({});
  const [openPlayerEdit, setOpenPlayerEdit] = useState(false);

const openEdit = (player) => {
  setEditedPlayer(player);
setOpenPlayerEdit(true);
}

  useEffect(() => {
    setInterval(function() {
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
    <div className="mapContainer">
      <EditPlayer open={openPlayerEdit} editedPlayer={editedPlayer} setOpen={setOpenPlayerEdit} />
      <img draggable="false" className="map " src={map.url} alt="map" />
      <div className="statContainer">
        <SavedPlayers
          getSavedPlayers={getSavedPlayers}
          addPlayer={addPlayer}
          savedPlayers={savedPlayers}
          addSavedPlayer={addSavedPlayer}
          deleteSavedPlayer={deleteSavedPlayer}
        />
        <SavedMaps
          addSavedMap={addSavedMap}
          getSavedMaps={getSavedMaps}
          addMap={addMap}
          savedMaps={savedMaps  }
        />
      </div>
      {players &&
        players.map(p => {
          return (
            <Item
            openEdit={openEdit}
              key={p._id}
             player={p}
             players={players}
            />
          );
        })}
    </div>
  );
};

Map.propTypes = {
  players: PropTypes.array,
  savedPlayers: PropTypes.array,
  savedMaps: PropTypes.array,
  getPlayers: PropTypes.func.isRequired,
  addPlayer: PropTypes.func.isRequired,
  getSavedPlayers: PropTypes.func.isRequired,
  addSavedPlayer: PropTypes.func.isRequired,
  addMap: PropTypes.func.isRequired,
  getMap: PropTypes.func.isRequired,
  getSavedMaps: PropTypes.func.isRequired,
  addSavedMap: PropTypes.func.isRequired,
  deleteSavedPlayer: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  players: state.players,
  savedPlayers: state.savedPlayers,
  map: state.map,
  savedMaps: state.savedMaps
});

export default connect(mapStateToProps, {
  getPlayers,
  addPlayer,
  getSavedPlayers,
  addSavedPlayer,
  addMap,
  getMap,
  getSavedMaps,
  addSavedMap,
  deleteSavedPlayer,
})(Map);
