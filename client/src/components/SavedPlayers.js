import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {AddPlayerDialog} from './AddPlayerDialog';

import { PlayerPage } from "./PlayerPage";

export const SavedPlayers = ({
  addPlayer,
  savedPlayers,
  getSavedPlayers,
  addSavedPlayer,
  deleteSavedPlayer,
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
            <AddPlayerDialog addSavedPlayer={addSavedPlayer} />
            <h2 style={{ fontSize: "20px",display: "inline-block" }}>Saved Characters</h2>
            <button
              className="btn btn-info"
              style={{float: "right" }}
              onClick={handleClose}
            >
              cancel
            </button>
            {savedPlayers &&
              savedPlayers.map((p) => {
                return (
                   !p.monster ?
                    <div key={p.name}>
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
