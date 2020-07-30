import React, { useState } from "react";
import AddEvent from "./AddEvent";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { getSavedEvents, addEvent, deleteEvent, deleteSavedEvent, editEvent } from "../actions/event";
import { connect } from "react-redux";

const SavedEvents = ({ getSavedEvents, savedEvents, addEvent, map, events, deleteEvent, deleteSavedEvent, editEvent}) => {
  const [open, setOpen] = useState(false);
  const mapName = map.name

  const handleClickOpen = () => {
    getSavedEvents();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEvent = (event) => {
   addEvent(event, mapName)
   handleClose()
  }

  const handleDelete = (id) => {
    deleteSavedEvent(id)
   }

   const restartEvent = (event, mapName) => {
     const restartedEvent = { ...event, stage: 0 }
    editEvent(restartedEvent, mapName)
   }

  return (
    <div>
      <div style={{width:"100%" }} className="btn btn-secondary" onClick={handleClickOpen}>
        Events
      </div>
      <Dialog
        maxWidth="md"
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        style={{ zIndex: "1" }}
      >
        <DialogContent style={{ textAlign: "center" }}>
          <div>
            <AddEvent />
            <button
              className="btn btn-danger"
              style={{ float: "right" }}
              onClick={handleClose}
            >
              close
            </button>
            <h2 style={{ fontSize: "20px"}}>
             Current Events
            </h2>
            <ul>
              {events &&
               events.map((event) => {
                  return (
                    <li
                    key={event.eventId}
                      className="list-group-item d-flex justify-content-between align-items-center"
                      style={{ maxWidth: "500px", margin: "auto" }}
                    >
                      {event.name}
                      <span>
                        level:{" "}
                        <span className="badge badge-primary badge-pill">
                          {event.number}
                        </span>
                      </span>
                      <button className="btn btn-primary btn-sm" onClick={()=>{restartEvent(event, mapName)}} >Restart</button>
                      <button className="btn btn-danger btn-sm" onClick={()=>{deleteEvent(event.eventId, mapName)}} >Remove</button>
                    </li>
                  );
                })}
            </ul>

            <h2 style={{ fontSize: "20px"}}>
             Saved Events
            </h2>
           
            <ul>
              {savedEvents &&
                savedEvents.map((event) => {
                  return (
                    <li
                    key={event._id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                      style={{ maxWidth: "500px", margin: "auto" }}
                    >
                      {event.name}
                      <span>
                        level:{" "}
                        <span className="badge badge-primary badge-pill">
                          {event.number}
                        </span>
                      </span>
                      <button className="btn btn-primary btn-sm" onClick={()=>{handleEvent(event)}} >Add To Map</button>
                      <button className="btn btn-danger btn-sm" onClick={()=>{handleDelete(event._id)}} >Delete</button>
                    </li>
                  );
                })}
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  savedEvents: state.savedEvents,
  map: state.map,
});

export default connect(mapStateToProps, { getSavedEvents, addEvent, deleteEvent, deleteSavedEvent, editEvent })(SavedEvents);
