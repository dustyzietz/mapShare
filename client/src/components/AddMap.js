import React,{useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';




export  const AddMap = ({addMap}) => {
  const [open, setOpen] = useState(false);
  const [map, setMap] = useState({
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
  } = map;

  

  const onChange = e =>
    setMap({ ...map, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addMap(map);
    onSaveOnly();
  };

  const onSaveOnly = e => {
  //  addSavedmap(map);
    setMap({
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
          marginBottom: '20px'
         }}
      >
        Change Map
      </button>
      <Dialog maxWidth='sm' fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title" style={{zIndex:'1'}}>
        <DialogContent style={{textAlign: 'center'}}>
          <div>
<h2>Change Map</h2>
<form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <textarea
            type="text"
            placeholder="Map   Image Address"
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
            The name of the Map
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
