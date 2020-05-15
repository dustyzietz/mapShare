import React,{useState, useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { AttackForm } from './AttackForm';
import { editPlayer } from "../actions/players";
import Input from "@material-ui/core/Input";
import uuid from 'uuid';
import { connect } from "react-redux";
import PropTypes from "prop-types";


const EditPlayer = ({ editPlayer, open, setOpen, editedPlayer }) => {
  const [player, setPlayer] = useState({
    name: '',
      url: '',
        hp: 0,
        ac: 0,
        speed: 0,
        spells: '',
        skills: '',
        items: '',
        saves: '',
        attacks:[]
  });

   useEffect(() => {
    setPlayer(editedPlayer);
  }, [editedPlayer]);


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

  const {
    name,
    url,
     hp,
      ac,
      speed,
      spells,
      skills,
      items,
      saves,
      abilities,
      attacks
  } = player;

  

  const onChange = e =>
    setPlayer({ ...player, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    editPlayer(player);
    handleClose();
  };
  
  const submitAction = (e) => {
    e.preventDefault();
    console.log('Action Added');
  }

  return (
    <div>
      <Dialog maxWidth='sm' fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title" style={{zIndex:'2'}}>
        <DialogContent style={{textAlign: 'center'}}>
          <div>
<h2>Create Player</h2>
<form id="actionForm" onSubmit={submitAction}></form>
<form id="form" className="form" onSubmit={onSubmit}> </form>
        <div className="form-group">
        <small className="form-text">
            <ul>
              <li>Find a picture of your monster online</li>
              <li>Right click on it</li>
              <li>Click on copy image address</li>
              <li>Paste it in below</li>
            </ul>
          </small>
          <Input
           style={{width:'80%'}} 
            form='form'
            type="text"
            placeholder="Your Image Address"
            name="url"
            value={url}
            onChange={onChange}
            rows='3'
          />
        </div>
        <div className="form-group">
          <Input
          form='form'
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>
        <span className="form-group inline-input">
          HP:
          <Input
           style={{width:'80px'}} 
          form='form'
            type="number"
            placeholder="Hit Points"
            name="hp"
            value={hp}
            onChange={onChange}
          />
        </span>
        <span className="form-group inline-input">
          AC:
          <Input
           style={{width:'80px'}} 
          form='form'
            type="number"
            placeholder="Armor Class"
            name="ac"
            value={ac}
            onChange={onChange}
          />
        </span>
       {''}
        <span className="form-group inline-input">
           Speed:
          <Input
           style={{width:'80px'}} 
          form='form'
            type="number"
            placeholder="Speed"
            name="speed"
            value={speed}
            onChange={onChange}
          />
        </span>
       <AttackForm addAttack={addAttack}/>
        <div className="form-group">
          {attacks && attacks.length > 0 &&
          attacks.map(a => {
            return (
            <div key={uuid()}>{`${a.weapon} ${a.amountOfDice}D${a.diceType}+${a.plus} CRIT${a.critOn}x${a.critTimes} `}</div>
            )
          })
          }
          <Input
          form='form'
            type="text"
            placeholder="Spell/Abilities"
            name="spells"
            value={spells}
            onChange={onChange}
            style={{width:'80%'}} 
          />
        </div>
        
        <div className="form-group">
          <Input
          form='form'
            type="text"
            placeholder="Skills"
            name="skills"
            value={skills}
            onChange={onChange}
            style={{width:'80%'}} 
          />
        </div>
        <div className="form-group">
          <Input
            style={{width:'80%'}} 
          form='form'
            type="text"
            placeholder="Usable Items"
            name="items"
            value={items}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <Input
            style={{width:'80%'}} 
          form='form'
            type="text"
            placeholder="Saves: Fortitude/Reflex/Will"
            name="saves"
            value={saves}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <Input
            style={{width:'80%'}} 
          form='form'
            type="text"
            placeholder="Abilities: Str/Dex/Con/Int/Wis/Cha"
            name="abilities"
            value={abilities}
            onChange={onChange}
          />
        </div>
<input form='form' type="submit" className="btn btn-primary my-1" />
</div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

 EditPlayer.propTypes = {
   editPlayer: PropTypes.func.isRequired,
 };

 export default connect(null, {
   editPlayer,
 })(EditPlayer);




// import React, { useState, useEffect } from "react";
// import Dialog from "@material-ui/core/Dialog";
// import DialogContent from "@material-ui/core/DialogContent";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import { editPlayer } from "../actions/players";
// import { AttackForm } from "./AttackForm";
// import uuid from "uuid";

// const EditPlayer = ({ editPlayer, open, setOpen, editedPlayer }) => {
//   const [player, setPlayer] = useState({
//     _id: "",
//     name: "",
//     url: "",
//     hp: 0,
//     ac: 0,
//     speed: 0,
//     currentHp: 0,
//     attacks: [],
//     spells: "",
//     skills: "",
//     items: "",
//     saves: "",
//     abilities: "",
//     controlledPosition: { x: 0, y: 0 },
//   });

//   useEffect(() => {
//     setPlayer(editedPlayer);
//   }, [editedPlayer]);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const {
//     name,
//     playerUrl,
//     hp,
//     ac,
//     speed,
//     attacks,
//     spells,
//     skills,
//     items,
//     saves,
//     abilities,
//   } = player;

//   const onChange = (e) =>
//     setPlayer({ ...player, [e.target.name]: e.target.value });

//   const onSubmit = (e) => {
//     e.preventDefault();
//     editPlayer(player);
//     handleClose();
//   };

//   const addAttack = (e, attack) => {
//     console.log(attack)
//     e.preventDefault();
//     setPlayer({ ...player, attacks: [...attacks, attack] });
//   };

//   const deleteAttack = index => {
//     const newAttacks = attacks
//     newAttacks.splice(index, 1);
//     setPlayer({...player, attacks: newAttacks });
//   };

//   return (
//     <div>
//       <Dialog
//         maxWidth="sm"
//         fullWidth
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="form-dialog-title"
//       >
//         <DialogContent style={{ textAlign: "center" }}>
//           <div>
//             <h2>Create Character</h2>
//             <form className="form" onSubmit={onSubmit}>
//               <div className="form-group">
//                 <small className="form-text">
//                   <ul>
//                     <li>Find a picture of your character online</li>
//                     <li>Right click on it</li>
//                     <li>Click on copy image address</li>
//                     <li>Paste it in below</li>
//                   </ul>
//                 </small>
//                 <textarea
//                   type="text"
//                   placeholder="Your Image Address"
//                   name="playerUrl"
//                   value={playerUrl}
//                   onChange={onChange}
//                   rows="3"
//                 />
//               </div>
//               <div className="form-group">
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   name="name"
//                   value={name}
//                   onChange={onChange}
//                 />
//               </div>
//               <span className="form-group inline-input">
//                 HP:
//                 <input
//                   type="number"
//                   placeholder="Hit Points"
//                   name="hp"
//                   value={hp}
//                   onChange={onChange}
//                 />
//               </span>
//               <span className="form-group inline-input">
//                 AC:
//                 <input
//                   type="number"
//                   placeholder="Armor Class"
//                   name="ac"
//                   value={ac}
//                   onChange={onChange}
//                 />
//               </span>
//               {""}
//               <span className="form-group inline-input">
//                 Speed:
//                 <input
//                   type="number"
//                   placeholder="Speed"
//                   name="speed"
//                   value={speed}
//                   onChange={onChange}
//                 />
//               </span>
//               <AttackForm addAttack={addAttack} />
//               <div className="form-group">
//                 {attacks &&
//                   attacks.length > 0 &&
//                   attacks.map((a, i) => {
//                     return (
//                       <div
//                         key={uuid()}
//                       >
//                         {`${a.weapon} ${a.amountOfDice}D${a.diceType}+${a.plus} CRIT${a.critOn}x${a.critTimes} `}
//                         <button onClick={()=>{deleteAttack(i)}}>Delete</button>
//                       </div>
//                     );
//                   })}
//               </div>
//               <div className="form-group">
//                 <input
//                   type="text"
//                   placeholder="Spell/Abilities"
//                   name="spells"
//                   value={spells}
//                   onChange={onChange}
//                 />
//               </div>

//               <div className="form-group">
//                 <input
//                   type="text"
//                   placeholder="Skills"
//                   name="skills"
//                   value={skills}
//                   onChange={onChange}
//                 />
//               </div>
//               <div className="form-group">
//                 <input
//                   type="text"
//                   placeholder="Usable Items"
//                   name="items"
//                   value={items}
//                   onChange={onChange}
//                 />
//               </div>
//               <div className="form-group">
//                 <input
//                   type="text"
//                   placeholder="Saves: Fortitude/Reflex/Will"
//                   name="saves"
//                   value={saves}
//                   onChange={onChange}
//                 />
//               </div>
//               <div className="form-group">
//                 <input
//                   type="text"
//                   placeholder="Abilities: Str/Dex/Con/Int/Wis/Cha"
//                   name="abilities"
//                   value={abilities}
//                   onChange={onChange}
//                 />
//               </div>
//               <input type="submit" className="btn btn-primary my-1" />
//             </form>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// EditPlayer.propTypes = {
//   editPlayer: PropTypes.func.isRequired,
// };

// export default connect(null, {
//   editPlayer,
// })(EditPlayer);
