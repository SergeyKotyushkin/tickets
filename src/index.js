import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';

import * as reducers from 'stores/reducers';

import App from 'components/app';

import Localizator from 'localization/localizator';
Localizator.init();

const store = createStore(combineReducers(reducers));

const rootElement = document.getElementById('root');
ReactDOM.render(<Provider store={store}>
  <App/>
</Provider>, rootElement);
