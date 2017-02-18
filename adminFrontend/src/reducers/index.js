import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import main from './main'
import workBench from './workBench'
import worksheet from './worksheet'
import customer from './customer'
import authority from './authority'
import roles from './roles'
import users from './users'
import visitlog from './visitlog'
import alllog from './alllog'
import customertag from './customertag'
import product from './product'
import channel from './channel'

module.exports = combineReducers({
  routing: routerReducer,
  main,
  workBench,
  worksheet,
  customer,
  authority,
  roles,
  users,
  visitlog,
  alllog,
  customertag,
  product,
  channel,
})
