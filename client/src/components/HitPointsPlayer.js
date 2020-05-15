import React, { useState, useEffect } from 'react';
import IconButton from "@material-ui/core/IconButton";
import Send from "@material-ui/icons/Send";
import {editPlayer} from "../actions/players";
import PropTypes from "prop-types";
import { connect } from "react-redux";




 const HitPointsPlayer = ({players, p, editPlayer}) => { 
   const [initialHp, setInitialHp] = useState(p.currentHp);
  const [currentHp, setCurrentHp] = useState(p.currentHp);

 
useEffect(()=> {
const newPlayer = players.filter(player => {
  return player._id === p._id
})
const newHp = newPlayer[0].currentHp;
setCurrentHp(newHp);
setInitialHp(newHp);
},[players]);

  const handleChange = (e) => {
    setCurrentHp(e.target.value);
  }

  const handleSubmit = (e) => {
e.preventDefault();
p = {...p, currentHp: currentHp};
editPlayer(p);
  }

  
  return (
          <form onSubmit={handleSubmit} className='hp-line'  style={{ display:'flex'}}>
             <span >{p.name } : </span> 
             <span style={{ flexGrow: '1'}}>{ initialHp} </span> 
             {  
           currentHp !== p.currentHp &&
            <IconButton type='submit' size='small' >
              <Send style={{color:'white'}} />
            </IconButton>}
             <input className='hp-input' type="number" value={currentHp} onChange={handleChange} />
             </form>
  )
}

HitPointsPlayer.propTypes = {
  editPlayer: PropTypes.func.isRequired,
 };
 
 
 
 export default connect(null, {
   editPlayer
 })(HitPointsPlayer);