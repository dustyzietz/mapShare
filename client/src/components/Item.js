import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import goblin from '../images/goblin.png'
import {
  updatePosition,
  deletePlayer,
  updateSize,
  sendMessage,
  editSavedPlayer,
  editPlayer,
} from "../actions/players";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PlayerStats from "./PlayerStats";

const Item = ({
  editPlayer,
  player,
  players,
  deletePlayer,
  updateSize,
  updatePosition,
  openEdit,
  openChat,
  sendMessage,
  editSavedPlayer,
}) => {
  const { controlledPosition, size, name, url, playerId } = player;
  const [isShown, setIsShown] = useState(false);
  const [myPosition, setMyPosition] = useState({
    x: controlledPosition.x,
    y: controlledPosition.y,
  });
  const [loading, setLoading] = useState(false);
  const [onTop, setOnTop] = useState(false);
  const [dragging, setDragging] = useState(false)

  const onControlledDrag = (e, position) => {
    const { x, y } = position;
    setMyPosition({ x, y });
  };

  const onControlledDragStop = (e, position) => {
    onControlledDrag(e, position);
    setTimeout(function(){ setDragging(false) }, 300);
  };

  const handleDelete = () => {
    deletePlayer(playerId);
  };

  const handleGrow = () => {
    const newSize = size + 1;
    updateSize(newSize, playerId);
  };

  const handleShrink = () => {
    const newSize = size - 1;
    updateSize(newSize, playerId);
  };

  const onDrag = () => {
   setDragging(true)
  }  

  useEffect(() => {
    players.map((p) => {
      if (p.playerId === playerId) {
        if (loading && myPosition.x === p.controlledPosition.x) {
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
    updatePosition(name, x, y, playerId);
    console.log(x, y);
  }, [myPosition]);
  return (
    <div
      className="item-div"
      style={{ position: "absolute", zIndex: `${onTop ? 2: 1}` }}
      onMouseLeave={()=>{setIsShown(false); setOnTop(false)}}
      >
      <Draggable
      disabled={isShown} 
       position={myPosition} onStop={onControlledDragStop} onDrag={onDrag} >
        <div  > 
          <img
            onClick={!dragging ? ()=>{setIsShown(!isShown); setOnTop(true)}: null }
            draggable="false"
            src={url}
            alt=""
            style={{ width: `${size * 5}px` }}
            className="playerImg"
          />
          {isShown && (
            <PlayerStats
              editPlayer={editPlayer}
              players={players}
              editSavedPlayer={editSavedPlayer}
              sendMessage={sendMessage}
              openChat={openChat}
              openEdit={openEdit}
              handleGrow={handleGrow}
              handleShrink={handleShrink}
              handleDelete={handleDelete}
              key={playerId}
              player={player}
            />
          )}
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
  editPlayer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  players: state.players,
});

export default connect(mapStateToProps, {
  updatePosition,
  deletePlayer,
  updateSize,
  sendMessage,
  editSavedPlayer,
  editPlayer,
})(Item);
