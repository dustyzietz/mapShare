import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    float: 'right',
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function PlayerStats({player}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const {name, hp, ac, attacks, spells, items} = player;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className='statTitle'>
       <div style={{margin: '6px', display: 'inline-block'}}>{name} </div>     
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
        </IconButton>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography paragraph>
           Hit Points: {hp} <br/>
           Armor Class: {ac} <br/>
           Attacks: {attacks} <br/><hr/>
           Spells: {spells} <br/><hr/>
           Items: {items} <br/>
          </Typography>
      </Collapse>
    </div>
  );
}