import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import AddPlayerDialog from './AddPlayerDialog';
import { connect } from "react-redux";
import { addSavedPlayer, addPlayer ,getSavedPlayers, deleteSavedPlayer } from "../actions/players";
import { PlayerPage } from "./PlayerPage";

 const SavedMonsters = ({
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
      <div style={{width:"100%" }} className="btn btn-danger" onClick={handleClickOpen}>Monsters</div>
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
            <AddPlayerDialog addSavedPlayer={addSavedPlayer} isMonster={true} />
            <button
              className="btn btn-danger"
              style={{float: "right" }}
              onClick={handleClose}
            >
              cancel
            </button>
            <h2 style={{ fontSize: "20px"}}>Monsters</h2>
            {savedPlayers &&
              savedPlayers.map((p) => {
                return (
                   p.monster ?
                    <div style={{display:'inline-block'}} key={p.name}>
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
  deleteSavedPlayer})(SavedMonsters)
