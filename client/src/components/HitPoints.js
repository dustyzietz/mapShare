import React, {useState, useEffect} from "react";
import  HitPointsPlayer  from "./HitPointsPlayer";

const HitPoints = ({ players }) => {
  const [editing, setEditing] = useState(false);
 const [shuffled, setShuffled] = useState([]);
 

 useEffect(()=> {
if(shuffled.length == 0) {setShuffled(players);} 
 },[players]);


  return (
    <div className='hit-points' style={{ backgroundColor: "black", color: "white" }}>
     HIT POINTS <button onClick={handleInitiative} >Initiative</button>
      { shuffled &&
        shuffled.map((p) =>{
        return (
       <HitPointsPlayer key={p._id} p={p} editing={editing} players={players} />
      )
      }
      )}
    </div>
  );
};

export default HitPoints;
