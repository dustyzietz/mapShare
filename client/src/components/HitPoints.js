import React, {useState, useEffect} from "react";
import  HitPointsPlayer  from "./HitPointsPlayer";
import { editAllPlayers, editPlayer } from '../actions/players';
import { connect } from "react-redux";

const HitPoints = ({ players, editAllPlayers }) => {
  const [editing, setEditing] = useState(false);
 const [shuffled, setShuffled] = useState([]);
 

 useEffect(()=> {
if(shuffled.length == 0) {setShuffled(players);} 
 },[players]);

  const handleInitiative = () => {
    let array = players;
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
  
      // swap elements array[i] and array[j]
      // we use "destructuring assignment" syntax to achieve that
      // you'll find more details about that syntax in later chapters
      // same can be written as:
      // let t = array[i]; array[i] = array[j]; array[j] = t
      [array[i], array[j]] = [array[j], array[i]];
    }
    editAllPlayers(array);
    
  }
 


  return (
    <div className='hit-points' style={{ backgroundColor: "black", color: "white" }}>
     HIT POINTS <button 
    onClick={handleInitiative}
      >Initiative</button>
      { players &&
        players.map((p) =>{
        return (
       <HitPointsPlayer key={p._id} p={p} editing={editing} players={players} />
      )
      }
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  players: state.players
});

export default connect(mapStateToProps, {
  editAllPlayers
})(HitPoints);

