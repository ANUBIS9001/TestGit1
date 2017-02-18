import _ from 'underscore'
import mac from 'utils/mac'
import {post} from './req'
import {message} from 'antd'

export const SET_FILTER = 'users/SET_FILTER'
export const REQ_USERS = 'users/REQ_USERS'
export const RECEIVE_USERS = 'users/RECEIVE_USERS'
export const RECEIVE_USERS_ERR = 'users/RECEIVE_USERS_ERR'

export const RECEIVE_DEPTS = 'users/RECEIVE_DEPTS'

export const REQ_DEL_USER = 'users/REQ_DEL_USER'
export const DEL_USER_SUCC = 'users/DEL_USER_SUCC'
export const DEL_USER_FAIL = 'users/DEL_USER_FAIL'

export const REQ_TOGGLE_STATUS = 'users/REQ_TOGGLE_STATUS'
export const TOGGLE_STATUS_SUCC = 'users/TOGGLE_STATUS_SUCC'
export const TOGGLE_STATUS_FAIL = 'users/TOGGLE_STATUS_FAIL'

export const SHOW_SELECT_ROLES = 'users/SHOW_SELECT_ROLES'
export const CLOSE_SELECT_ROLES = 'users/CLOSE_SELECT_ROLES'
export const REQ_SAVE_SELECT_ROLES = 'users/REQ_SAVE_SELECT_ROLES'
export const SAVE_SELECT_ROLES_SUCC = 'users/SAVE_SELECT_ROLES_SUCC'
export const SAVE_SELECT_ROLES_FAIL = 'users/SAVE_SELECT_ROLES_FAIL'
export const RECEIVE_SELLER_ROLES = 'users/RECEIVE_SELLER_ROLES'
export const RECEIVE_SELLER_ROLES_ERR = 'users/RECEIVE_SELLER_ROLES_ERR'
export const CHANGE_SELECTED_ROLES = 'users/CHANGE_SELECTED_ROLES'

export const setFilter = mac(SET_FILTER, 'data')
export const closeSelectRoles = mac(CLOSE_SELECT_ROLES)
export const changeSelectedRoles = mac(CHANGE_SELECTED_ROLES, 'data')

export const fetchUsers = (pagination) => (dispatch, getState) => {
  const statePagination = getState().users.pagination
  const {filter} = getState().users
  pagination = _.extend({}, statePagination, pagination)
  dispatch({type: REQ_USERS})
  dispatch(post('/api/seller/query', _.omit(filter, v=>!v), pagination, (err, data, pagination)=>{
    if(err){
      message.error(err.message || '获取用户列表失败')
      dispatch({type: RECEIVE_USERS_ERR})
    }else{
      dispatch({type: RECEIVE_USERS, data, pagination })
    }
  }))
}

export const fetchDepts = () => dispatch =>{
  dispatch(post('/api/oa/dept-tree', {deptId: 'root'}, (err, data) => {
    if(err){
      message.error(err.message || '获取部门数据失败')
    }else{
      dispatch({type: RECEIVE_DEPTS, data})
    }
  }))
}

export const showSelectRoles = sellerId => dispatch =>{
  dispatch({type: SHOW_SELECT_ROLES, sellerId})
  dispatch(post('/api/right/user-role', {sellerId}, (err, data) => {
    if(err){
      message.error(err.message || '获取用户权限失败')
      dispatch({type: RECEIVE_SELLER_ROLES_ERR})
    }else{
      dispatch({type: RECEIVE_SELLER_ROLES, data})
    }
  }))
}

export const saveSelectRoles = () => (dispatch, getState) => {
  const {sellerId, roles} = getState().users.selectRoles
  dispatch({type: REQ_SAVE_SELECT_ROLES})
  dispatch(post('/api/right/set-user-role', {sellerId, roleIds: roles.join(',')}, (err)=>{
    if(err){
      message.error(err.message || '保存用户角色失败')
        dispatch({type: SAVE_SELECT_ROLES_FAIL})
    }else{
      dispatch({type: SAVE_SELECT_ROLES_SUCC})
      dispatch(fetchUsers())
    }
  }))
}

export const toggleDisable = (rec) => dispatch => {
  dispatch({type: REQ_TOGGLE_STATUS})
  dispatch(post('/api/seller/change-status', {sellerId: rec.sellerId, enabled: !!rec.isDisabled}, (err) => {
    if(err){
      message.error(err.message || '修改用户状态失败')
      dispatch({type: TOGGLE_STATUS_FAIL})
    }else{
      dispatch({type: TOGGLE_STATUS_SUCC})
      dispatch(fetchUsers())
    }
  }))
}

export const delUser = (userId) => dispatch => {
  // dispatch(({type: REQ_DEL_ROLE}))
  // return dispatch(post('/api/role/delete', {roleId}, (err)=>{
  //   if(err){
  //     dispatch({ type: DEL_ROLE_SUCC})
  //     message.error(err.message || '删除路径失败')
  //   }else{
  //     dispatch({ type: DEL_ROLE_SUCC})
  //     dispatch(fetchRoles())
  //   }
  // }))
}
