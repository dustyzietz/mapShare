import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ControlPoint from '@material-ui/icons/ControlPoint';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import Edit from '@material-ui/icons/Edit';

import  EditPlayer  from './EditPlayer';


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

export default function PlayerStats({player, handleGrow, handleShrink, handleDelete, openEdit}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const {name, hp, ac, speed, attacks, spells, skills, items, saves, abilities} = player;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
const isExpanded = expanded ? 'statTitle statOpen' : 'statTitle';
  return (
    <div className={isExpanded}  >
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
       {expanded && <span>
        <IconButton onClick={handleGrow}>
          <ControlPoint/>
        </IconButton>
        <IconButton onClick={handleShrink}>
          <RemoveCircle/>
        </IconButton>
        </span>}
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
         <IconButton onClick={handleDelete} style={{display: 'inline-block'}}>
          <HighlightOffOutlinedIcon/>
        </IconButton> 
        <IconButton onClick={() => {openEdit(player)}}>
          <Edit/>
        </IconButton> 
      </Collapse>
    </div>
  );
}