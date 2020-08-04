import React,{useState} from 'react'
 import Dialog from '@material-ui/core/Dialog';
import { addSavedEvent } from "../actions/event";
import { connect } from "react-redux";


const AddEvent = ({addSavedEvent}) => {
   const [open, setOpen] = useState(false);
   const [event, setEvent] = useState({
     name:'',
     number: 1,
     details:'',
     monster: '',
     qty: 0,
     treasure: '',
     newMap: '',
   })
   const{name, number, details, monster, qty, treasure, newMap} = event

   const handleClickOpen = () => {
    setOpen(true);
  };
 const handleClose = () => {
    setOpen(false);
  };

  const onChange = (e) =>
    setEvent({ ...event, [e.target.name]: e.target.value });

    const handleSubmit = (e) =>{
     e.preventDefault()
     console.log("handle", event)
     addSavedEvent(event)
     setOpen(false)
    }
  return (
    <div>
    <button
      className='btn btn-secondary'
      onClick={handleClickOpen}
      style={{float: "left"}}
      >
        Add Event
      </button>
      <Dialog maxWidth='sm' fullWidth open={open} onClose={handleClose} style={{zIndex:'1', textAlign:'center'}}>
      <h2>Make New Event</h2>
      <form onSubmit={handleSubmit}>
        <div
                    className="form-group"
                    style={{ width: "200px", display: "inline-block" }}
                  >
                    <label htmlFor="playerName">Event Name</label>
                    <input
                      id="playerName"
                      className="form-control"
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={name}
                      onChange={onChange}
                    />
                  </div>
                  <div
                    className="form-group"
                    style={{ width: "80px", display: "inline-block" }}
                  >
                    <label htmlFor="playerNumber">Event Number</label>
                    <input
                      id="playerNumber"
                      className="form-control"
                      type="number"
                      name="number"
                      value={number}
                      onChange={onChange}
                    />
                  </div>
                <br/>
                  <div
                    className="form-group"
                    style={{ width: "300px", display: "inline-block" }}
                  >
                    <label htmlFor="playerDetails">Event Details</label>
                    <textarea
                      id="playerDetails"
                      className="form-control"
                      type="text"
                      name="details"
                      rows='3'
                      value={details}
                      onChange={onChange}
                    />
                  </div>
                  <br/>
                  <div
                    className="form-group"
                    style={{ width: "200px", display: "inline-block" }}
                  >
                    <label htmlFor="playerMonster">Event Monster</label>
                    <input
                      id="playerMonster"
                      className="form-control"
                      type="text"
                      placeholder="Monster"
                      name="monster"
                      value={monster}
                      onChange={onChange}
                    />
                  </div>
                  X
                  <div
                    className="form-group"
                    style={{ width: "80px", display: "inline-block" }}
                  >
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Qty"
                      name="qty"
                      value={qty}
                      onChange={onChange}
                    />
                  </div>
                  <br/>
                  <div
                    className="form-group"
                    style={{ width: "300px", display: "inline-block" }}
                  >
                    <label htmlFor="playerTreasure">Treasure</label>
                    <input
                      id="playerTreasure"
                      className="form-control"
                      type="text"
                      name="treasure"
                      value={treasure}
                      onChange={onChange}
                    />
                  </div>
                  <br/>
                  <div
                    className="form-group"
                    style={{ width: "150px", display: "inline-block" }}
                  >
                    <label htmlFor="newMap">Event Monster</label>
                    <input
                      id="newMap"
                      className="form-control"
                      type="text"
                      placeholder="New Map"
                      name="newMap"
                      value={newMap}
                      onChange={onChange}
                    />
                  </div>
                  <br/>
                  <button type='submit' className="btn btn-primary"  >Submit</button>
      </form>
      </Dialog>
    </div>
  )
}

export default connect(null,{addSavedEvent})(AddEvent)
