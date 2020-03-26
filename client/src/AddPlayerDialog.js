import React,{useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export  const AddPlayerDialog = ({addPlayer}) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
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
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addPlayer(formData);
  };
  return (
    <div>
        <button
      className='btn'
      onClick={handleClickOpen}
         style={{
           position: "absolute",
           zIndex: "1",
           left: "725px",
           top: "25px"
         }}
      >
        Add Player
      </button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" style={{zIndex:'1'}}>
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <div>
<h1>Dialog Form</h1>
<form className="form" onSubmit={onSubmit}>
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
        <div className="form-group">
          <input
            type="text"
            placeholder="url"
            name="url"
            value={url}
            onChange={onChange}
          />
          <small className="form-text">
            the address of your character picture
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
