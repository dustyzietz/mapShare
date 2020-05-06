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
import uuid from "uuid";

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: "rotate(0deg)",
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

export default function PlayerStats({
  players,
  player,
  handleGrow,
  handleShrink,
  handleDelete,
  openEdit,
  openChat,
  sendMessage,
  editSavedPlayer,
  editPlayer
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
    // abilities,
  } = player;

  const [target, setTarget] = useState(players[0]._id);
  const [attackIndex, setAttackIndex] = useState(0);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleRoll = (num) => {
    const roll = Math.floor(Math.random() * num + 1);
    // console.log(roll);
    const chatName = name;
    const message = ` ROLLED ${roll} out of ${num}`;
    sendMessage(message, chatName);
  };

  const handleAttack = () => {
    const myAttack = attacks[attackIndex];
    const myTarget = players.find((p) => {
      return p._id.toString() === target.toString();
    });
    console.log(myTarget);
    const roll = Math.floor(Math.random() * 20 + 1);
    const hitRoll = roll + myAttack.hit;
    let message = ``;
    if (hitRoll < myTarget.ac) {
      message = `${roll}/20 You Miss ${myTarget.name}`;
    } else {
      let damage = Math.floor(
        Math.random() * myAttack.diceType + myAttack.plus + 1
      );
      const crit = hitRoll >= myAttack.critOn ? true : false;
      if (crit) {
        damage = damage * myAttack.critTimes;
      }
      message = crit
        ? `${roll}/20 CRITICAL HIT!   ${damage} points of damage to ${myTarget.name}`
        : `${roll}/20 You Hit   ${damage} points of damage to ${myTarget.name}`;
        myTarget.currentHp = myTarget.currentHp - damage;
        editPlayer(myTarget);
    }
    const chatName = name;
    sendMessage(message, chatName);
    
  };

  const isExpanded = expanded ? "statTitle statOpen" : "statTitle";
  return (
    <div className={isExpanded}>
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
          onClick={() => {
            handleRoll(20);
          }}
        />
        <img
          src="https://game-icons.net/icons/ffffff/000000/1x1/skoll/d12.svg"
          alt="12sided"
          // height="15%"
          width="15%"
          onClick={() => {
            handleRoll(12);
          }}
        />
        <img
          src="https://game-icons.net/icons/ffffff/000000/1x1/skoll/d10.svg"
          alt="10sided"
          //  height="15%"
          width="15%"
          onClick={() => {
            handleRoll(10);
          }}
        />
        <img
          src="https://game-icons.net/icons/ffffff/000000/1x1/delapouite/dice-eight-faces-eight.svg"
          alt="8sided"
          //  height="15%"
          width="15%"
          onClick={() => {
            handleRoll(8);
          }}
        />
        <img
          src="https://game-icons.net/icons/ffffff/000000/1x1/delapouite/perspective-dice-six.svg"
          alt="6sided"
          //  height="15%"
          width="15%"
          onClick={() => {
            handleRoll(6);
          }}
        />
        <img
          src="https://game-icons.net/icons/ffffff/000000/1x1/skoll/d4.svg"
          alt="4sided"
          //  height="15%"
          width="15%"
          onClick={() => {
            handleRoll(4);
          }}
        />
        <br />
        HP: {hp} AC: {ac} Speed: {speed} currentHP: {currentHp}
        {attacks && (
          <span>
            {" "}
            <hr />
            attacks:
          </span>
        )}
        <select
          name="attackIndex"
          value={attackIndex}
          onChange={(e) => {
            setAttackIndex(e.target.value);
          }}
          style={{ width: "100px" }}
        >
          {attacks.length > 0 &&
            attacks.map((a, i) => {
              return (
                <option key={uuid()} value={i}>
                  {`${a.weapon} HIT +${a.hit} DAM${a.amountOfDice}D${a.diceType}+${a.plus} CRIT${a.critOn}x${a.critTimes} `}
                </option>
              );
            })}
        </select>
        <select
          name="target"
          value={target}
          onChange={(e) => {
            setTarget(e.target.value);
          }}
          style={{ width: "100px" }}
        >
          {players &&
            players.map((p, i) => {
              return (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              );
            })}
        </select>
        <button onClick={handleAttack}>Attack</button>
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
        <IconButton
          onClick={() => {
            editSavedPlayer(player);
          }}
        >
          <Save />
        </IconButton>
      </Collapse>
    </div>
  );
}
