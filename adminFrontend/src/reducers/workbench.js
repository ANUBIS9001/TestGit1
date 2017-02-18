import { combineReducers } from 'redux'
import cr from 'utils/cr'
import {
  RECEIVE_UNVERIFIED,
  RECEIVE_VERIFIED,
  RECEIVE_UNHANDLED,
  RECEIVE_HANDLED,
  CLEAR,
  REQ_LIST,
  RECEIVE_LIST_ERR
} from '../actions/workBench'

export default combineReducers({
  unverified:cr([], {
    [RECEIVE_UNVERIFIED]({data}){
      return data
    },
    [CLEAR](){return []}
  }),

  verified:cr([], {
    [RECEIVE_VERIFIED]({data}){
      return data
    },
    [CLEAR](){return []}
  }),

  unhandled:cr([], {
    [RECEIVE_UNHANDLED]({data}){
      return data
    },
    [CLEAR](){return []}
  }),

  handled:cr([], {
    [RECEIVE_HANDLED]({data}){
      return data
    },
    [CLEAR](){return []}
  }),

  loading: cr(false, {
    [REQ_LIST](){return true},
    [RECEIVE_UNVERIFIED](){return false},
    [RECEIVE_VERIFIED](){return false},
    [RECEIVE_UNHANDLED](){return false},
    [RECEIVE_HANDLED](){return false},
    [RECEIVE_LIST_ERR](){return false},
    [CLEAR](){return false}
  }),

})
