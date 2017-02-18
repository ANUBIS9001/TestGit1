import 'babel-polyfill'
require('es6-promise').polyfill()
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './stores/web'
import App from './containers/App'
import {switchPage} from 'act/main'

let initialState = { }
const store = configureStore(initialState)
const history = syncHistoryWithStore(browserHistory, store)
history.listen(() => {
  store.dispatch(switchPage())
})

ReactDOM.render((
  <Provider store={store}>
    <App history={history}/>
  </Provider>
), document.getElementById('app'));
