import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ControlPoint from "@material-ui/icons/ControlPoint";
import RemoveCircle from "@material-ui/icons/RemoveCircle";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import Edit from "@material-ui/icons/Edit";
import Save from "@material-ui/icons/Save";
import ChatBubble from "@material-ui/icons/ChatBubble";

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: "rotate(0deg)"
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

export default function PlayerStats({
  player,
  handleGrow,
  handleShrink,
  handleDelete,
  openEdit,
  openChat,
  sendMessage,
  editSavedPlayer
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const {
    name,
    hp,
    ac,
    speed,
    currentHp,
    attacks,
    spells,
    skills,
    items,
    saves,
    abilities,
  } = player;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

const handleRoll = num => {
 const roll = Math.floor(Math.random() * num + 1);
  console.log(roll);
 const chatName = name;
 const message = ` ROLLED ${roll} out of ${num}`
  sendMessage(message, chatName);
}

  const isExpanded = expanded ? "statTitle statOpen" : "statTitle";
  return (
    <div className={isExpanded} >
      <div style={{ padding: "6px", display: "inline-block" }}>{name}</div>
      <IconButton
        size="small"
        className={clsx(classes.expand, {
          [classes.expandOpen]: expanded,
        })}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </IconButton>
      {expanded && (
        <span>
          <IconButton onClick={handleGrow}>
            <ControlPoint />
          </IconButton>
          <IconButton onClick={handleShrink}>
            <RemoveCircle />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => {
              openChat(name);
            }}
          >
            <ChatBubble />
          </IconButton>
        </span>
      )}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <img
          src="https://game-icons.net/icons/ffffff/000000/1x1/delapouite/dice-twenty-faces-twenty.svg"
          alt="20sided"
         // height="15%"
          width="15%"
          onClick={() => {handleRoll(20)}}
        />
        <img
          src="https://game-icons.net/icons/ffffff/000000/1x1/skoll/d12.svg"
          alt="12sided"
         // height="15%"
          width="15%"
          onClick={() => {handleRoll(12)}}

        />
        <img
          src="https://game-icons.net/icons/ffffff/000000/1x1/skoll/d10.svg"
          alt="10sided"
        //  height="15%"
          width="15%"
          onClick={() => {handleRoll(10)}}

        />
        <img
          src="https://game-icons.net/icons/ffffff/000000/1x1/delapouite/dice-eight-faces-eight.svg"
          alt="8sided"
        //  height="15%"
          width="15%"
          onClick={() => {handleRoll(8)}}

        />
        <img
          src="https://game-icons.net/icons/ffffff/000000/1x1/delapouite/perspective-dice-six.svg"
          alt="6sided"
        //  height="15%"
          width="15%"
          onClick={() => {handleRoll(6)}}

        />
        <img
          src="https://game-icons.net/icons/ffffff/000000/1x1/skoll/d4.svg"
          alt="4sided"
        //  height="15%"
          width="15%"
          onClick={() => {handleRoll(4)}}

        />
        <br/>
        HP: {hp} AC: {ac} Speed: {speed} currentHP: {currentHp}
        {attacks && <hr />}
        {attacks && `Attacks: ${attacks}`}
        {spells && <hr />}
        {spells && `Spells/Abilities: ${spells}`}
        {items && <hr />}
        {items && `Items: ${items}`}
        {skills && <hr />}
        {skills && `Skills: ${skills}`}
        {saves && <hr />}
        {saves && `Fort/Ref/Will: ${saves}`}
        {/* Abilities: {abilities} */}
        <br />
        <IconButton onClick={handleDelete} style={{ display: "inline-block" }}>
          <HighlightOffOutlinedIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            openEdit(player);
          }}
        >
          <Edit />
        </IconButton>
        <IconButton onClick={() => {editSavedPlayer(player)}} >
          <Save />
        </IconButton>
      </Collapse>
    </div>
  );
}
