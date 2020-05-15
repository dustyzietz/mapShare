import React, { useEffect, useState } from "react";
import Item from "./Item";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { SavedPlayers } from "./SavedPlayers";
import { SavedMonsters } from "./SavedMonsters";

import  SavedMaps  from "./SavedMaps";
import io from "socket.io-client";
import { Chatbox } from "./Chatbox";
import { ChatInput } from "./ChatInput";
import HitPoints from "./HitPoints";

import {
  getMap,
  getPlayers,
  addPlayer,
  getSavedPlayers,
  addSavedPlayer,
  deleteSavedPlayer,
  syncMap,
  syncPlayers,
  sendMessage,
  syncMessage,
  getSavedMonsters,
  addSavedMonster,
  syncHitPoints,
} from "../actions/players";
import EditPlayer from "./EditPlayer";

const Map = ({
  players,
  getPlayers,
  addPlayer,
  savedPlayers,
  getSavedPlayers,
  addSavedPlayer,
  map,
  getMap,
  deleteSavedPlayer,
  syncMap,
  syncPlayers,
  chatbox,
  sendMessage,
  syncMessage,
  getSavedMonsters,
  addSavedMonster,
  savedMonsters,
  syncHitPoints,
  hitPoints,
}) => {
  const [editedPlayer, setEditedPlayer] = useState({});
  const [openPlayerEdit, setOpenPlayerEdit] = useState(false);
  const [chatsOpen, setChatsOpen] = useState(false);
  const [chatName, setChatName] = useState("");

  useEffect(() => {
    const socket = io.connect();
    socket.on("maps", (data) => {
      if (data.action === "create") {
        syncMap(data);
      }
      if (data.action === "players") {
        syncPlayers(data);
      }
      if (data.action === "message") {
        syncMessage(data); 
      }
      if (data.action === "hit points") {
        syncHitPoints(data);
      }
    });
  }, []);

  const openEdit = (player) => {
    setEditedPlayer(player);
    setOpenPlayerEdit(true);
  };

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
      <EditPlayer
        open={openPlayerEdit}
        editedPlayer={editedPlayer}
        setOpen={setOpenPlayerEdit}
      />
      <img draggable="false" className="map " src={map.url} alt="map" />
      <div className="statContainer">
        <Chatbox
          messages={chatbox}
          chatsOpen={chatsOpen}
          chatName={chatName}
          sendMessage={sendMessage}
          setChatsOpen={setChatsOpen}
        />
        <ChatInput
          sendMessage={sendMessage}
          chatsOpen={chatsOpen}
          chatName={chatName}
          setChatsOpen={setChatsOpen}
        />

        <SavedPlayers
          getSavedPlayers={getSavedPlayers}
          addPlayer={addPlayer}
          savedPlayers={savedPlayers}
          addSavedPlayer={addSavedPlayer}
          deleteSavedPlayer={deleteSavedPlayer}
        />
        <SavedMaps />
        <a href="http://dzietz.com/" target="_blank">
          {" "}
          <button className="btn" style={{ marginBottom: "20px" }}>
            Refrences
          </button>
        </a>
        <SavedMonsters
          getSavedMonsters={getSavedMonsters}
          addSavedMonster={addSavedMonster}
          savedMonsters={savedMonsters}
          addPlayer={addPlayer}
        />
        <HitPoints players={players} hitPoints={hitPoints} />
      </div>
      {players &&
        players.map((p) => {
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
  getPlayers: PropTypes.func.isRequired,
  addPlayer: PropTypes.func.isRequired,
  getSavedPlayers: PropTypes.func.isRequired,
  addSavedPlayer: PropTypes.func.isRequired,
  deleteSavedPlayer: PropTypes.func.isRequired,
  syncMap: PropTypes.func.isRequired,
  syncPlayers: PropTypes.func.isRequired,
  chatbox: PropTypes.array.isRequired,
  sendMessage: PropTypes.func.isRequired,
  syncMessage: PropTypes.func.isRequired,
  getSavedMonsters: PropTypes.func.isRequired,
  addSavedMonster: PropTypes.func.isRequired,
  savedMonsters: PropTypes.array.isRequired,
  syncHitPoints: PropTypes.func.isRequired,
  hitPoints: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  players: state.players,
  savedPlayers: state.savedPlayers,
  map: state.map,
  savedMaps: state.savedMaps,
  chatbox: state.chatbox,
  savedMonsters: state.savedMonsters,
  hitPoints: state.hitPoints,
});

export default connect(mapStateToProps, {
  getMap,
  getPlayers,
  addPlayer,
  getSavedPlayers,
  addSavedPlayer,
  deleteSavedPlayer,
  syncMap,
  syncPlayers,
  sendMessage,
  syncMessage,
  getSavedMonsters,
  addSavedMonster,
  syncHitPoints,
})(Map);
