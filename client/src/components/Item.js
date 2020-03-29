import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
//import axios from 'axios';
import { updatePosition, deletePlayer, updateSize } from "../actions/players";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PlayerStats from "./PlayerStats";

const Item = ({ player, players, deletePlayer, updateSize }) => {
  const { controlledPosition, size, _id, name, playerUrl } = player;
  const [myPosition, setMyPosition] = useState({
    x: controlledPosition.x,
    y: controlledPosition.y
  });
  const [loading, setLoading] = useState(false);
  const [mySize, setMySize] = useState(size);

  const onControlledDrag = (e, position) => {
    const { x, y } = position;
    setMyPosition({ x, y });
  };

  const onControlledDragStop = (e, position) => {
    setLoading(true);
    onControlledDrag(e, position);
  };

  const handleDelete = () => {
    deletePlayer(_id);
  };

  const handleGrow = () => {
    const newSize = mySize + 1;
    setMySize(newSize);
    updateSize(newSize, _id);
  };

  const handleShrink = () => {
    const newSize = mySize - 1;
    setMySize(newSize);
    updateSize(newSize, _id);
  };

  useEffect(() => {
    players.map(p => {
      if (p._id === _id) {
        if (p.size !== mySize) {
          setMySize(p.size);
        }
        if (myPosition.x === p.controlledPosition.x) {
          setLoading(false);
        } else {
          if (!loading) {
            setMyPosition(p.controlledPosition);
          }
        }
      }
    });
  }, [players]);

  useEffect(() => {
    const x = myPosition.x;
    const y = myPosition.y;
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
            style={{ width: `${mySize * 10}px`}}
            className="playerImg"
          />
          <PlayerStats
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
  updateSize: PropTypes.func
};

const mapStateToProps = state => ({
  players: state.players
});

export default connect(mapStateToProps, {
  updatePosition,
  deletePlayer,
  updateSize
})(Item);
