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
    playerId,
  } = player;

  const [target, setTarget] = useState(0);
  const [attPlayers, setAttPlayers] = useState(
    players.filter((p) => p.playerId !== playerId)
  );
  const [attackIndex, setAttackIndex] = useState(0);
  const [attOpen, setAttOpen] = useState(false);
  const [spellOpen, setSpellOpen] = useState(false);
  const [spellIndex, setSpellIndex] = useState(0);
  const [itemOpen, setItemOpen] = useState(false);
  const [itemIndex, setItemIndex] = useState(0);
  const [skillOpen, setSkillOpen] = useState(false);
  const [skillIndex, setSkillIndex] = useState(0);
  const [saveOpen, setSaveOpen] = useState(false);
  const [saveType, setSaveType] = useState('fort');
  const [dc, setDc] = useState(15);

  const handleRoll = (num) => {
    const roll = Math.floor(Math.random() * num + 1);
    const chatName = name;
    const message = ` ROLLED ${roll} out of ${num}`;
    sendMessage(message, chatName);
  };

  const handleSkill = () => {
    if (skills[skillIndex]) {
      const roll = Math.floor(Math.random() * 20 + 1);
      const result = roll + skills[skillIndex].bonus;
      const message = `${roll}/20 ${name} got ${result} for ${skills[skillIndex].name}`;
      setAlert(message, "warning", 6000);
    }
    setSkillOpen(false);
  };

  const handleSave = () => {
    const roll = Math.floor(Math.random() * 20 + 1);
    let result = 0;
    let save = "";
    if (saveType === "fort") {
      result = roll + Number(fort);
      save = "Fortitude";
    } else if (saveType === "ref") {
      result = roll + Number(ref);
      save = "Reflex";
    } else if (saveType === "will") {
      result = roll + Number(will);
      save = "Will";
    }
    let color = result >= dc ? "success" : "danger";
    let message =
      result >= dc
        ? `${roll}/20 ${name} Saved! ${result} for ${save}`
        : `${roll}/20 ${name} Failed! ${result} for Fortitude`;
    setAlert(message, color, 6000);
    setSaveOpen(false);
  };

  const handleSpell = () => {
    if (spells[spellIndex]) {
      const message = `${name} casts ${spells[spellIndex].name} -  
     ${spells[spellIndex].effect} - 
     ${spells[spellIndex].dc} - ${spells[spellIndex].other} `;
      setAlert(message, "info", 20000);
    }
    setSpellOpen(false);
  };

  const handleItem = () => {
    if (usableItems[itemIndex] && usableItems[itemIndex].quantity > 0) {
      const message = `${name} uses ${usableItems[itemIndex].name} 
     ${usableItems[itemIndex].effect}`;
      let changedPlayer = player;
      changedPlayer.usableItems[itemIndex].quantity =
        changedPlayer.usableItems[itemIndex].quantity - 1;
      setAlert(message, "secondary", 6000);
      editPlayer(changedPlayer);
    }
    setItemOpen(false);
  };

  const handleAttack = () => {
    if (attacks.length === 0) {
      return;
    }
    const myAttack = attacks[attackIndex];
    const myTarget = players.find((p) => {
      console.log(p.playerId, attPlayers[target].playerId);
      return p.playerId === attPlayers[target].playerId;
    });
    const roll = Math.floor(Math.random() * 20 + 1);
    const hitRoll = roll + myAttack.hit;
    let message = ``;
    if (hitRoll < myTarget.ac) {
      message = `${roll}/20 ${name} Misses ${myTarget.name}`;
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
        ? `${roll}/20 CRITICAL HIT! ${name} hits ${myTarget.name} for ${damage} points of damage`
        : `${roll}/20 ${name} hits ${myTarget.name} for ${damage} points of damage`;
      myTarget.currentHp = myTarget.currentHp - damage;
      setAlert(message, "success", 10000);
      editPlayer(myTarget);
    }
    const chatName = name;
    sendMessage(message, chatName);
    setAttOpen(false);
  };

  return (
    <div
      style={{
        maxWidth: "250px",
        background: "white",
        padding: "16px",
        borderRadius: "0.25rem",
        textAlign: "center",
        transform: "translate(-100px, 0)",
      }}
    >
      {name}
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
      <br />
      <strong>HP:</strong> {hp} <strong>AC:</strong> {ac}{" "}
      <strong>Speed:</strong> {speed}
      <br />
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
      {attOpen && (
        <>
          <button onClick={handleAttack} className="btn btn-success">
            Attack
          </button>
          <button
            onClick={() => {
              setAttOpen(false);
            }}
            className="btn btn-danger"
          >
            Cancel
          </button>
          <br />
          Attack:
          <select
            style={{ width: "180px", display: "inline-block" }}
            className="form-control"
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
                    {a.weapon}
                  </option>
                );
              })}
          </select>
          <br />
          Target:
          <select
            className="form-control"
            name="target"
            value={target}
            onChange={(e) => {
              setTarget(e.target.value);
            }}
            style={{ width: "180px", display: "inline-block" }}
          >
            {attPlayers &&
              attPlayers.map((p, i) => {
                return (
                  <option key={p.playerId} value={i}>
                    {p.name}
                  </option>
                );
              })}
          </select>
        </>
      )}
      {!spellOpen && !attOpen && !itemOpen && !skillOpen && !saveOpen && (
        <button
          onClick={() => {
            setAttOpen(true);
          }}
          className="btn btn-danger"
        >
          Attack
        </button>
      )}
      {spellOpen && (
        <>
          <button onClick={handleSpell} className="btn btn-success">
            Cast
          </button>
          <button
            onClick={() => {
              setSpellOpen(false);
            }}
            className="btn btn-danger"
          >
            Cancel
          </button>
          <select
            className="form-control"
            style={{ width: "180px", display: "inline-block" }}
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
        </>
      )}
      {!attOpen && !spellOpen && !itemOpen && !skillOpen && !saveOpen && (
        <button
          onClick={() => {
            setSpellOpen(true);
          }}
          className="btn btn-info"
        >
          Spell
        </button>
      )}
      {itemOpen && (
        <>
          <button onClick={handleItem} className="btn btn-success">
            Use
          </button>
          <button
            onClick={() => {
              setItemOpen(false);
            }}
            className="btn btn-danger"
          >
            Cancel
          </button>
          <select
            className="form-control"
            style={{ width: "180px", display: "inline-block" }}
            name="itemIndex"
            value={itemIndex}
            onChange={(e) => {
              setItemIndex(e.target.value);
            }}
          >
            {usableItems.length > 0 &&
              usableItems.map((item, i) => {
                return (
                  <option key={uuid()} value={i}>
                    ({item.quantity}) {item.name}
                  </option>
                );
              })}
          </select>
          <br />
        </>
      )}
      {!attOpen && !spellOpen && !itemOpen && !skillOpen && !saveOpen && (
        <button
          onClick={() => {
            setItemOpen(true);
          }}
          className="btn btn-secondary"
        >
          Item
        </button>
      )}
      {skillOpen && (
        <>
          <button onClick={handleSkill} className="btn btn-success">
            Try
          </button>
          <button
            onClick={() => {
              setSkillOpen(false);
            }}
            className="btn btn-danger"
          >
            Cancel
          </button>
          <select
            className="form-control"
            style={{ width: "180px", display: "inline-block" }}
            name="skillIndex"
            value={skillIndex}
            onChange={(e) => {
              setSkillIndex(e.target.value);
            }}
          >
            {skills.length > 0 &&
              skills.map((skill, i) => {
                return (
                  <option key={uuid()} value={i}>
                    {skill.name} +{skill.bonus}
                  </option>
                );
              })}
          </select>
        </>
      )}
      {!attOpen && !spellOpen && !skillOpen && !itemOpen && !saveOpen && (
        <button
          onClick={() => {
            setSkillOpen(true);
          }}
          className="btn btn-warning"
        >
          skill
        </button>
      )}
      {saveOpen && (
        <>
          <button onClick={handleSave} className="btn btn-success">
            Roll
          </button>
          <button
            onClick={() => {
              setSaveOpen(false);
            }}
            className="btn btn-danger"
          >
            Cancel
          </button>
          <br />
          <select
            className="form-control"
            style={{ width: "120px", display: "inline-block" }}
            name="saveType"
            value={saveType}
            onChange={(e) => {
              setSaveType(e.target.value);
            }}
          >
            <option key={uuid()} value='fort'>
              Fortitude
            </option>
            <option key={uuid()} value='ref'>
              Reflex
            </option>
            <option key={uuid()} value='will'>
              Will
            </option>
          </select>
          DC:
          <input
            style={{ width: "80px", display: "inline-block" }}
            className="form-control"
            type="number"
            name="dc"
            value={dc}
            onChange={(e) => {
              setDc(e.target.value);
            }}
          />
        </>
      )}
      {!attOpen && !spellOpen && !saveOpen && !itemOpen && !skillOpen && (
        <button
          onClick={() => {
            setSaveOpen(true);
          }}
          className="btn btn-primary"
        >
          save
        </button>
      )}
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
    </div>
  );
}

export default connect(null, { setAlert })(PlayerStats);
