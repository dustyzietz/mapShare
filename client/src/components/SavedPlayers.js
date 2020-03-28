import React,{useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {AddPlayerDialog} from './AddPlayerDialog';

export  const SavedPlayers = ({addPlayer, savedPlayers, getSavedPlayers, addSavedPlayer}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    getSavedPlayers();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const makePlayer = (player) => {
    addPlayer(player);
    setOpen(false);
  };

  return (
    <div>
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
            <button className="btn" style={{float:'right'}} onClick={handleClose}>cancel</button>
<h2>Saved Characters</h2>
{savedPlayers && 
savedPlayers.map(p => {
      const  player = { name: p.name , url: p.url, hp: p.hp, ac: p.ac, attacks: p.attacks, spells: p.spells, items: p.items };
  return (
  <div key={p.name} onClick={() => {makePlayer(player)}} className="savedPlayersContainer" >
  <div
    className="box">
    <img draggable="false" src={p.url} alt="" width='100px' height='auto'/>
  </div> 
  <p>{p.name}</p>
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
