import React,{useState, useEffect} from 'react';
import Send from '@material-ui/icons/Send';
import Edit from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { setHp } from "../actions/players";
import { connect } from "react-redux";
import PropTypes from "prop-types";


 const HitPoints = ({players, setHp, hitPoints}) => {
  const [hpArray, setHpArray] = useState([]);
  let  [,setState]=useState();
  const [edit , setEdit] = useState(false);

  useEffect(()=>{
    if (players && players.length !== hpArray.length ){
     setHpArray( players.map(p=>{
        return {hp:p.hp, name:p.name}
      })) 
    }
  },[players])

  useEffect(()=> {
    if(hitPoints.length > 0) {
      setHpArray(hitPoints);
    }
  },[hitPoints])

  const onSubmit = () => {
    setHp(hpArray);
    setEdit(false)
      }


const handleChange = (e) => {
  console.log(e.target.value);
  const newA = hpArray;
  newA[e.target.name].hp = e.target.value;
    setHpArray(newA);
    setState({});
  }

  return (
    <div style={{backgroundColor:'black', color:'white'}}>
    
     {edit && <form onSubmit={e => {
          e.preventDefault();
          onSubmit();
        }}>
            HIT POINTS 
          <IconButton style={{color:'white'}}  size="small" type='submit'>
           <Send/>
         </IconButton>
        {hpArray &&
        hpArray.map((p,i)=>
         ( <div  key={i}>
           {p.name}
            <input type="number" style={{ width:'50px',display:'inline-block'}} name={i} value={hpArray[i].hp} onChange={handleChange} />
             </div>)
         ) }
         
     </form>
     }
     {!edit && hpArray &&
     <div>
       HIT POINTS 
       <IconButton style={{color:'white'}}  onClick={()=>{setEdit(true)}}>
           <Edit/>
         </IconButton>
       {hpArray.map((p,i) => (
         <div key={i}>
           {` ${p.name}: ${p.hp} `}
         </div>
       )
       )}
        
         </div>
     }
    </div>
  )
}

HitPoints.propTypes = {
  hitPoints: PropTypes.array.isRequired,
  setHp: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  hitPoints: state.hitPoints
});

export default connect(mapStateToProps, {
 setHp
})(HitPoints);
