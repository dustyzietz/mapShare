import React,{useState, useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

export  const PlayerPage = ({ openOne, setOpenOne, currentPlayer }) => {
 
  const handleClose = () => {
    setOpenOne(false);
  };
return (   
      <Dialog maxWidth='md' fullWidth open={openOne} onClose={handleClose} aria-labelledby="form-dialog-title" style={{zIndex:'1'}}>
        
       { currentPlayer &&
       <div >
 <h2 style={{textAlign:'center'}}>  {currentPlayer.name} </h2>
 {console.log(currentPlayer)}
<img alt="player image" src={currentPlayer.url} width='50%' style={{float:'left', margin:'20px'}}/>
HP:{currentPlayer.hp}<br/>
AC:{currentPlayer.ac}<br/>
Speed:{currentPlayer.speed}<br/>
Attacks:{currentPlayer.attacks}<br/>
Spells/Abilities:{currentPlayer.spells}<br/>
Skills:{currentPlayer.skills}<br/>
Items:{currentPlayer.Items}<br/>


 </div>
       } 
      </Dialog>
  )
}



