import React, { useEffect, useState } from "react";
import Item from "./Item";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { SavedPlayers } from "./SavedPlayers";
import { SavedMaps } from "./SavedMaps";
import openSocket from 'socket.io-client';
import { Chatbox } from './Chatbox';
import { PORT } from '../../../server';

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
  syncMap,
  syncPlayers,
  sendMessage,
  syncMessage
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
  deleteSavedPlayer,
  syncMap,
  syncPlayers,
  chatbox,
  sendMessage,
  syncMessage
}) => {

  const [editedPlayer, setEditedPlayer] = useState({});
  const [openPlayerEdit, setOpenPlayerEdit] = useState(false);
  const [chatsOpen, setChatsOpen] = useState(false);
  const [chatName, setChatName] = useState('');

  useEffect(() => {

    const socket = openSocket(`http://localhost:${PORT}`);
     socket.on('maps', data => {
       if (data.action === 'create') {
         syncMap(data)
       };
       if (data.action === 'players') {
           syncPlayers(data)
       };
       if (data.action === 'message') {
        syncMessage(data)
    };
  } )
      },[])


const openEdit = (player) => {
  setEditedPlayer(player);
setOpenPlayerEdit(true);
}

const openChat = (name) => {
setChatName(name);
setChatsOpen(true);
};

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
      <Chatbox messages={chatbox} chatsOpen={chatsOpen}  chatName={chatName} sendMessage={sendMessage} setChatsOpen={setChatsOpen} />
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
            openChat={openChat}
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
  syncMap: PropTypes.func.isRequired,
  syncPlayers: PropTypes.func.isRequired,
  chatbox: PropTypes.array.isRequired,
  sendMessage: PropTypes.func.isRequired,
  syncMessage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  players: state.players,
  savedPlayers: state.savedPlayers,
  map: state.map,
  savedMaps: state.savedMaps,
  chatbox: state.chatbox
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
  syncMap,
  syncPlayers,
  sendMessage,
  syncMessage
})(Map);
