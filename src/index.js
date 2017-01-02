// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import enUS from 'antd/lib/locale-provider/en_US'
import {LocaleProvider} from 'antd'
import thunk from 'redux-thunk'
import * as actions from './actions'
import './index.css'
import 'antd/dist/antd.min.css'

const store = createStore(
  reducer,
  applyMiddleware(thunk),
)
store.dispatch(actions.loadData())
global.store = store //DEBUG

ReactDOM.render(
  <Provider store={store}>
    <LocaleProvider locale={enUS}>
      <App />
    </LocaleProvider>
  </Provider>,
  document.getElementById('root')
);
