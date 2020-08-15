import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 && 
  alerts.map(alert => (
  <div class="bs-component" style={{position:'fixed', right:'0', top:'0', maxWidth:"500px"}}>
              <div class={`alert alert-dismissible alert-${alert.alertType}`}>
                <p class="mb-0">   {alert.msg && alert.msg}</p>
              </div>
            </div>
  ))
{/*  <div style={{position:'fixed', right:'0', top:'0', maxWidth:"500px"}} >
  { alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg && alert.msg}
    </div>
  ))}
 </div> */}
Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
