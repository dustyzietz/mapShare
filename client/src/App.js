import React from 'react';
import Map from './Map';
import './App.css';

import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  
   
    return (
      <Provider store={store}>
     <Map/>
      </Provider>
    );
}

export default App;
