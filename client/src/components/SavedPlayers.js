import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { connect } from "react-redux";
import { addSavedPlayer, addPlayer ,getSavedPlayers, deleteSavedPlayer} from "../actions/players";

import { PlayerPage } from "./PlayerPage";

const SavedPlayers = ({
  addPlayer,
  savedPlayers,
  getSavedPlayers,
  deleteSavedPlayer,
  setEdit,
  setFormOpen 
}) => {
  const [open, setOpen] = useState(false);
  const [openOne, setOpenOne] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState();

  const handleClickOpen = () => {
    getSavedPlayers();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openPlayerPage = (p) => {
    setCurrentPlayer(p);
    setOpenOne(true);
  };

  const handleAdd = () => {
    setEdit(false);
    setFormOpen(true);
  };

  return (
    <div>
      <div className="btn btn-primary" onClick={handleClickOpen}>Add Character</div>
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
          <button
              className="btn btn-info"
              style={{float: "left" }}
              onClick={handleAdd}
            >
              New Player
            </button>
            <button
              className="btn btn-info"
              style={{float: "right" }}
              onClick={handleClose}
            >
              cancel
            </button>
            <h2 style={{ fontSize: "20px"}}>Saved Characters</h2>
            {savedPlayers &&
              savedPlayers.map((p) => {
                return (
                   !p.monster ?
                    <div style={{display:'inline-block', margin:"10px"}} key={p.name}>
                    <PlayerPage
                      setOpen={setOpen}
                      openOne={openOne}
                      setOpenOne={setOpenOne}
                      currentPlayer={currentPlayer}
                      addPlayer={addPlayer}
                    />
                    <div onClick={() => openPlayerPage(p)}>
                      <img
                        draggable="false"
                        src={p.url}
                        alt=""
                        width="100px"
                        height="auto"
                      />
                      <br />
                      {p.name}
                    </div>
                  </div>
                  :
                null 
                )
              })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  savedPlayers: state.savedPlayers,
});

export default connect(mapStateToProps, 
  {addPlayer,
  getSavedPlayers,
  addSavedPlayer,
  deleteSavedPlayer})(SavedPlayers)
