import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { AddMap } from "./AddMap";
import {
  addMap,
  getSavedMaps,
  addSavedMap,
  editAllPlayers,
  deleteSavedMap,
  deleteSavedPlayer,
} from "../actions/players";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const SavedMaps = ({
  addMap,
  getSavedMaps,
  addSavedMap,
  savedMaps,
  players,
  editAllPlayers,
  deleteSavedMap,
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    getSavedMaps();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const makeMap = async (map) => {
    addMap(map);
    setOpen(false);
  };

  return (
    <div>
      <button
      style={{width:"100%" }}
        type="button"
        className="btn btn-success"
        onClick={handleClickOpen}
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
              className="btn btn-danger"
              style={{ float: "right" }}
              onClick={handleClose}
            >
              cancel
            </button>
            <h2 style={{ fontSize: "20px" }}>Saved Maps</h2>
            {savedMaps &&
              savedMaps.map((m) => {
                return (
                  <div
                    key={m._id}
                    className="card text-white bg-primary mb-3"
                    style={{
                      maxWidth: "20rem",
                      display: "inline-block",
                      margin: "10px",
                    }}
                  >
                    <div className="card-body">
                      <h4 className="card-title">{m.name}</h4>
                      <img
                        draggable="false"
                        src={m.url}
                        alt=""
                        width="150px"
                        height="150px"
                      />
                      <br />
                      <button
                        className="btn btn-success"
                        style={{ margin: "5%", padding: "0", width: "40%" }}
                        onClick={() => {
                          makeMap(m);
                        }}
                      >
                        Select
                      </button>
                      <button
                        className="btn btn-danger"
                        style={{ margin: "5%", padding: "0", width: "40%" }}
                        onClick={() => {
                          deleteSavedMap(m._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
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
  players: state.players,
});

export default connect(mapStateToProps, {
  editAllPlayers,
  addMap,
  getSavedMaps,
  addSavedMap,
  deleteSavedMap,
})(SavedMaps);
