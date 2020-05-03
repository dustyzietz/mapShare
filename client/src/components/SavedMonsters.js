import React,{useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {AddMonster} from './AddMonster';


export  const SavedMonsters = ({addPlayer, savedMonsters, getSavedMonsters, addSavedMonster, deleteSavedMonster}) => {
  const [open, setOpen] = useState(false);

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
  <div
    className="box">
    <img draggable="false" className='savedPlayersImg' src={m.url} alt="" width='100px' height='auto' onClick={() => {makePlayer(m)}}/>
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
