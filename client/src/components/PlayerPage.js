import React from 'react';
import Dialog from '@material-ui/core/Dialog';



export  const PlayerPage = ({ openOne, setOpenOne, currentPlayer, addPlayer, setOpen }) => {
 
  const handleClose = () => {
    setOpenOne(false);
  };

  const addToMap = () => {
    addPlayer(currentPlayer);
    setOpenOne(false);
    setOpen(false);
  }
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
<button style={{marginBottom:'25px'}} className='btn' onClick={addToMap} >Add To Map</button><br/>
<button className='btn' onClick={()=> {setOpenOne(false)}} >Cancel</button>

 </div>
       } 
      </Dialog>
  )
}



