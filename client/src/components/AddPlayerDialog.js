import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { AttackForm } from "./AttackForm";
import SpellForm from "./SpellForm";
import ItemForm from "./ItemForm";
import SkillForm from "./SkillForm";
import uuid from "uuid";
import { connect } from "react-redux";
import { addSavedPlayer, editPlayer  } from "../actions/players";
import { useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";

 const AddPlayerDialog = ({ isMonster, playerToEdit, edit, formOpen, setFormOpen, editPlayer, addSavedPlayer }) => {
  const [attackOpen, setAttackOpen] = useState(false);
  const [spellsOpen, setSpellsOpen] = useState(false);
  const [itemOpen, setItemOpen] = useState(false);
  const [skillOpen, setSkillOpen] = useState(false);
  const [currentAttack, setCurrentAttack] = useState() 
  const [currentSpell, setCurrentSpell] = useState() 
  const [currentItem, setCurrentItem] = useState() 
  const [currentSkill, setCurrentSkill] = useState() 


  const [player, setPlayer] = useState({
    name: "",
    url: "",
    monster: isMonster,
    hp: 0,
    ac: 0,
    speed: 0,
    attacks: [],
    spells: [],
    usableItems: [],
    skills: [],
    items: "",
    str: 0,
    int: 0,
    wis: 0,
    dex: 0,
    con: 0,
    cha: 0,
    fort: 0,
    ref: 0,
    will: 0,
  });

  useEffect(()=>{
    if(edit){
    setPlayer(playerToEdit)
    }
  },[playerToEdit])

  const handleClose = () => {
    setFormOpen(false);
  };

  const addAttack = (e, attack) => {
    e.preventDefault();
  if(currentAttack){
   let newAttacks = attacks.filter(a => a.weapon !== currentAttack.weapon) 
   setPlayer({ ...player, attacks: [...newAttacks, attack] });
  }else{
    setPlayer({ ...player, attacks: [...attacks, attack] });
  }

  };

  const addSpell = (e, spell) => {
    e.preventDefault();
    if(currentSpell){
      let newSpells = spells.filter(a => a.name !== currentSpell.name) 
      setPlayer({ ...player, attacks: [...newSpells, spell] });
     }else{
       setPlayer({ ...player, spells: [...spells, spell] });
     }
  };

  const addItem = (e, item) => {
    e.preventDefault();
    if(currentItem){
      let newItems = usableItems.filter(a => a.name !== currentItem.name) 
      setPlayer({ ...player, usableItems: [...newItems, item] });
     }else{
       setPlayer({ ...player, usableItems: [...usableItems, item] });
     }
  };

  const addSkill = (e, skill) => {
    e.preventDefault();
  
       setPlayer({ ...player, skills: [...skills, skill] });
     }
  



  const {
    name,
    url,
    monster,
    hp,
    ac,
    speed,
    attacks,
    spells,
    usableItems,
    skills,
    items,
    str,
    int,
    wis,
    dex,
    con,
    cha,
    fort,
    ref,
    will,
  } = player;

  const onChange = (e) =>
    setPlayer({ ...player, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
 if(edit){editPlayer(player)} 
 else{
  console.log(player) 
  addSavedPlayer(player)}
  
    setPlayer({
      name: "",
      url: "",
      monster: isMonster,
      hp: 0,
      ac: 0,
      speed: 0,
      attacks: [],
      spells: [],
      usableItems: [],
      skills: [],
      items: "",
      str: 0,
      int: 0,
      wis: 0,
      dex: 0,
      con: 0,
      cha: 0,
      fort: 0,
      ref: 0,
      will: 0,
    });
    handleClose();
  };

  const submitSpell = (e) => {
    e.preventDefault();
    console.log("Spell Added");
  };

  const submitItem = (e) => {
    e.preventDefault();
    console.log("Item Added");
  };

  const submitSkill = (e) => {
    e.preventDefault();
    console.log("Skill Added");
  };

const handleAttackEdit = (index) => {
   setAttackOpen(true)
   setCurrentAttack(attacks[index])
}

const handleAttackDelete = (index) => {
    const theAttacks = attacks
    theAttacks.splice(index, 1)
   setPlayer({ ...player, attacks: theAttacks })
}

const handleSpellEdit = () => {
  
}

const handleSpellDelete = (index) => {
    const theSpells = spells
    theSpells.splice(index, 1)
   setPlayer({ ...player, spells: theSpells })
}

const handleItemEdit = () => {
  
}

const handleItemDelete = (index) => {
     const theItems = usableItems
     theItems.splice(index, 1)
    setPlayer({ ...player, usableItems: theItems })
}

const handleSkillEdit = () => {
  
}

const handleSkillDelete = (index) => {
     const theSkill = skills
     theSkill.splice(index, 1)
    setPlayer({ ...player, skills: theSkill })
}
  return (
    <div>
      <Dialog
        maxWidth="lg"
        fullWidth
        open={formOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        style={{ zIndex: "1" }}
      >
        <DialogContent>
          <div style={{ display: "flex", textAlign: "center" }}>
            <form id="spellForm" onSubmit={submitSpell}></form>
            <form id="itemForm" onSubmit={submitItem}></form>
            <form id="skillForm" onSubmit={submitSkill}></form>
            <form id="form" className="form" onSubmit={onSubmit}></form>
            <div style={{ flexGrow: "1" }}>
              <h2>Create Player</h2>
              <div className="form-group">
                <small className="form-text">
                  <ul>
                    <li>Find a picture of your monster online</li>
                    <li>Right click on it</li>
                    <li>Click on copy image address</li>
                    <li>Paste it in below</li>
                  </ul>
                </small>
                {url && (
                  <div>
                    <img src={url} alt="player" style={{ maxWidth: "400px",border: '2px solid #325D88', borderRadius: '0.25rem' }} />
                  </div>
                )}
                <label htmlFor="imageAddress">Image address</label>
                <input
                  type="text"
                  onChange={onChange}
                  value={url}
                  name="url"
                  form="form"
                  className="form-control"
                  id="imageAddress"
                  placeholder="Image Address"
                />
                <small className="form-text text-muted">helper text</small>
              </div>
            </div>
            <div style={{ flexGrow: "3" }}>
              <div className="form-group">
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    name="monster"
                    value={monster}
                    onChange={() => {
                      setPlayer({ ...player, monster: !monster });
                    }}
                    className="custom-control-input"
                    id="switch1"
                    checked={monster}
                  />
                  <label className="custom-control-label" htmlFor="switch1">
                    Player/Monster
                  </label>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ flexGrow: "1" }}>
                  <div
                    className="form-group"
                    style={{ width: "200px", display: "inline-block" }}
                  >
                    <label htmlFor="playerName">Name</label>
                    <input
                      id="playerName"
                      className="form-control"
                      form="form"
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={name}
                      onChange={onChange}
                    />
                  </div>
                  <br />
                  <div
                    className="form-group"
                    style={{ width: "60px", display: "inline-block" }}
                  >
                    <label htmlFor="playerHp">Hit Points</label>
                    <input
                      id="playerHp"
                      className="form-control"
                      form="form"
                      type="number"
                      placeholder="HP"
                      name="hp"
                      value={hp}
                      onChange={onChange}
                    />
                  </div>
                  <div
                    className="form-group"
                    style={{ width: "60px", display: "inline-block" }}
                  >
                    <label htmlFor="playerAc">Armor Class</label>
                    <input
                      id="playerAc"
                      className="form-control"
                      form="form"
                      type="number"
                      placeholder="AC"
                      name="ac"
                      value={ac}
                      onChange={onChange}
                    />
                  </div>
                  <div
                    className="form-group"
                    style={{ width: "60px", display: "inline-block" }}
                  >
                    <label htmlFor="playerSpeed">Speed</label>
                    <input
                      id="playerSpeed"
                      className="form-control"
                      form="form"
                      type="number"
                      placeholder="Speed"
                      name="speed"
                      value={speed}
                      onChange={onChange}
                    />
                  </div>
                  <br />
                  <strong> Attacks: </strong>
                  {attackOpen ? (
                    <>
                      <AttackForm 
                        addAttack={addAttack}
                        setAttackOpen={setAttackOpen}
                        currentAttack={currentAttack}
                        setCurrentAttack={setCurrentAttack}
                      />
                    </>
                  ) : (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        setCurrentAttack()
                        setAttackOpen(true);
                      }}
                      style={{ marginLeft: "20px" }}
                    >
                      Add
                    </button>
                  )}
                  <br />
                  {attacks.length > 0
                    ? attacks.map((a, i) => {
                        return (
                          <div
                            key={uuid()}
                          >{`${a.weapon}`}
                          <IconButton size='small' onClick={()=>{handleAttackEdit(i)}} >
                            <Edit style={{height: '14px'}} />
                          </IconButton>
                          <IconButton size='small' onClick={()=>{handleAttackDelete(i)}}>
                            <Delete style={{height: '14px'}} />
                          </IconButton>
                          <br/>
                          {`hit: +${a.hit} damage: ${a.amountOfDice}D${a.diceType}+${a.plus} CRIT: `}
                          {a.critOn === 21 ? `none`: `${a.critOn}x${a.critTimes}`}
                          </div>
                        );
                      })
                    : "none"}
                  <br />
                  <strong> Spells/Magic Abilities: </strong>
                  {spellsOpen ? (
                    <>
                      <SpellForm
                        addSpell={addSpell}
                        setSpellsOpen={setSpellsOpen}
                        setCurrentSpell={setCurrentSpell}
                      />
                    </>
                  ) : (
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => {
                        setSpellsOpen(true);
                      }}
                      style={{ marginLeft: "20px" }}
                    >
                      Add
                    </button>
                  )}
                  <br />
                  {spells.length > 0
                    ? spells.map((spell, i) => {
                        return (
                          <div
                            key={uuid()}
                          >{`${spell.name}`}
                           <IconButton size='small' onClick={()=>{handleSpellEdit(i)}}>
                            <Edit style={{height: '14px'}} />
                          </IconButton>
                          <IconButton size='small' onClick={()=>{handleSpellDelete(i)}}>
                            <Delete style={{height: '14px'}} />
                          </IconButton>
                           <br/> {`${spell.effect} ${spell.dc} ${spell.other} `}</div>
                        );
                      })
                    : "none"}

                  <br />
                  <strong>Usable Items: </strong>
                  {itemOpen ? (
                    <>
                      <ItemForm addItem={addItem} setItemOpen={setItemOpen} />
                    </>
                  ) : (
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        setItemOpen(true);
                      }}
                      style={{ marginLeft: "20px" }}
                    >
                      Add
                    </button>
                  )}
                  <br />
                  {usableItems.length > 0
                    ? usableItems.map((item, i) => {
                        return (
                          <div
                            key={uuid()}
                          >{`${item.quantity} ${item.name}`} 
                           <IconButton size='small' onClick={()=>{handleItemEdit(i)}}>
                          <Edit style={{height: '14px'}} />
                        </IconButton>
                        <IconButton size='small' onClick={()=>{handleItemDelete(i)}}>
                          <Delete style={{height: '14px'}} />
                        </IconButton>
                           <br/>{`${item.effect}`}</div>
                        );
                      })
                    : "none"}

                  <br />
                  <strong>Skills: </strong>
                  {skillOpen ? (
                    <>
                      <SkillForm
                        addSkill={addSkill}
                        setSkillOpen={setSkillOpen}
                      />
                    </>
                  ) : (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => {
                        setSkillOpen(true);
                      }}
                      style={{ marginLeft: "20px" }}
                    >
                      Add
                    </button>
                  )}
                  <br />
                  {skills.length > 0
                    ? skills.map((skill, i) => {
                        return (
                          <div
                            key={uuid()}
                          >{`${skill.name} +${skill.bonus} `} 
                           <IconButton size='small' onClick={() => {handleSkillEdit(i)}}>
                          <Edit style={{height: '14px'}} />
                        </IconButton>
                        <IconButton size='small' onClick={() => {handleSkillDelete(i)}}>
                          <Delete style={{height: '14px'}} />
                        </IconButton></div>
                        );
                      })
                    : "none"}
                  <br />
                  <div
                    className="form-group"
                    style={{ width: "400px", display: "inline-block" }}
                  >
                    <label htmlFor="playerItems">
                      <strong>Items:</strong>
                    </label>
                    <input
                      id="playerItems"
                      className="form-control"
                      form="form"
                      type="text"
                      placeholder="Items"
                      name="items"
                      value={items}
                      onChange={onChange}
                    />
                  </div>
                  <br/>
                  <input form="form" type="submit" className="btn btn-primary my-1" />
                  </div>
                  <div style={{ flexGrow: "1" }}>
                 
                        <strong style={{textDecoration:'underline'}}>Saves</strong> 
                        <br/>
                        Strength:{" "}
                        <div
                          className="form-group"
                          style={{ width: "60px", display: "inline-block" }}
                        >
                          <input
                            className="form-control"
                            form="form"
                            type="number"
                            placeholder="Str"
                            name="str"
                            value={str}
                            onChange={onChange}
                            style={{ display: "inline-block" }}
                          />
                        </div>
                        <br />
                        Intelligence:{" "}
                        <div
                          className="form-group"
                          style={{ width: "60px", display: "inline-block" }}
                        >
                          <input
                            className="form-control"
                            form="form"
                            type="number"
                            placeholder="Int"
                            name="int"
                            value={int}
                            onChange={onChange}
                            style={{ display: "inline-block" }}
                          />
                        </div>
                        <br />
                        Wisdom:{" "}
                        <div
                          className="form-group"
                          style={{ width: "60px", display: "inline-block" }}
                        >
                          <input
                            className="form-control"
                            form="form"
                            type="number"
                            placeholder="Wis"
                            name="wis"
                            value={wis}
                            onChange={onChange}
                            style={{ display: "inline-block" }}
                          />
                        </div>
                        <br />
                        Dexterity:{" "}
                        <div
                          className="form-group"
                          style={{ width: "60px", display: "inline-block" }}
                        >
                          <input
                            className="form-control"
                            form="form"
                            type="number"
                            placeholder="Dex"
                            name="dex"
                            value={dex}
                            onChange={onChange}
                            style={{ display: "inline-block" }}
                          />
                        </div>
                        <br />
                        Constitution:{" "}
                        <div
                          className="form-group"
                          style={{ width: "60px", display: "inline-block" }}
                        >
                          <input
                            className="form-control"
                            form="form"
                            type="number"
                            placeholder="Con"
                            name="con"
                            value={con}
                            onChange={onChange}
                            style={{ display: "inline-block" }}
                          />
                        </div>
                        <br />
                        Charisma:{" "}
                        <div
                          className="form-group"
                          style={{ width: "60px", display: "inline-block" }}
                        >
                          <input
                            className="form-control"
                            form="form"
                            type="number"
                            placeholder="Cha"
                            name="cha"
                            value={cha}
                            onChange={onChange}
                            style={{ display: "inline-block" }}
                          />
                        </div>
                        <br/>
                        <strong style={{textDecoration:'underline'}}>Saves</strong>
                        <br/>
                       Fortitude: +
                        <div
                          className="form-group"
                          style={{ width: "60px", display: "inline-block" }}
                        >
                          <input
                            id="fortitude"
                            className="form-control"
                            form="form"
                            type="number"
                            placeholder="Fort"
                            name="fort"
                            value={fort}
                            onChange={onChange}
                            style={{ display: "inline-block" }}
                          />
                        </div>
                        <br />
                        Reflex: +
                        <div
                          className="form-group"
                          style={{ width: "60px", display: "inline-block" }}
                        >
                          <input
                            className="form-control"
                            form="form"
                            type="number"
                            placeholder="Ref"
                            name="ref"
                            value={ref}
                            onChange={onChange}
                            style={{ display: "inline-block" }}
                          />
                        </div>
                        <br />
                        Will: +
                        <div
                          className="form-group"
                          style={{ width: "60px", display: "inline-block" }}
                        >
                          <input
                            className="form-control"
                            form="form"
                            type="number"
                            placeholder="Will"
                            name="will"
                            value={will}
                            onChange={onChange}
                            style={{ display: "inline-block" }}
                          />
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default connect(null,{addSavedPlayer, editPlayer})(AddPlayerDialog) 