import React, {useState, useEffect} from "react";
import  HitPointsPlayer  from "./HitPointsPlayer";

const HitPoints = ({ players }) => {
  const [editing, setEditing] = useState(false);
 const [shuffled, setShuffled] = useState([]);
 

 useEffect(()=> {
if(shuffled.length == 0) {setShuffled(players);} 
console.log('it ran');
console.log(shuffled);
 },[players]);

  const handleInitiative = () => {
    let array = shuffled;
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
  
      // swap elements array[i] and array[j]
      // we use "destructuring assignment" syntax to achieve that
      // you'll find more details about that syntax in later chapters
      // same can be written as:
      // let t = array[i]; array[i] = array[j]; array[j] = t
      [array[i], array[j]] = [array[j], array[i]];
    }
    setShuffled([...array]);
    
  }
 


  return (
    <div className='hit-points' style={{ backgroundColor: "black", color: "white" }}>
     HIT POINTS <button 
    onClick={handleInitiative}
      >Initiative</button>
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
