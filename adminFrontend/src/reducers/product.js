import _ from 'underscore'
import { combineReducers } from 'redux'
import cr from 'utils/cr'
import {
  CLEAR,
  REQ_LIST,
  RECEIVE_LIST_ERR,
  ADD_FILTER,
  RESET_FILTER,
  REQ_FILTER,
  RECEIVE_LIST,
  RECEIVE_TAG_GROUPS_IN_USE,
  //用来删除的多选项
  ADD_SELECTED_LIST,
  RESET_SELECTED_LIST,
  RECEIVE_DETAIL
} from '../actions/product'

export default combineReducers({
  selected: cr([], {
    [ADD_SELECTED_LIST]({field, value}, state){
      if(value)
        return _.extend({}, state, {[field]: value})
      else
        return _.omit(state, field)
    },
    [RESET_SELECTED_LIST](){return {}}
  }),
  list: cr([], {
    [RECEIVE_LIST]({list, isAppend}, state){
      return isAppend ? state.concat(list) : list
    },
    [CLEAR](){return []}
  }),
  pagination: cr({}, {
      [RECEIVE_LIST]({pagination}){
        return pagination
      }
  }),
  filter: cr({}, {
    [REQ_FILTER](action,state){
      return Object.assign({}, state, action.filter)
    },
    [ADD_FILTER]({field, value}, state){
      if(value)
        return _.extend({}, state, {[field]: value})
      else
        return _.omit(state, field)
    },
    [RESET_FILTER](){return {}}
  }),
  loading: cr(false, {
    [REQ_LIST](){return true},
    [RECEIVE_LIST](){return false},
    [RECEIVE_LIST_ERR](){return false},
    [CLEAR](){return false}
  }),

  tagGroupInUse: cr([], {
    [RECEIVE_TAG_GROUPS_IN_USE]({data}){return data}
  }),

  detail: cr(null, {
    [RECEIVE_DETAIL]({data}){return data}
  })
})
