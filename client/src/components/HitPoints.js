import React from 'react';



 const HitPoints = ({players}) => {

 
  return (
    <div style={{backgroundColor:'black', color:'white'}}>
       HIT POINTS 
       {players.map((p,i) => (
         <div key={i}>
           {` ${p.name}: ${p.currentHp} `}
         </div>
       )
       )}  
    </div>
  )
}


export default HitPoints;
