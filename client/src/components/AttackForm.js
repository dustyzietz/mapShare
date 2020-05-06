import React, { useState } from "react";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";

export const AttackForm = ({ addAttack }) => {
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

 const { weapon, hit, amountOfDice, diceType, plus, critOn, critTimes } = attack;
  
 const onChange = (e) => {
    setAttack({ ...attack, [e.target.name]: e.target.value });
  };

 

  return (
    <div style={{ margin: "25px 0" }}>
      Weapon:
      <Input
        type="string"
        onChange={onChange}
        name="weapon"
        form="actionForm"
        value={weapon}
      />
       <button
        className="btn"
        onClick={(e) => {
          addAttack(e, attack);
          console.log(attack);
        }}
      >
        Add Attack
      </button>
      <br />
      Hit Bonus:
      <Input
        style={{ width: "30px" }}
        type="number"
        onChange={onChange}
        name="hit"
        min="1"
        max="3"
        value={hit}
      />
      Damage:
      <Input
        style={{ width: "30px" }}
        type="number"
        onChange={onChange}
        name="amountOfDice"
        min="1"
        max="3"
        value={amountOfDice}
      />
      D
      <Select
        name="diceType"
        value={diceType}
        onChange={onChange}
        style={{ width: "55px" }}
        form="actionForm"
      >
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={6}>6</option>
        <option value={8}>8</option>
        <option value={10}>10</option>
        <option value={12}>12</option>
      </Select>
      Plus
      <Input
        value={plus}
        type="number"
        size="2"
        onChange={onChange}
        name="plus"
        form="actionForm"
        style={{ width: "55px" }}
      />
      Critical
      <Select
        name="critOn"
        placeholder="Critical"
        onChange={onChange}
        value={critOn}
        form="actionForm"
      >
        <option value={20}>20</option>
        <option value={19}>19-20</option>
        <option value={18}>18-20</option>
        <option value={17}>17-20</option>
      </Select>
      <Select
        form="actionForm"
        name="critTimes"
        placeholder="X"
        style={{ width: "55px" }}
        onChange={onChange}
        value={critTimes}
      >
        <option value={2}>X 2</option>
        <option value={3}>X 3</option>
      </Select>
     
    </div>
  );
};
