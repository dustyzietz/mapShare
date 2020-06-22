import React, { useEffect, useState } from "react";
import Item from "./Item";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { SavedPlayers } from "./SavedPlayers";
import { SavedMonsters } from "./SavedMonsters";

import SavedMaps from "./SavedMaps";
import io from "socket.io-client";
import { Chatbox } from "./Chatbox";
import ChatInput from "./ChatInput";
import HitPoints from "./HitPoints";
import Alert from "./Alert";

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
  syncAlert,
  getSavedMonsters,
  addSavedMonster,
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
  syncAlert,
  getSavedMonsters,
  addSavedMonster,
  savedMonsters,
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
      if (data.action === "alert") {
        syncAlert(data);
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
    <div style={{ position: "relative", height: "1200px", width: "1200px" }}>
      <EditPlayer
        open={openPlayerEdit}
        editedPlayer={editedPlayer}
        setOpen={setOpenPlayerEdit}
      />
      <img
        draggable="false"
        src={map.url}
        alt="map"
        style={{ height: "1200px" }}
      />
      <Alert />
      <div
        className="main-buttons"
        style={{ position: "fixed", top: "0", left: "20px" }}
      >
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
        <div>
          <a href="http://dzietz.com/" target="_blank">
            <button type="button" className="btn btn-info">
              {" "}
              Refrences
            </button>
          </a>
        </div>
        <SavedMonsters
          getSavedPlayers={getSavedPlayers}
          addPlayer={addPlayer}
          savedPlayers={savedPlayers}
          addSavedPlayer={addSavedPlayer}
          deleteSavedPlayer={deleteSavedPlayer}
        />
        <HitPoints players={players} hitPoints={hitPoints} />
        <Chatbox
          messages={chatbox}
          chatsOpen={chatsOpen}
          chatName={chatName}
          sendMessage={sendMessage}
          setChatsOpen={setChatsOpen}
        />
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
  hitPoints: PropTypes.array.isRequired,
  syncAlert: PropTypes.func.isRequired,
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
  syncAlert,
})(Map);
