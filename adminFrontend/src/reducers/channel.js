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
  RECEIVE_TAG_GROUPS_IN_USE,
  RECEIVE_DETAIL,
  REQ_SET_BIND,
  SET_BIND_END,
  CLEAR,
} from 'act/channel'

export default combineReducers({
  list: cr([], {
    [RECEIVE_LIST]({list}, state){
      return list
    },
    [CLEAR](){return []}
  }),
  pagination: cr({}, {
    [RECEIVE_LIST]({pagination}){
      return pagination
    },
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

  tagGroupInUse: cr([], {
    [RECEIVE_TAG_GROUPS_IN_USE]({data}){return data}
  }),

  detail: cr(null, {
    [RECEIVE_DETAIL]({data}){return data}
  }),

  waitBind: cr(false, {
    [REQ_SET_BIND](){return true},
    [SET_BIND_END](){return false},
  })
})
