import React, { useState } from "react";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";

export const AttackForm = ({ addAttack, setAttackOpen }) => {
  const [numOpen, setNumOpen] = useState(1);

  const [attack, setAttack] = useState({
    weapon: "",
    hit: 1,
    amountOfDice: 1,
    diceType: 6,
    plus: 1,
    critOn: 20,
    critTimes: 2,
  });

  const {
    weapon,
    hit,
    amountOfDice,
    diceType,
    plus,
    critOn,
    critTimes,
  } = attack;

  const onChange = (e) => {
    setAttack({ ...attack, [e.target.name]: e.target.value });
  };

  const submitAction = (e) => {
    e.preventDefault();
    addAttack(e, attack)
    setAttackOpen(false);
  };

  return (
    <div>
       <form id="actionForm" onSubmit={submitAction}></form>
      <div
        className="form-group"
        style={{ width: "150px", display: "inline-block" }}
      >
        <label htmlFor="attackWeapon">Weapon</label>
        <input
          id="attackWeapon"
          className="form-control"
          form="actionForm"
          type="text"
          placeholder="Weapon"
          name="weapon"
          value={weapon}
          onChange={onChange}
        />
      </div>
      <div
        className="form-group"
        style={{ width: "50px", display: "inline-block" }}
      >
        <label htmlFor="attackBonus">Hit Bonus</label>
        <input
          id="attackBonus"
          className="form-control"
          form="actionForm"
          type="number"
          placeholder="Hit"
          name="hit"
        value={hit}
          onChange={onChange}
        />
      </div>
      <div
        className="form-group"
        style={{ width: "50px", display: "inline-block", marginLeft: "10px" }}
      >
        <label htmlFor="attackDie">Damage</label>
        <input
          id="attackDie"
          className="form-control"
          form="actionForm"
          type="number"
          placeholder="1"
          name="amountOfDice"
          min="1"
          max="5"
        value={amountOfDice}
          onChange={onChange}
        />
      </div>
      D
      <div
        className="form-group"
        style={{ width: "65px", display: "inline-block" }}
      >
      <select
       className="form-control"
        name="diceType"
        value={diceType}
        onChange={onChange}
        form="actionForm"
      >
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={6}>6</option>
        <option value={8}>8</option>
        <option value={10}>10</option>
        <option value={12}>12</option>
      </select>
      </div>
         +
         <div
        className="form-group"
        style={{ width: "50px", display: "inline-block" }}
      >
        <input
          className="form-control"
          form="actionForm"
          type="number"
          placeholder="1"
          name="plus"
          size="2"
          value={plus}
          onChange={onChange}
        />
      </div>
      <div
        className="form-group"
        style={{ width: "65px", display: "inline-block", marginLeft: "10px" }}
      >
      <label htmlFor="attackCrit">Critical</label>
      <select
      id="attackCrit"
       className="form-control"
        name="critOn"
        value={critOn}
        onChange={onChange}
        form="actionForm"
      >
       <option value={20}>20</option>
        <option value={19}>19-20</option>
        <option value={18}>18-20</option>
        <option value={17}>17-20</option>
      </select>
      </div>
      X
      <div
        className="form-group"
        style={{ width: "50px", display: "inline-block" }}
      >
        <input
          className="form-control"
          form="actionForm"
          type="number"
          placeholder="1"
          name="critTimes"
          min="1"
          max="3"
        value={critTimes}
          onChange={onChange}
        />
      </div>
      <br/>
      <button
        className="btn btn-primary"
        onClick={(e) => {
          addAttack(e, attack);
          setAttackOpen(false);
        }}
      >
        Add Attack
      </button>
      <button
      style={{marginLeft: "10px"}}
        className="btn btn-secondary"
        onClick={(e) => {
          setAttackOpen(false);
        }}
      >
        Cancel
      </button>
    </div>
  );
};
