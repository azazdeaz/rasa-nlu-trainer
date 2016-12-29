import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducer'
import enUS from 'antd/lib/locale-provider/en_US'
import {LocaleProvider} from 'antd'
import './index.css';
import 'antd/dist/antd.min.css'

const store = createStore(reducer)
global.store = store //DEBUG

ReactDOM.render(
  <Provider store={store}>
    <LocaleProvider locale={enUS}>
      <App />
    </LocaleProvider>
  </Provider>,
  document.getElementById('root')
);
