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
import { setAlert } from "../actions/alert";
import { connect } from "react-redux";
import { set } from "mongoose";


const useStyles = makeStyles((theme) => ({
  expand: {
    transform: "rotate(0deg)",
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

function PlayerStats({
  setAlert,
  players,
  player,
  handleGrow,
  handleShrink,
  handleDelete,
  openEdit,
  openChat,
  sendMessage,
  editSavedPlayer,
  editPlayer,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const {
    name,
    hp,
    ac,
    speed,
    fort,
    ref,
    will,
    currentHp,
    attacks,
    spells,
    usableItems,
    skills,
  } = player;

  const [target, setTarget] = useState(players[0]._id);
  const [attackIndex, setAttackIndex] = useState(0);
  const [attOpen, setAttOpen] = useState(false)
  const [spellOpen, setSpellOpen] = useState(false)
  const [spellIndex, setSpellIndex] = useState(0)
  const [itemOpen, setItemOpen] = useState(false)

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

  const handleSpell = () => {
  if(spells[spellIndex]){
     const message = spells[spellIndex].name
    setAlert(message, "info");
  }
  setSpellOpen(false)
  }

  const handleAttack = () => {
    if (attacks.length === 0) {
      return;
    }
    const myAttack = attacks[attackIndex];
    const myTarget = players.find((p) => {
      return p._id.toString() === target.toString();
    });
    const roll = Math.floor(Math.random() * 20 + 1);
    const hitRoll = roll + myAttack.hit;
    let message = ``;
    if (hitRoll < myTarget.ac) {
      message = `${roll}/20 You Miss ${myTarget.name}`;
      setAlert(message, "danger");
    } else {
      let damage = Math.floor(
        Math.random() * myAttack.diceType + myAttack.plus + 1
      );
      const crit = roll >= myAttack.critOn ? true : false;
      if (crit) {
        damage = damage * myAttack.critTimes;
      }
      message = crit
        ? `${roll}/20 CRITICAL HIT!   ${damage} points of damage to ${myTarget.name}`
        : `${roll}/20 You Hit   ${damage} points of damage to ${myTarget.name}`;
      myTarget.currentHp = myTarget.currentHp - damage;
      setAlert(message, "success", 10000);
      editPlayer(myTarget);
    }
    const chatName = name;
    sendMessage(message, chatName);
  };



  return (
    <div style={{maxWidth:"300px", background:'white',padding:expanded ? '10px': '0 10px'  , borderRadius:'0.25rem'}}>
        {name}
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
      <Collapse in={expanded} timeout="auto" unmountOnExit>
       
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
          <div style={{ display: "flex" }}>
            <img
              style={{ flexGrow: "1" }}
              src="https://game-icons.net/icons/ffffff/000000/1x1/delapouite/dice-twenty-faces-twenty.svg"
              alt="20sided"
              // height="15%"
              width="15%"
              onClick={() => {
                handleRoll(20);
              }}
            />
            <img
              style={{ flexGrow: "1" }}
              src="https://game-icons.net/icons/ffffff/000000/1x1/skoll/d12.svg"
              alt="12sided"
              // height="15%"
              width="15%"
              onClick={() => {
                handleRoll(12);
              }}
            />
            <img
              style={{ flexGrow: "1" }}
              src="https://game-icons.net/icons/ffffff/000000/1x1/skoll/d10.svg"
              alt="10sided"
              //  height="15%"
              width="15%"
              onClick={() => {
                handleRoll(10);
              }}
            />
            <img
              style={{ flexGrow: "1" }}
              src="https://game-icons.net/icons/ffffff/000000/1x1/delapouite/dice-eight-faces-eight.svg"
              alt="8sided"
              //  height="15%"
              width="15%"
              onClick={() => {
                handleRoll(8);
              }}
            />
            <img
              style={{ flexGrow: "1" }}
              src="https://game-icons.net/icons/ffffff/000000/1x1/delapouite/perspective-dice-six.svg"
              alt="6sided"
              //  height="15%"
              width="15%"
              onClick={() => {
                handleRoll(6);
              }}
            />
            <img
              style={{ flexGrow: "1" }}
              src="https://game-icons.net/icons/ffffff/000000/1x1/skoll/d4.svg"
              alt="4sided"
              //  height="15%"
              width="15%"
              onClick={() => {
                handleRoll(4);
              }}
            />
          </div>
          <br />
         <strong>HP:</strong> {hp}  <strong>AC:</strong> {ac}  <strong>Speed:</strong> {speed} currentHP: {currentHp}
         <br/>
         {attOpen ?
         <>
         <select
         className="form-control"
         style={{width:'180px', display: "inline-block"}}
           name="attackIndex"
           value={attackIndex}
           onChange={(e) => {
             setAttackIndex(e.target.value);
           }}
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
         <br/>
        <strong>Target: </strong> 
         <select
         className="form-control"
           name="target"
           value={target}
           onChange={(e) => {
             setTarget(e.target.value);
           }}
           style={{ width: "180px", display: "inline-block" }}
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
         <button
           onClick={handleAttack}
           className="btn btn-danger"
         >
           Attack
         </button>
         </>
         :
         <button
         onClick={()=>{setAttOpen(true)}}
         className="btn btn-danger"
       >
         Attack
       </button>
        }

{spellOpen ?
         <>
         <select
         className="form-control"
         style={{width:'180px', display: "inline-block"}}
           name="spellIndex"
           value={spellIndex}
           onChange={(e) => {
             setSpellIndex(e.target.value);
           }}
         >
           {spells.length > 0 &&
             spells.map((spell, i) => {
               return (
                 <option key={uuid()} value={i}>
                   {spell.name}
                 </option>
               );
             })}
         </select>
         <br/>
         <button
           onClick={handleSpell}
           className="btn btn-info"
         >
           Cast
         </button>
         </>
         :
         <button
         onClick={()=>{setSpellOpen(true)}}
         className="btn btn-info"
       >
         Spell
       </button>
        }
          
          {spells && <br />}
          {spells &&  <><strong>Spells/Abilities:</strong>{spells.map(spell => `${spell.name}, `)}</>}
          {usableItems && <br />}
          {usableItems &&  <> <strong>Items: </strong>{usableItems.map(item => `${item.name}, `)} </>}
          {skills && <br />}
          {skills && <> <strong>Skills: </strong>{skills.map(skill => `${skill.name}, `)} </>}
          {fort && <br />}
          {fort && `Fortitude: +${fort}`}
          {ref && <br />}
          {ref && `Reflex: +${ref}`}
          {will && <br />}
          {will && `Will: +${will}`}
          {/* Abilities: {abilities} */}
          <br />
          <IconButton
            onClick={handleDelete}
            style={{ display: "inline-block" }}
          >
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

export default connect(null, { setAlert })(PlayerStats);
