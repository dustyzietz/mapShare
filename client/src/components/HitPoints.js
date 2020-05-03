import React, {useState} from "react";
import  HitPointsPlayer  from "./HitPointsPlayer";

const HitPoints = ({ players }) => {
  const [editing, setEditing] = useState(false);
 

  return (
    <div className='hit-points' style={{ backgroundColor: "black", color: "white" }}>
     HIT POINTS 
      {players.map((p, i) =>{
        return (
       <HitPointsPlayer key={i} p={p} editing={editing} players={players} />
      )
      }
      )}
    </div>
  );
};

export default HitPoints;
