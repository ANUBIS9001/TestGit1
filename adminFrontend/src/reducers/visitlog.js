import { combineReducers } from 'redux'
import cr from 'utils/cr'
import _ from 'underscore'
import {
  REQ_LIST,
  RECEIVE_LIST,
  RECEIVE_LIST_ERR,
  FILTER,
  CLEAR,
  RECEIVE_DETAIL,
  CLEARDETAIL
} from 'act/visitlog'

export default combineReducers({
  list: cr([], {
    [RECEIVE_LIST]({list}){
      return  list
    },
    [CLEAR](){return []}
  }),
  pagination: cr({}, {
    [RECEIVE_LIST]({pagination}){
      return pagination
    }
  }),
  loading: cr(false, {
    [REQ_LIST](){return true},
    [RECEIVE_LIST](){return false},
    [RECEIVE_LIST_ERR](){return false}
  }),
  filter:cr({}, {
    [FILTER]({data},state){
      return _.extend(state, data)
    },
    [CLEAR](){return {}}
  }),
  detail: cr({}, {
    [RECEIVE_DETAIL]({detail}){
      return  detail
    },
    [CLEARDETAIL](){return {}}
  })
})
