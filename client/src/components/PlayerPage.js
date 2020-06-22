import React from "react";
import Dialog from "@material-ui/core/Dialog";
import uuid from "uuid";

export const PlayerPage = ({
  openOne,
  setOpenOne,
  currentPlayer,
  addPlayer,
  setOpen,
}) => {
  console.log(currentPlayer)
  const handleClose = () => {
    setOpenOne(false);
  };

  const addToMap = () => {
    addPlayer(currentPlayer);
    setOpenOne(false);
    setOpen(false);
  };
  return (
    <Dialog
      maxWidth="md"
      fullWidth
      open={openOne}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      style={{ zIndex: "1" }}
    >
      {currentPlayer && (
        <div>
          <h2 style={{ textAlign: "center" }}> {currentPlayer.name} </h2>
          {console.log(currentPlayer)}
          <img
            alt="player image"
            src={currentPlayer.url}
            width="50%"
            style={{ float: "left", margin: "20px" }}
          />
          HP:{currentPlayer.hp}
          <br />
          AC:{currentPlayer.ac}
          <br />
          Speed:{currentPlayer.speed}
          <br />
          Str:{currentPlayer.str}
          <br />
          Int:{currentPlayer.int}
          <br />
          Wis:{currentPlayer.wis}
          <br />
          Dex:{currentPlayer.dex}
          <br />
          Con:{currentPlayer.con}
          <br />
          Cha:{currentPlayer.cha}
          <br />
          Fortitutude: +{currentPlayer.fort}
          <br />
          Reflex: +{currentPlayer.ref}
          <br />
          Will: +{currentPlayer.will}
          <br />
          Attacks:
          {currentPlayer.attacks.length > 0 &&
            currentPlayer.attacks.map((a) => {
              return (
                <div key={uuid()}>
                  {`${a.weapon} Hit:+${a.hit} Damage: ${a.amountOfDice}D${a.diceType}+${a.plus} CRIT${a.critOn}x${a.critTimes} `}{" "}
                  <br />
                </div>
              );
            })}
            <br />
          Spells/Abilities:
          {currentPlayer.spells &&
            currentPlayer.spells.map((spell) => spell.name)}
          <br />
          Skills:
          {currentPlayer.skills &&
            currentPlayer.skills.map((skill) => skill.name)}
          <br />
          Usable Items:
          {currentPlayer.UsableItems &&
            currentPlayer.UsableItems.map((item) => item.name)}
          <br />
          <button
            style={{ marginBottom: "25px" }}
            className="btn btn-primary"
            onClick={addToMap}
          >
            Add To Map
          </button>
          <br />
          <button
            className="btn btn-danger"
            onClick={() => {
              setOpenOne(false);
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </Dialog>
  );
};
