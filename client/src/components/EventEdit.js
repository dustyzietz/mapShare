import React, {useState} from 'react'
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { editEvent } from "../actions/event"
import { connect } from "react-redux";

 

const EventEdit = ({editOpen, setEditOpen, initialEvent, editEvent, map}) => {
  const [event, setEvent] = useState(initialEvent)
  const{name, number, details, monster, qty, treasure} = event

  const handleClose = () => {
    setEditOpen(false);
  };

  const onChange = (e) =>
    setEvent({ ...event, [e.target.name]: e.target.value });

    const handleSubmit = (e) =>{
     e.preventDefault()
     editEvent(event, map.name)
     console.log(event)
    }
  
  return (
    <div>
        <Dialog
        maxWidth="sm"
        fullWidth
        open={editOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        style={{ zIndex: "1", textAlign: "center" }}
      >
 <DialogContent>
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
                  <button type='submit' className="btn btn-primary"  >Submit</button>
      </form>
 </DialogContent>
 </Dialog>
    </div>
  )
}

const mapStateToProps = (state) => ({
  map: state.map,
});

export default connect(mapStateToProps,{editEvent})(EventEdit)
