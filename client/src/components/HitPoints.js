import React, {useState, useEffect} from "react";
import  HitPointsPlayer  from "./HitPointsPlayer";
import { editAllPlayers, editPlayer } from '../actions/players';
import { connect } from "react-redux";
import { setAlert } from "../actions/alert";
import IconButton from "@material-ui/core/IconButton";
import Minimize from "@material-ui/icons/Minimize";

const HitPoints = ({ players, editAllPlayers, setAlert }) => {
 const [shuffled, setShuffled] = useState([]);
 const [active, setActive] = useState()
 const [open, setOpen] = useState(true)
 
 useEffect(()=> {
   if (active === players.length){setActive(0)}
   if(players[active]){
     let message = `${players[active].name}'s Turn`
  setAlert(message, "indigo", 5000); 
   }
 },[active])

 useEffect(()=> {
if(shuffled.length == 0) {setShuffled(players);} 
 },[players]);

  const handleInitiative = () => {
    let array = players;
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); 
      // random index from 0 to i
      // swap elements array[i] and array[j]
      // we use "destructuring assignment" syntax to achieve that
      // you'll find more details about that syntax in later chapters
      // same can be written as:
      // let t = array[i]; array[i] = array[j]; array[j] = t
      [array[i], array[j]] = [array[j], array[i]];
    }
    editAllPlayers(array);
    let message = 'Initiative Rolled!'
    setAlert(message, "indigo", 2000);
    setActive(0)
  }
 
  return (
      <>
        {open ?
    <div className="card text-white bg-primary mb-3" >
  <div className="card-header">HIT POINTS <button 
  className="btn btn-light ml-5" 
     onClick={handleInitiative}
       >Initiative</button>
       <IconButton  onClick={()=>{setOpen(!open)}} size="small" style={{float:'right'}}>
            <Minimize />
          </IconButton>
            </div>
  <div className="card-body">
    <div className="card-text">
    { players &&
         players.map((p, i) =>{
         return (
           <div key={p.playerId} style={{display:'flex'}} >
        <HitPointsPlayer  p={p} players={players} setActive={setActive} />
        {i === active && <button className='btn btn-success' style={{height:'1.5rem',padding:'0 0.5rem'}} onClick={()=>{setActive(active + 1)}} >Next</button> }
      </div>
       )
       }
         )}
      </div>
  </div>
</div>
 :
 <IconButton onClick={()=>{setOpen(!open)}} size="small" style={{background:'#3E3F3A', opacity:'.5'}}>
 <Minimize />
</IconButton>
 } 
 </>
  );
};

const mapStateToProps = (state) => ({
  players: state.players
});

export default connect(mapStateToProps, {
  editAllPlayers,
  setAlert
})(HitPoints);

