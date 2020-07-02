import React, { useEffect, useState } from "react";
import Item from "./Item";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SavedPlayers from "./SavedPlayers";
import SavedMonsters from "./SavedMonsters";
import SavedMaps from "./SavedMaps";
import io from "socket.io-client";
import { Chatbox } from "./Chatbox";
import ChatInput from "./ChatInput";
import HitPoints from "./HitPoints";
import Alert from "./Alert";
import AddPlayerDialog from "./AddPlayerDialog"
import SavedEvents from "./SavedEvents"
import Event from "./Event"

import {
  getMap,
  getPlayers,
  addPlayer,
  syncMap,
  syncPlayers,
  sendMessage,
  syncMessage,
  syncAlert,
  syncEvent,
} from "../actions/players";
import { getSavedEvents,  getEvents } from "../actions/event";

const Map = ({
  players,
  getPlayers,
  map,
  getMap,
  syncMap,
  syncPlayers,
  chatbox,
  sendMessage,
  syncMessage,
  syncAlert,
  hitPoints,
  getEvents,
  event,
  syncEvent,
}) => {
  const [formOpen, setFormOpen] = useState(false)
  const [playerToEdit, setPlayerToEdit] = useState()
  const [edit, setEdit] = useState(false)
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
      if (data.action === "events") {
        syncEvent(data);
      }
    });
  }, []);

  const openEdit = (player) => {
    setEdit(true)
    setPlayerToEdit(player);
    setFormOpen(true);
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

  useEffect(() => {
    if(map.name){
      const mapName = map.name
      getEvents(mapName)
    }
  }, [map]);

  return (
    <div style={{ position: "relative", height: "1200px", width: "1200px" }}>
      <AddPlayerDialog edit={edit} playerToEdit={playerToEdit} setFormOpen={setFormOpen} formOpen={formOpen}  openEdit={openEdit} />
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

        <SavedPlayers setFormOpen={setFormOpen} setEdit={setEdit} />
        <SavedMaps />
        <SavedEvents  events={event} />
        <div>
          <a href="http://dzietz.com/" target="_blank">
            <button type="button" className="btn btn-info">
              {" "}
              Refrences
            </button>
          </a>
        </div>
        <SavedMonsters />
        <HitPoints players={players} hitPoints={hitPoints} />
        <Chatbox
          messages={chatbox}
          chatsOpen={chatsOpen}
          chatName={chatName}
          sendMessage={sendMessage}
          setChatsOpen={setChatsOpen}
        />
      </div>
      {event &&
        event.map((e) => {
          return (
            <Event
              key={e.eventId}
              event={e}
              events={event}
            />
          );
        })} 
      {players &&
        players.map((p) => {
          return (
            <Item
              openChat={openChat}
              openEdit={openEdit}
              key={p.playerId}
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
  getPlayers: PropTypes.func.isRequired,
  addPlayer: PropTypes.func.isRequired,
  syncMap: PropTypes.func.isRequired,
  syncPlayers: PropTypes.func.isRequired,
  chatbox: PropTypes.array.isRequired,
  sendMessage: PropTypes.func.isRequired,
  syncMessage: PropTypes.func.isRequired,
  hitPoints: PropTypes.array.isRequired,
  syncAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  players: state.players,
  map: state.map,
  savedMaps: state.savedMaps,
  chatbox: state.chatbox,
  hitPoints: state.hitPoints,
  event: state.event,
});

export default connect(mapStateToProps, {
  getMap,
  getPlayers,
  addPlayer,
  syncMap,
  syncPlayers,
  sendMessage,
  syncMessage,
  syncAlert,
  getEvents,
  syncEvent,
})(Map);
