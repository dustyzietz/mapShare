import React,{useEffect} from 'react';
import Item from './Item';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPlayers } from './actions/players';
 
const Map = ({players, getPlayers}) => {
 
  

 

  useEffect( () => {
       async function loadPlayers(){
      await getPlayers(); }
   loadPlayers();
  }, []); 

    return (
      <div >
        <img className="map" src='https://i.pinimg.com/736x/9f/ec/db/9fecdba47cfcda751e4eadce08ff95a7.jpg' />
        { players &&
         players.map(p => {
           return (
             <Item key={p.name} name={p.name} url={p.playerUrl} pos={p.controlledPosition}/>
           )
         })
       } 
      </div>
    );
}

Map.propTypes = {
  players: PropTypes.array,
  getPlayers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  players: state.players
})

export default connect(mapStateToProps, { getPlayers })(Map);
