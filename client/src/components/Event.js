import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { connect } from "react-redux";
import { setAlert } from "../actions/alert";
import { addMonsters, editAllPlayers } from "../actions/players";
import { editEvent } from "../actions/event";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import EventEdit from "./EventEdit"

const Event = ({ event, setAlert, addMonsters, editEvent, map }) => {
  const [open, setOpen] = useState(false);
  const { controlledPosition, name, eventId, stage } = event;
  const [isShown, setIsShown] = useState(false);
  const [dragDisabled, setDragDisabled] = useState(true);
  const [editOpen, setEditOpen] = useState(false)
  const [myPosition, setMyPosition] = useState({
    x: controlledPosition.x,
    y: controlledPosition.y,
  });

  const mapName = map.name;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onControlledDrag = (e, position) => {
    const { x, y } = position;
    setMyPosition({ x, y });
  };

  const onControlledDragStop = (e, position) => {
    onControlledDrag(e, position);
  };

  const runEvent = () => {
    addMonsters(event.monster, event.qty);
    let message = `${event.details} MONSTERS: ${event.qty} ${event.monster}`;
    setAlert(message, "dark", 10000);
    setOpen(false)
    increaseStage()
  };

  const handleTreasure = () => {
    let message = `TREASURE: ${event.treasure}`;
    setAlert(message, "indigo", 12000);
    increaseStage()
  };

  const handleMove = () => {
   setOpen(false)
   setDragDisabled(false)
  }

  const handlePlace = () => {
    setDragDisabled(true)
       let newEvent = event
    newEvent.controlledPosition = myPosition
    editEvent(newEvent, mapName)
  }

  const increaseStage = () => {
    let newEvent = event
    newEvent.stage = newEvent.stage + 1
    editEvent(newEvent, mapName)
  }
 

  return (
    <>
    <EventEdit editOpen={editOpen} setEditOpen={setEditOpen} initialEvent={event} />
      <Dialog
        maxWidth="xs"
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        style={{ zIndex: "1", textAlign: "center" }}
      >
        <DialogContent>
    <h4>{name}</h4>
    <div style={{marginBottom:'20px'}}>
      <button className='btn btn-primary' onClick={runEvent}>
      Run Event
    </button>
    </div>
    <div >
    <button className='btn btn-secondary' onClick={handleMove}>
      Move
    </button>
    <button className='btn btn-warning' onClick={()=>{setEditOpen(true)}}>
      Edit
    </button>
    <button className='btn btn-danger' onClick={runEvent}>
      Delete
    </button>
    </div>
    </DialogContent>
      </Dialog>
    <Draggable
      disabled={dragDisabled}
      position={myPosition}
      onStop={onControlledDragStop}
    >
      <div  style={{ position: "absolute" }}>
      { !dragDisabled &&
         <button
         className="btn btn-primary"
         onClick={handlePlace}
       >
         move
       </button> 
}    
{       
     dragDisabled &&
       event.stage === 0 && 
        <div
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        >
          <button
            className="btn btn-primary"
            style={{ opacity: isShown ? "1" : "0.5" }}
            onClick={handleClickOpen}
          >
            {name}
          </button>
        </div>
        }
     {dragDisabled &&
      event.stage === 1 && 
      <button
      className="btn btn-light"
      onClick={handleTreasure}
    >
      treasure
    </button>
}
</div>
    </Draggable> 
        </>
  );
};
const mapStateToProps = (state) => ({
  savedPlayers: state.savedPlayers,
  map: state.map,
});
export default connect(mapStateToProps, { setAlert, addMonsters, editEvent })(
  Event
);
