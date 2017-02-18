import _ from 'underscore'
import { combineReducers } from 'redux'
import cr from 'utils/cr'
import {
  SET_FILTER,
  REQ_USERS,
  RECEIVE_USERS,
  RECEIVE_USERS_ERR,
  RECEIVE_DEPTS,
  REQ_DEL_USER,
  DEL_USER_SUCC,
  DEL_USER_FAIL,
  REQ_TOGGLE_STATUS,
  TOGGLE_STATUS_SUCC,
  TOGGLE_STATUS_FAIL,
  SHOW_SELECT_ROLES,
  CLOSE_SELECT_ROLES,
  REQ_SAVE_SELECT_ROLES,
  SAVE_SELECT_ROLES_SUCC,
  SAVE_SELECT_ROLES_FAIL,
  RECEIVE_SELLER_ROLES,
  RECEIVE_SELLER_ROLES_ERR,
  CHANGE_SELECTED_ROLES,
} from 'act/users'

const initialPagination = {
  current: 1,
  pageSize: 10,
  total: 0
}

export default combineReducers({
  list: cr([], {
    [RECEIVE_USERS]({data}){return data}
  }),
  depts: cr(null, {
    [RECEIVE_DEPTS]({data}){return data}
  }),
  filter: cr({}, {
    [SET_FILTER]({data}, state){
      return _.extend({}, state, data)
    }
  }),
  pagination: cr(initialPagination, {
    [RECEIVE_USERS]({pagination}){return pagination}
  }),
  loading: cr(false, {
    [REQ_USERS](){return true},
    [RECEIVE_USERS](){return false},
    [RECEIVE_USERS_ERR](){return false},
    [REQ_DEL_USER](){return true},
    [DEL_USER_SUCC](){return false},
    [DEL_USER_FAIL](){return false},
    [REQ_TOGGLE_STATUS](){return true},
    [TOGGLE_STATUS_SUCC](){return false},
    [TOGGLE_STATUS_FAIL](){return false},
  }),

  selectRoles: combineReducers({
    show: cr(false, {
      [SHOW_SELECT_ROLES](){return true},
      [CLOSE_SELECT_ROLES](){return false},
      [SAVE_SELECT_ROLES_SUCC](){return false},
      [RECEIVE_SELLER_ROLES_ERR](){return false},
    }),
    sellerId: cr(null, {
      [SHOW_SELECT_ROLES]({sellerId}){return sellerId},
    }),
    roles: cr(null, {
      [CLOSE_SELECT_ROLES](){return []},
      [RECEIVE_SELLER_ROLES]({data}){return data.map(item=>item.roleId)},
      [CHANGE_SELECTED_ROLES]({data}){return data},
    }),
    loading: cr(false, {
      [SHOW_SELECT_ROLES](){return true},
      [RECEIVE_SELLER_ROLES](){return false},
    }),
    waiting: cr(false, {
      [REQ_SAVE_SELECT_ROLES](){return true},
      [SAVE_SELECT_ROLES_SUCC](){return false},
      [SAVE_SELECT_ROLES_FAIL](){return false},
    })
  }),
})
