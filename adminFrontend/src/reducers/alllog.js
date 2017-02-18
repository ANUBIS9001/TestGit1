import { combineReducers } from 'redux'
import cr from 'utils/cr'
import _ from 'underscore'
import moment from 'moment'
import {
  REQ_LIST,
  RECEIVE_LIST,
  RECEIVE_LIST_ERR,
  FILTER,
  CLEAR
} from 'act/alllog'

const innit={
  beginTime:moment().format('YYYY-MM-DD')+' 00:00:00',
  endTime:moment().format('YYYY-MM-DD HH:mm:ss'),
  key:'customerName'
}

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
    [RECEIVE_LIST_ERR](){return false},
    [CLEAR](){return false}
  }),
  filter:cr(innit, {
    [FILTER]({data},state){
      return _.extend(state, data)
    }
  })
})
