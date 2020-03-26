import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
//import axios from 'axios';
import { updatePosition, getPlayers } from "./actions/players";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Item = ({ updatePosition, getPlayers, name, url, pos, players, setActiveDrags, activeDrags }) => {
  // state = {
  //   activeDrags: 0,
  //   deltaPosition: {
  //     x: 0, y: 0
  //   },
  //   controlledPosition: {
  //     x: 400, y: 200
  //   }
  // };
 // const [activeDrags, setActiveDrags] = useState(0);
 // const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 });
  const [controlledPosition, setControlledPosition] = useState({
    x: pos.x,
    y: pos.y
  });

  // const handleDrag = (e, ui) => {
  //   const { x, y } = deltaPosition;
  //   setDeltaPosition({
  //     x: x + ui.deltaX,
  //     y: y + ui.deltaY
  //   });
  // };

  const onStart = () => {
    setActiveDrags(activeDrags + 1);
  };

  const onStop = () => {
    setActiveDrags(activeDrags - 1);
  };

  // For controlled component
  // const adjustXPos = e => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   const { x, y } = controlledPosition;
  //   setControlledPosition({ x: x - 10, y });
  // };

  // const adjustYPos = e => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   const { x, y } = controlledPosition;
  //   setControlledPosition({ controlledPosition: { x, y: y - 10 } });
  // };

  const onControlledDrag = (e, position) => {
    const { x, y } = position;
    setControlledPosition({ x, y });
  };

  const onControlledDragStop = (e, position) => {
    onControlledDrag(e, position);
    onStop();
  };

  useEffect(() => {
     players.map(p => {
       if (p.name == name) {
          if( controlledPosition.x !== p.controlledPosition.x){
             setControlledPosition(p.controlledPosition); }
          }
     })
  },[players]);

  useEffect(() => {
   const player = players.find(p => p.name === name );
  {
    // console.log(player);
     // function postPosition() {
      const x = controlledPosition.x;
      const y = controlledPosition.y;
      updatePosition(name, x, y);
      console.log(x, y);
    }
   // postPosition();
  // }
  }, [controlledPosition]);
  const dragHandlers = { onStart: onStart, onStop: onStop };
  return (
    <div>
      <Draggable
        position={controlledPosition}
        {...dragHandlers}
        onStop={onControlledDragStop}
      >
        <div className="container">
          <div
            className="box"
            style={{
              background: `url(${url}) no-repeat center center `,
              backgroundSize: "contain"
            }}
          ></div>
          <p>{name}</p>
        </div>
      </Draggable>
    </div>
  );
};

Item.propTypes = {
  players: PropTypes.array,
  getPlayers: PropTypes.func.isRequired,
  updatePosition: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  players: state.players
});

export default connect(mapStateToProps, { updatePosition, getPlayers })(Item);
