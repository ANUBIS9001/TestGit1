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

  CLEAR_MINE,
  REQ_LIST_MINE,
  RECEIVE_LIST_ERR_MINE,
  ADD_FILTER_MINE,
  RESET_FILTER_MINE,
  REQ_FILTER_MINE,
  RECEIVE_LIST_MINE,

  SHOW_SHEET_DETAIL,
  CLOSE_SHEET_DETAIL,
  SUBMIT_RESULT_SUCC,

  //用来删除的多选项
  ADD_SELECTED_LIST,
  RESET_SELECTED_LIST,
  ADD_SELECTED_LIST_MINE,
  RESET_SELECTED_LIST_MINE,

  //详情页
  RECEIVE_DETAIL,
  CLEAR_DETAIL,
  RECEIVE_ORDERLOG,
  ADD_FILTER_HANDLE,
  RESET_FILTER_HANDLE
} from '../actions/worksheet'

export default combineReducers({
  workDetail: cr({}, {
    [RECEIVE_DETAIL]({data}){
      return data
    },
    [CLEAR_DETAIL](){return {}}
  }),

  workOrderLog: cr([], {
    [RECEIVE_ORDERLOG]({data}){
      return data
    },
    [CLEAR_DETAIL](){return []}
  }),

  handleFilter: cr({}, {
    [ADD_FILTER_HANDLE]({field, value}, state){
      if(value)
        return _.extend({}, state, {[field]: value})
      else
        return _.omit(state, field)
    },
    [RESET_FILTER_HANDLE](){return {}}
  }),

  worksheet:combineReducers({
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
  }),

  myworksheet:combineReducers({
    selected: cr([], {
      [ADD_SELECTED_LIST_MINE]({field, value}, state){
        if(value)
          return _.extend({}, state, {[field]: value})
        else
          return _.omit(state, field)
      },
      [RESET_SELECTED_LIST_MINE](){return {}}
    }),
    list: cr([], {
      [RECEIVE_LIST_MINE]({list, isAppend}, state){
        return isAppend ? state.concat(list) : list
      },
      [CLEAR_MINE](){return []}
    }),
    pagination: cr({}, {
        [RECEIVE_LIST]({pagination}){
          return pagination
        }
    }),
    filter: cr({}, {
      [REQ_FILTER_MINE](action,state){
        return Object.assign({}, state, action.filter)
      },
      [ADD_FILTER_MINE]({field, value}, state){
        if(value)
          return _.extend({}, state, {[field]: value})
        else
          return _.omit(state, field)
      },
      [RESET_FILTER_MINE](){return {}}
    }),
    loading: cr(false, {
      [REQ_LIST_MINE](){return true},
      [RECEIVE_LIST_MINE](){return false},
      [RECEIVE_LIST_ERR_MINE](){return false},
      [CLEAR_MINE](){return false}
    }),
  }),

  displayingDetail: cr(false, {
    [SHOW_SHEET_DETAIL](){return true},
    [CLOSE_SHEET_DETAIL](){return false},
    [SUBMIT_RESULT_SUCC](){return false},
    [CLEAR](){return false},
    [CLEAR_MINE](){return false}
  }),
})
