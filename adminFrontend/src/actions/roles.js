import _ from 'underscore'
import mac from 'utils/mac'
import {get, post} from './req'
import {message} from 'antd'

export const REQ_ROLES = 'roles/REQ_ROLES'
export const RECEIVE_ROLES = 'roles/RECEIVE_ROLES'
export const RECEIVE_ROLES_ERR = 'roles/RECEIVE_ROLES_ERR'

export const REQ_DEL_ROLE = 'roles/REQ_DEL_ROLE'
export const DEL_ROLE_SUCC = 'roles/DEL_ROLE_SUCC'
export const DEL_ROLE_FAIL = 'roles/DEL_ROLE_FAIL'

export const SHOW_ADD_ROLE = 'roles/SHOW_ADD_ROLE'
export const CLOSE_ADD_ROLE = 'roles/CLOSE_ADD_ROLE'
export const REQ_ADD_ROLE = 'roles/REQ_ADD_ROLE'
export const ADD_ROLE_SUCC = 'roles/ADD_ROLE_SUCC'
export const ADD_ROLE_FAIL = 'roles/ADD_ROLE_FAIL'

export const SHOW_EDIT_ROLE = 'roles/SHOW_EDIT_ROLE'
export const CLOSE_EDIT_ROLE = 'roles/CLOSE_EDIT_ROLE'
export const REQ_EDIT_ROLE = 'roles/REQ_EDIT_ROLE'
export const EDIT_ROLE_SUCC = 'roles/EDIT_ROLE_SUCC'
export const EDIT_ROLE_FAIL = 'roles/EDIT_ROLE_FAIL'

export const SHOW_ROLE_AUTHS = 'roles/SHOW_ROLE_AUTHS'
export const CLOSE_ROLE_AUTHS = 'roles/CLOSE_ROLE_AUTHS'
export const RECEIVE_ROLE_AUTHS = 'roles/RECEIVE_ROLE_AUTHS'
export const RECEIVE_ROLE_AUTHS_ERR = 'roles/RECEIVE_ROLE_AUTHS_ERR'
export const SELECT_MODULE = 'roles/SELECT_MODULE'
export const SET_ACTIONS = 'roles/SET_ACTIONS'
export const UNSET_ACTIONS = 'roles/UNSET_ACTIONS'
export const SET_MODS = 'roles/SET_MODS'
export const REQ_SAVE_ROLE_AUTHS = 'roles/REQ_SAVE_ROLE_AUTHS'
export const SAVE_ROLE_AUTHS_SUCC = 'roles/SAVE_ROLE_AUTHS_SUCC'
export const SAVE_ROLE_AUTHS_ERR = 'roles/SAVE_ROLE_AUTHS_ERR'

export const showAdd = mac(SHOW_ADD_ROLE)
export const closeAdd = mac(CLOSE_ADD_ROLE)
export const showEdit = mac(SHOW_EDIT_ROLE, 'data')
export const closeEdit = mac(CLOSE_EDIT_ROLE)

const _showRoleAuths = mac(SHOW_ROLE_AUTHS, 'role')
export const closeRoleAuths = mac(CLOSE_ROLE_AUTHS)
export const selectModule = mac(SELECT_MODULE, 'module')
const _setActions = mac(SET_ACTIONS, 'selecteds', 'all')
export const unsetActions = mac(UNSET_ACTIONS, 'ids')
export const setMods = mac(SET_MODS, 'ids')

export const fetchRoles = () => dispatch => {
  dispatch({type: REQ_ROLES})
  dispatch(get('/api/role/list', (err, data)=>{
    if(err){
      message.error(err.message || '获取角色列表失败')
      dispatch({type: RECEIVE_ROLES_ERR})
    }else{
      dispatch({type: RECEIVE_ROLES, data})
    }

  }))
}

export const sendAdd = (param) => dispatch => {
  dispatch(({type: REQ_ADD_ROLE}))
  dispatch(post('/api/role/add', param, (err)=>{
    if(err){
      dispatch({ type: ADD_ROLE_FAIL})
      message.error(err.message || '添加角色失败')
    }else{
      dispatch({ type: ADD_ROLE_SUCC})
      dispatch(fetchRoles())
    }
  }))
}

export const sendEdit = (param) => dispatch => {
  dispatch(({type: REQ_EDIT_ROLE}))
  dispatch(post('/api/role/update', param, (err)=>{
    if(err){
      dispatch({ type: EDIT_ROLE_FAIL})
      message.error(err.message || '修改角色失败')
    }else{
      dispatch({ type: EDIT_ROLE_SUCC})
      dispatch(fetchRoles())
    }
  }))
}

export const delRole = (roleId) => dispatch => {
  dispatch(({type: REQ_DEL_ROLE}))
  return dispatch(post('/api/role/delete', {roleId}, (err)=>{
    if(err){
      dispatch({ type: DEL_ROLE_SUCC})
      message.error(err.message || '删除路径失败')
    }else{
      dispatch({ type: DEL_ROLE_SUCC})
      dispatch(fetchRoles())
    }
  }))
}

export const showRoleAuths = role => dispatch => {
  dispatch(_showRoleAuths(role))
  dispatch(post('/api/right/role-module-list', {roleId:role.roleId}, (err, data)=>{
    if(err){
      message.error(err.message || '获取角色权限列表失败')
      dispatch({type: RECEIVE_ROLE_AUTHS_ERR})
    }else{
      dispatch({type: RECEIVE_ROLE_AUTHS, data})
    }

  }))
}

export const setActions = (selecteds, all) => (dispatch, getState) => {
  dispatch(_setActions(selecteds, all))
  const {selectedModule, roleModIds} = getState().roles.roleAuths
  dispatch(setMods(_.union(roleModIds, [selectedModule.moduleId])))

}

export const saveRoleAuths = () => (dispatch, getState) => {
  const {role, roleActionIds, roleModIds} = getState().roles.roleAuths
  const moduleIds = roleModIds.concat(roleActionIds).join(',')
  dispatch({type: REQ_SAVE_ROLE_AUTHS})
  dispatch(post('/api/right/set-role-modules', {roleId: role.roleId, moduleIds}, (err)=>{
    if(err){
      dispatch({type: SAVE_ROLE_AUTHS_ERR})
      message.error(err.message || '保存角色权限失败')
    }else{
      dispatch({type: SAVE_ROLE_AUTHS_SUCC})
      message.success('角色权限设置成功')
    }
  }))
}
