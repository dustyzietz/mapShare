import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { updatePosition, deletePlayer, updateSize, sendMessage, editSavedPlayer } from "../actions/players";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PlayerStats from "./PlayerStats";


const Item = ({ player, players, deletePlayer, updateSize, updatePosition, openEdit, openChat, sendMessage, editSavedPlayer }) => {
  const { controlledPosition, size, _id, name, playerUrl } = player;
  const [myPosition, setMyPosition] = useState({
    x: controlledPosition.x,
    y: controlledPosition.y
  });
  const [loading, setLoading] = useState(false);
 
  const onControlledDrag = (e, position) => {
    const { x, y } = position;
    setMyPosition({ x, y });
  };

  const onControlledDragStop = (e, position) => {
    onControlledDrag(e, position);
  };

  const handleDelete = () => {
    deletePlayer(_id);
  };

  const handleGrow = () => {
    const newSize = size + 1;
    updateSize(newSize, _id);
  };

  const handleShrink = () => {
    const newSize = size - 1;
    updateSize(newSize, _id);
  };

  useEffect(() => {
    players.map(p => {
      if (p._id === _id) {
        if (loading && myPosition.x === p.controlledPosition.x){
        setLoading(false);
        }
        if (!loading && myPosition.x !== p.controlledPosition.x) {
         setMyPosition(p.controlledPosition);
        } 
      }
    });
  }, [players]);

  useEffect(() => {
    const x = myPosition.x;
    const y = myPosition.y;
    setLoading(true);
    updatePosition(name, x, y, _id);
    console.log(x, y);
  }, [myPosition]);
  return (
    <div>
      <Draggable position={myPosition} onStop={onControlledDragStop}>
        <div className="container">
          <img
            draggable="false"
            src={playerUrl}
            alt=""
            style={{ width: `${size * 5}px`}}
            className="playerImg"
          />
          <PlayerStats
          editSavedPlayer={editSavedPlayer}
          sendMessage={sendMessage}
          openChat={openChat}
            openEdit={openEdit}
            handleGrow={handleGrow}
            handleShrink={handleShrink}
            handleDelete={handleDelete}
            key={_id}
            player={player}
          />
        </div>
      </Draggable>
    </div>
  );
};

Item.propTypes = {
  players: PropTypes.array,
  updatePosition: PropTypes.func,
  deletePlayer: PropTypes.func,
  updateSize: PropTypes.func,
  sendMessage: PropTypes.func.isRequired,
  editSavedPlayer: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  players: state.players
});

export default connect(mapStateToProps, {
  updatePosition,
  deletePlayer,
  updateSize,
  sendMessage,
  editSavedPlayer
})(Item);
