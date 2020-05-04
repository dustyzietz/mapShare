import React,{useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {AddMonster} from './AddMonster';
import { PlayerPage } from "./PlayerPage";



export  const SavedMonsters = ({addPlayer, savedMonsters, getSavedMonsters, addSavedMonster, deleteSavedMonster}) => {
  const [open, setOpen] = useState(false);
  const [openOne, setOpenOne] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState();

  const handleClickOpen = () => {
    getSavedMonsters();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const makePlayer = (player) => {
    addPlayer(player);
    setOpen(false);
  };

  const openPlayerPage = (m) => {
    setCurrentPlayer(m);
    setOpenOne(true);
  };


  return (
    <div>
        <button
      className='btn dangerColor'
      onClick={handleClickOpen}
      style={{ marginBottom: '20px'}}
      >
       Monsters
      </button>
      <Dialog maxWidth='md' fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title" style={{zIndex:'1'}}>
        <DialogContent style={{textAlign: 'center'}}>
                <AddMonster  addSavedMonster={addSavedMonster} />
          <div>
            <button className="btn"    style={{position:'absolute',right: '25px', top: '25px'}} onClick={handleClose}>cancel</button>
<h2 style={{fontSize:'20px'}}>Saved Monsters</h2>
{savedMonsters && 
savedMonsters.map(m => { 
  return (
  <div key={m.name}  className="savedPlayersContainer"  >
       <PlayerPage
                      setOpen={setOpen}
                      openOne={openOne}
                      setOpenOne={setOpenOne}
                      currentPlayer={currentPlayer}
                      addPlayer={addPlayer}
                    />
  <div
    className="box" onClick={()=>{openPlayerPage(m)}}>
    <img draggable="false" className='savedPlayersImg' src={m.url} alt="" width='100px' height='auto' />
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
