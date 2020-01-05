import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import './style.css' //not sure if it's bad that when you float over the file nothing happens


ReactDOM.render(
  //<div>Hello, world!</div>,
  <Provider store={store}>
    <Router>

    </Router>
  </Provider>,
  document.getElementById('app') // make sure this is the same as the id of the div in your index.html
);
