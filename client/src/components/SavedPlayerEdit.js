import React,{useState, useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { editSavedPlayer } from "../actions/players";
import { connect } from "react-redux";
import PropTypes from "prop-types";

  const SavedPlayerEdit = ({ open, setOpen, oldPlayer, editSavedPlayer }) => {
  const [player, setPlayer] = useState({
    name: '',
      url: '',
        hp: 0,
        ac: 0,
        speed: 0,
        attacks: '',
        spells: '',
        skills: '',
        items: '',
        saves: '',
        abilities: '',
  });

  useEffect(() => {
    setPlayer(oldPlayer);
  },[oldPlayer])

  

  const handleClose = () => {
    setOpen(false);
  };


  const {
    name,
    url,
     hp,
      ac,
      speed,
      attacks,
      spells,
      skills,
      items,
      saves,
      abilities,
  } = player;

  

  const onChange = e =>
    setPlayer({ ...player, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    editSavedPlayer(player);
    handleClose();
  };


  return (
    <div>
      <Dialog maxWidth='sm' fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title" style={{zIndex:'1'}}>
        <DialogContent style={{textAlign: 'center'}}>
          <div>
<h2>Create Character</h2>
<form className="form" onSubmit={onSubmit}>
        <div className="form-group">
        <small className="form-text">
            <ul>
              <li>Find a picture of your character online</li>
              <li>Right click on it</li>
              <li>Click on copy image address</li>
              <li>Paste it in below</li>
            </ul>
          </small>
          <textarea
            type="text"
            placeholder="Your Image Address"
            name="url"
            value={url}
            onChange={onChange}
            rows='3'
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>
        <span className="form-group inline-input">
          HP:
          <input
            type="number"
            placeholder="Hit Points"
            name="hp"
            value={hp}
            onChange={onChange}
          />
        </span>
        <span className="form-group inline-input">
          AC:
          <input
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
          <input
            type="number"
            placeholder="Speed"
            name="speed"
            value={speed}
            onChange={onChange}
          />
        </span>
        <div className="form-group">
          <input
            type="text"
            placeholder="Attacks/toHit/Damage"
            name="attacks"
            value={attacks}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Spell/Abilities"
            name="spells"
            value={spells}
            onChange={onChange}
          />
        </div>
        
        <div className="form-group">
          <input
            type="text"
            placeholder="Skills"
            name="skills"
            value={skills}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Usable Items"
            name="items"
            value={items}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Saves: Fortitude/Reflex/Will"
            name="saves"
            value={saves}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Abilities: Str/Dex/Con/Int/Wis/Cha"
            name="abilities"
            value={abilities}
            onChange={onChange}
          />
        </div>
<input type="submit" className="btn btn-primary my-1" />
      </form>
</div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
SavedPlayerEdit.propTypes = {
  editSavedPlayer: PropTypes.func,
};



export default connect(null, {
  editSavedPlayer
})(SavedPlayerEdit);
