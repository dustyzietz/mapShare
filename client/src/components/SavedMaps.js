import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { AddMap } from "./AddMap";
import {
  addMap,
  getSavedMaps,
  addSavedMap,
  editAllPlayers
} from "../actions/players";
import { connect } from "react-redux";
import PropTypes from "prop-types";

 const SavedMaps = ({ addMap, getSavedMaps, addSavedMap, savedMaps, players, editAllPlayers }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    getSavedMaps();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const makeMap = async (map) => {
   const newplayers = players.map(p => {
    return  {...p, controlledPosition: { x: 600, y: -800 }}
      });
      console.log(players);
      console.log(newplayers);
      editAllPlayers(newplayers);
    addMap(map);
    setOpen(false);
  };

  return (
    <div>
      <button
        className="btn"
        onClick={handleClickOpen}
        style={{ marginBottom: "20px" }}
      >
        Add Map
      </button>
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
            <AddMap addSavedMap={addSavedMap} />
            <button
              className="btn"
              style={{ float: "right" }}
              onClick={handleClose}
            >
              cancel
            </button>
            <h2 style={{ fontSize: "20px" }}>Saved Maps</h2>
            {savedMaps &&
              savedMaps.map((m) => {
                const map = { name: m.name, url: m.url };
                return (
                  <div
                    key={m._id}
                    onClick={() => {
                      makeMap(map);
                    }}
                    className="savedPlayersContainer"
                  >
                    <div className="box">
                      <img
                        draggable="false"
                        src={m.url}
                        alt=""
                        width="150px"
                        height="150px"
                      />
                    </div>
                    <p>{m.name}</p>
                  </div>
                );
              })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
SavedMaps.propTypes = {};

const mapStateToProps = (state) => ({
  savedMaps: state.savedMaps,
  players: state.players
});

export default connect(mapStateToProps, {
  editAllPlayers,
  addMap,
  getSavedMaps,
  addSavedMap,
})(SavedMaps);
