import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Send from "@material-ui/icons/Send";
import { editPlayer } from "../actions/players";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const HitPointsPlayer = ({ players, p, editPlayer, setActive, active }) => {
  const [initialHp, setInitialHp] = useState(p.currentHp);
  const [currentHp, setCurrentHp] = useState(p.currentHp);

  useEffect(() => {
    const newPlayer = players.filter((player) => {
      return player.playerId === p.playerId;
    });
    const newHp = newPlayer[0].currentHp;
    setCurrentHp(newHp);
    setInitialHp(newPlayer[0].hp);
  }, [players]);

  const handleChange = (e) => {
    setCurrentHp(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    p = { ...p, currentHp: currentHp };
    editPlayer(p);
  };

  let bar = (currentHp / p.hp) * 100;
  if(bar < 0){
    bar = 0
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="hp-line"
    >
      <span style={{width:'100px',float:'left'}}>{p.name} </span>
      <div className="progress" style={{ width: "150px",float:'left'}}>
        {bar > 50 ? (
          <div
            className="progress-bar progress-bar-striped progress-bar-animated bg-success"
            role="progressbar"
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: `${bar}%` }}
          ></div>
        ) : (
          <div
            className="progress-bar progress-bar-striped progress-bar-animated bg-danger"
            role="progressbar"
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: `${bar}%` }}
          ></div>
        )}
      </div>
      {" "}
      <div style={{float:'left'}}>
      {initialHp}
       </div>
       <div style={{float: 'right'}}>
      <input
      max={p.hp}
        className="hp-input"
        type="number"
        value={currentHp}
        onChange={handleChange}
        style={{ width: "35px"}}
      />
     {currentHp !== p.currentHp && (
        <IconButton  type="submit" size="small" style={{height:"1rem"}}>
          <Send style={{ color: "white" }} />
        </IconButton>
      )} 
       </div>
    </form>
  );
};

HitPointsPlayer.propTypes = {
  editPlayer: PropTypes.func.isRequired,
};

export default connect(null, {
  editPlayer,
})(HitPointsPlayer);
