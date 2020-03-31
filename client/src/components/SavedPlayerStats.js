import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import Edit from '@material-ui/icons/Edit';

import SavedPlayerEdit from './SavedPlayerEdit';

const useStyles = makeStyles(theme => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)'
   
  }
}));

export default function SavedPlayerStats({player, deleteSavedPlayer}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const {name, hp, ac, speed, attacks, spells, skills, items, saves, abilities, _id} = player;
  const [open, setOpen] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
const isExpanded = expanded ? 'statTitle statOpen' : 'statTitle';
  return (
    <div className={isExpanded} style={{position: 'absolute'}} > 
    
       <div style={{padding: '6px' ,display: 'inline-block'}}>{name} </div> 
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
        </IconButton >
      
      <Collapse in={expanded} timeout="auto" unmountOnExit>   
           HP: {hp} {' '}
         AC: {ac}{' '}
         Speed: {speed}
         {attacks &&  <hr/>}
         {attacks &&  `Attacks: ${attacks}`}  
         {spells && <hr/>}
         {spells && `Spells/Abilities: ${spells}`}
         {items && <hr/>}
         {items && `Items: ${items}`}
         {skills && <hr/>}
         {skills && `Skills: ${skills}`}
         {saves && <hr/>}
         {saves && `Fort/Ref/Will: ${saves}`}
         {/* Abilities: {abilities} */}
         <br/>
        <IconButton onClick={() => {deleteSavedPlayer(_id)}}>
          <HighlightOffOutlinedIcon/>
        </IconButton> 
        <IconButton onClick={handleClickOpen}>
          <Edit/>
        </IconButton> 
        <SavedPlayerEdit open={open} setOpen={setOpen} oldPlayer={player} />
      </Collapse>
    </div>
  );
}