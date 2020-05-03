import React,{useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

export  const PlayerPage = ({ openOne, setOpenOne }) => {
 
 const handleClickOpen = () => {
    setOpenOne(true);
  };

  const handleClose = () => {
    setOpenOne(false);
  };
return (   
      <Dialog maxWidth='sm' fullWidth open={openOne} onClose={handleClose} aria-labelledby="form-dialog-title" style={{zIndex:'1'}}>
        <DialogContent style={{textAlign: 'center'}}>
          Thi is the dialog
  </DialogContent>
      </Dialog>
  )
}



