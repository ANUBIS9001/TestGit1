import _ from 'underscore'
import { combineReducers } from 'redux'
import cr from 'utils/cr'
import {
  ADD_FILTER,
  RESET_FILTER,
  SET_PROVINCES,
  SET_CITIES,
  SET_DISTRICTS,
  REQ_LIST,
  RECEIVE_LIST,
  RECEIVE_LIST_ERR,
  CLEAR_LIST,
  CLEAR,
  RECEIVE_TODO_DETAIL,
  RECEIVE_DONE_DETAIL,
} from 'act/customer'

export default combineReducers({
  list: cr([], {
    [RECEIVE_LIST]({list}){
      return list;
    },
    [CLEAR_LIST](){return []},
    [CLEAR](){return []}
  }),
  pagination: cr({}, {
    [RECEIVE_LIST]({pagination}){
      return pagination
    },
    [CLEAR_LIST](){return {}},
    [CLEAR](){return {}}
  }),
  loading: cr(false, {
    [REQ_LIST](){return true},
    [RECEIVE_LIST](){return false},
    [RECEIVE_LIST_ERR](){return false},
    [CLEAR](){return false}
  }),

  filter: cr({}, {
    [ADD_FILTER]({field, value}, state){
      if(value)
        return _.extend({}, state, {[field]: value})
      else
        return _.omit(state, field)
    },
    [RESET_FILTER](){return {}},
    [CLEAR](){return {}}
  }),

  provinces: cr([], {
    [SET_PROVINCES]({data}){return data},
    [CLEAR](){return []}
  }),

  cities: cr([], {
    [SET_CITIES]({data}){return data},
    [CLEAR](){return []}
  }),
  districts: cr([], {
    [SET_DISTRICTS]({data}){return data},
    [CLEAR](){return []}
  }),

  todoDetail: cr({}, {
    [RECEIVE_TODO_DETAIL]({data}){return data},
    [CLEAR](){return {}}
  }),
  doneDetail: cr({}, {
    [RECEIVE_DONE_DETAIL]({data}){return data},
    [CLEAR](){return {}}
  }),
})
