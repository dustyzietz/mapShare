import React,{useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

export  const AddPlayerDialog = ({addPlayer, addSavedPlayer }) => {
  const [open, setOpen] = useState(false);
  const [player, setPlayer] = useState({
    name: '',
    url: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const {
    name,
    url,
  } = player;

  const onChange = e =>
    setPlayer({ ...player, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addPlayer(player);
    onSaveOnly();
  };

  const onSaveOnly = e => {
    addSavedPlayer(player);
    setPlayer({
      name: '',
      url: '',
    });
    handleClose();
  };

  return (
    <div>
        <button
      className='btn'
      onClick={handleClickOpen}
         style={{
           position: "absolute",
           zIndex: "1",
           left: "25px",
           top: "25px"
         }}
      >
        Add Player
      </button>
      <Dialog maxWidth='sm' fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title" style={{zIndex:'1'}}>
        <DialogContent style={{textAlign: 'center'}}>
          <div>
<h2>Create Character</h2>
<form className="form" onSubmit={onSubmit}>
        <div className="form-group">
        <small className="form-text">
            <ul>
              <li>Find a picture of your character online</li>
              <li>Right click on it</li>
              <li>Click on copy image address</li>
              <li>Paste it in below</li>
            </ul>
          </small>
          <textarea
            type="text"
            placeholder="Your Image Address"
            name="url"
            value={url}
            onChange={onChange}
            rows='3'
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
          />
          <small className="form-text">
            The name of your character
          </small>
        </div>
<input type="submit" className="btn btn-primary my-1" />
      </form>
</div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
