import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { connect } from "react-redux";
import { setAlert } from "../actions/alert";
import { addMonsters, addMap, getSavedMaps, sendMessage } from "../actions/players";
import { editEvent } from "../actions/event";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import EventEdit from "./EventEdit";

const Event = ({ event, setAlert, addMonsters, editEvent, map, addMap, savedMaps, getSavedMaps, sendMessage }) => {
  const [open, setOpen] = useState(false);
  const { controlledPosition, name, eventId, stage } = event;
  const [isShown, setIsShown] = useState(false);
  const [dragDisabled, setDragDisabled] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [myPosition, setMyPosition] = useState({
    x: controlledPosition.x,
    y: controlledPosition.y,
  });

  useEffect(()=>{
  setMyPosition(controlledPosition)
  },[controlledPosition])

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

  useEffect(()=>{
    if(event.newMap){
      getSavedMaps()
    }
  }, [])

  const runEvent = async () => {

    let message = `${event.details} `;
    if (event.monster) {
     await addMonsters(event.monster, event.qty);
     message = message + ` MONSTERS: ${event.qty} ${event.monster}`;
    }
    const timer = message.length * 50 + 1000
    setAlert(message, "dark", timer);
    sendMessage(message)
    if(event.newMap){
      //we need saved maps   then get the one with the same name
    let eventMap =  savedMaps.find(savedMap =>  (savedMap.name.trim().toLowerCase() === event.newMap.trim().toLowerCase()))
    console.log(eventMap, "eventMap")
   await addMap(eventMap)
  return
    }
    setOpen(false);
    setStage(1);
  };

  const handleTreasure = () => {
    let message = `TREASURE. ${event.treasure}`;
    const timer = message.length * 50 + 1000
    setAlert(message, "indigo", timer);
    sendMessage(message)
    setStage(2);
  };

  const handleMove = () => {
    setOpen(false);
    setDragDisabled(false);
  };

  const handlePlace = () => {
    setDragDisabled(true);
    let newEvent = event;
    newEvent.controlledPosition = myPosition;
    editEvent(newEvent, mapName);
  };

  const setStage = (stage) => {
    let newEvent = event;
    newEvent.stage = stage;
    editEvent(newEvent, mapName);
  };

  const handleHide = () => {
    setOpen(false);
    setStage(2);
  }

  return (
    <>
      <EventEdit
        editOpen={editOpen}
        setEditOpen={setEditOpen}
        initialEvent={event}
      />
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
          <div style={{ marginBottom: "20px" }}>
            <button className="btn btn-primary" onClick={runEvent}>
              Run Event
            </button>
          </div>
          <div>
            <button className="btn btn-secondary" onClick={handleMove}>
              Move
            </button>
            <button
              className="btn btn-warning"
              onClick={() => {
                setEditOpen(true);
              }}
            >
              Edit
            </button>
            <button className="btn btn-danger" onClick={handleHide}>
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
        <div style={{ position: "absolute" }}>
          {!dragDisabled && (
            <button className="btn btn-primary" onClick={handlePlace}>
              move
            </button>
          )}
          {dragDisabled && event.stage === 0 && (
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
          )}
          {dragDisabled && event.stage === 1 && event.treasure && (
            <button className="btn btn-light" onClick={handleTreasure}>
              treasure
            </button>
          )}
           {dragDisabled && event.stage === 1 && !event.treasure &&
             setStage(0)
            }
          {event.stage === 2 && <div></div>}
        </div>
      </Draggable>
    </>
  );
};
const mapStateToProps = (state) => ({
  savedPlayers: state.savedPlayers,
  savedMaps: state.savedMaps,
  map: state.map,
});
export default connect(mapStateToProps, {getSavedMaps, setAlert, addMonsters, editEvent, addMap, sendMessage })(
  Event
);
