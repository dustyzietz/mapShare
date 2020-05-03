import React,{useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {AddPlayerDialog} from './AddPlayerDialog';
import { playerPage, PlayerPage } from './PlayerPage';
 

export  const SavedPlayers = ({addPlayer, savedPlayers, getSavedPlayers, addSavedPlayer, deleteSavedPlayer}) => {
  const [open, setOpen] = useState(false);
  const [openOne, setOpenOne] = useState(false);
  const handleClickOpen = () => {
    getSavedPlayers();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <PlayerPage openOne={openOne} setOpenOne={setOpenOne} />
        <button
      className='btn'
      onClick={handleClickOpen}
      style={{ marginBottom: '20px'}}
      >
        Add Character
      </button>
      <Dialog maxWidth='md' fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title" style={{zIndex:'1'}}>
        <DialogContent style={{textAlign: 'center'}}>
                <AddPlayerDialog addPlayer={addPlayer}  addSavedPlayer={addSavedPlayer} />
          <div>
            <button className="btn"    style={{position:'absolute',right: '25px', top: '25px'}} onClick={handleClose}>cancel</button>
<h2 style={{fontSize:'20px'}}>Saved Characters</h2>
{savedPlayers && 
savedPlayers.map(p => { 
  return (
  <div key={p.name}  className="savedPlayersContainer"  >
  <div
    className="box" onClick={() => setOpenOne(true)} >
    <img draggable="false" className='savedPlayersImg' src={p.url} alt="" width='100px' height='auto'/>
    <br/>
    {p.name}
  </div> 
</div>
  )}
)
}
</div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
