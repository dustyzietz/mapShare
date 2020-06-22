import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { AttackForm } from "./AttackForm";
import SpellForm from "./SpellForm";
import ItemForm from "./ItemForm";
import SkillForm from "./SkillForm";
import Input from "@material-ui/core/Input";
import uuid from "uuid";

export const AddPlayerDialog = ({ addSavedPlayer, isMonster }) => {
  const [open, setOpen] = useState(false);
  const [attackOpen, setAttackOpen] = useState(false);
  const [spellsOpen, setSpellsOpen] = useState(false);
  const [itemOpen, setItemOpen] = useState(false);
  const [skillOpen, setSkillOpen] = useState(false);

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addAttack = (e, attack) => {
    console.log(attack);
    e.preventDefault();
    setPlayer({ ...player, attacks: [...attacks, attack] });
  };

  const addSpell = (e, spell) => {
    console.log(spell);
    e.preventDefault();
    setPlayer({ ...player, spells: [...spells, spell] });
  };

  const addItem = (e, item) => {
    console.log(item);
    e.preventDefault();
    setPlayer({ ...player, usableItems: [...usableItems, item] });
  };

  const addSkill = (e, skill) => {
    console.log(skill);
    e.preventDefault();
    setPlayer({ ...player, skills: [...skills, skill] });
  };

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
    addSavedPlayer(player);
    setPlayer({
      name: "",
      url: "",
      monster: false,
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

  return (
    <div>
      <button
        className={`btn btn-${isMonster ? 'danger' : 'info'}`}
        onClick={handleClickOpen}
        style={{ float: "left" }}
      >
       {isMonster
       ?
       'New Monster' 
       :
       'Make New Player'
       } 
      </button>
      <Dialog
        maxWidth="lg"
        fullWidth
        open={open}
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
                      />
                    </>
                  ) : (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        setAttackOpen(true);
                      }}
                      style={{ marginLeft: "20px" }}
                    >
                      Add
                    </button>
                  )}
                  <br />
                  {attacks.length > 0
                    ? attacks.map((a) => {
                        return (
                          <div
                            key={uuid()}
                          >{`${a.weapon} ${a.amountOfDice}D${a.diceType}+${a.plus} CRIT${a.critOn}x${a.critTimes} `}</div>
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
                    ? spells.map((spell) => {
                        return (
                          <div
                            key={uuid()}
                          >{`${spell.name} ${spell.effect} ${spell.dc} ${spell.other} `}</div>
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
                    ? usableItems.map((item) => {
                        return (
                          <div
                            key={uuid()}
                          >{`${item.quantity} ${item.name} ${item.effect}`}</div>
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
                    ? skills.map((skill) => {
                        return (
                          <div
                            key={uuid()}
                          >{`${skill.name} +${skill.bonus} `}</div>
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

            {/* 
             
             
          
            <div className="form-group">
              
              <Input
                form="form"
                type="text"
                placeholder="Spell/Abilities"
                name="spells"
                value={spells}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <Input
                form="form"
                type="text"
                placeholder="Skills"
                name="skills"
                value={skills}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <Input
                form="form"
                type="text"
                placeholder="Usable Items"
                name="items"
                value={items}
                onChange={onChange}
              />
            </div>
            <input form="form" type="submit" className="btn btn-primary my-1" /> */}
        </DialogContent>
      </Dialog>
    </div>
  );
};
