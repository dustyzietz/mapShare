import React, { useState, useEffect } from "react";

const SpellForm = ({ addSpell, setSpellsOpen, currentSpell, setCurrentSpell  }) => {
 
  const [spell, setSpell] = useState({
   name: "",
    effect: "",
    dc: "",
    other: "",
  });

  const {
   name,
   effect,
   dc,
   other,
  } = spell;

  const onChange = (e) => {
    setSpell({ ...spell, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if(currentSpell){
      setSpell(currentSpell)
    }
  },[currentSpell])

  return (
    <div>
      <div
        className="form-group"
        style={{ width: "100px", display: "inline-block" }}
      >
        <label htmlFor="spellName">Spell</label>
        <input
          id="spellName"
          className="form-control"
          form="spellForm"
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={onChange}
        />
      </div>
      <div
        className="form-group"
        style={{ width: "200px", display: "inline-block" }}
      >
        <label htmlFor="spellEffect">Effect</label>
        <input
          id="spellEffect"
          className="form-control"
          form="spellForm"
          type="text"
          placeholder="Effect"
          name="effect"
        value={effect}
          onChange={onChange}
        />
      </div>
      <div
        className="form-group"
        style={{ width: "80px", display: "inline-block"}}
      >
        <label htmlFor="spelldc">DC</label>
        <input
          id="spelldc"
          className="form-control"
          form="spellForm"
          type="text"
          placeholder="15 Will"
          name="dc"
        value={dc}
          onChange={onChange}
        />
      </div>
      
         <div
        className="form-group"
        style={{ width: "80px", display: "inline-block" }}
      >
         <label htmlFor="spellOther">Other</label>
        <input
        id="spellOther"
          className="form-control"
          form="actionForm"
          type="text"
          placeholder="other"
          name="other"
          value={other}
          onChange={onChange}
        />
      </div>
      <br/>
      <button
        className="btn btn-info"
        onClick={(e) => {
          addSpell(e, spell);
          setCurrentSpell()
           setSpellsOpen(false);
        }}
      >
        Add Spell
      </button>
      <button
      style={{marginLeft: "10px"}}
        className="btn btn-secondary"
        onClick={(e) => {
          setSpellsOpen(false);
        }}
      >
        Cancel
      </button>
    </div>
  );
};


export default SpellForm



