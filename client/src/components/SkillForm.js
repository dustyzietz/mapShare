import React, { useState } from "react";

const SkillForm = ({ addSkill, setSkillOpen }) => {
 
  const [skill, setSkill] = useState({
    name: "",
    bonus: 0,
  });

  const {
  name,
  bonus,
  } = skill;

  const onChange = (e) => {
    setSkill({ ...skill, [e.target.name]: e.target.value });
  };

  return (
    <>
           <div className="form-group"   style={{width:"200px",display:"inline-block"}}>
                <label htmlFor="skillName">Skill</label>
                <input
                  id="skillName"
                  className="form-control"
                  form="form"
                  type="text"
                  placeholder="Skill"
                  name="name"
                  value={name}
                  onChange={onChange}
                />
              </div>
              +
              <div className="form-group"   style={{width:"80px",display:"inline-block"}}>
                <label htmlFor="skillBonus">Bonus</label>
                <input
                  id="skillBonus"
                  className="form-control"
                  form="form"
                  type="number"
                  placeholder="Bonus"
                  name="bonus"
                  value={bonus}
                  onChange={onChange}
                />
              </div>
              <br/>
      <button
        className="btn btn-primary"
        onClick={(e) => {
          addSkill(e, skill);
          setSkillOpen(false);
        }}
      >
        Add Skill
      </button>
      <button
      style={{marginLeft: "10px"}}
        className="btn btn-secondary"
        onClick={(e) => {
          setSkillOpen(false);
        }}
      >
        Cancel
      </button>
    </>
  );
};


export default SkillForm



