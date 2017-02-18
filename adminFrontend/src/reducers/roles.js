import _ from 'underscore'
import { combineReducers } from 'redux'
import cr from 'utils/cr'
import {
  REQ_ROLES,
  RECEIVE_ROLES,
  RECEIVE_ROLES_ERR,
  REQ_DEL_ROLE,
  DEL_ROLE_SUCC,
  DEL_ROLE_FAIL,
  SHOW_ADD_ROLE,
  CLOSE_ADD_ROLE,
  REQ_ADD_ROLE,
  ADD_ROLE_SUCC,
  ADD_ROLE_FAIL,
  SHOW_EDIT_ROLE,
  CLOSE_EDIT_ROLE,
  REQ_EDIT_ROLE,
  EDIT_ROLE_SUCC,
  EDIT_ROLE_FAIL,
  SHOW_ROLE_AUTHS,
  CLOSE_ROLE_AUTHS,
  RECEIVE_ROLE_AUTHS,
  RECEIVE_ROLE_AUTHS_ERR,
  SELECT_MODULE,
  SET_ACTIONS,
  UNSET_ACTIONS,
  SET_MODS,
  REQ_SAVE_ROLE_AUTHS,
  SAVE_ROLE_AUTHS_SUCC,
  SAVE_ROLE_AUTHS_ERR,
} from 'act/roles'

export default combineReducers({
  list: cr([], {
    [RECEIVE_ROLES]({data}){return data}
  }),
  loadding: cr(false, {
    [REQ_ROLES](){return true},
    [RECEIVE_ROLES](){return false},
    [RECEIVE_ROLES_ERR](){return false},
    [REQ_DEL_ROLE](){return true},
    [DEL_ROLE_SUCC](){return false},
    [DEL_ROLE_FAIL](){return false},
  }),

  add: combineReducers({
    show: cr(false, {
      [SHOW_ADD_ROLE](){return true},
      [CLOSE_ADD_ROLE](){return false},
      [ADD_ROLE_SUCC](){return false},
    }),
    parent: cr(null, {
      [SHOW_ADD_ROLE]({parent}){return parent || null},
      [CLOSE_ADD_ROLE](){return null},
      [ADD_ROLE_SUCC](){return null},
    }),
    waiting: cr(false, {
      [REQ_ADD_ROLE](){return true},
      [ADD_ROLE_SUCC](){return false},
      [ADD_ROLE_FAIL](){return false},
    })
  }),

  edit: combineReducers({
    show: cr(false, {
      [SHOW_EDIT_ROLE](){return true},
      [CLOSE_EDIT_ROLE](){return false},
      [EDIT_ROLE_SUCC](){return false},
    }),
    data: cr(null, {
      [SHOW_EDIT_ROLE]({data}){return data},
      [CLOSE_EDIT_ROLE](){return null},
      [EDIT_ROLE_SUCC](){return null},
    }),
    waiting: cr(false, {
      [REQ_EDIT_ROLE](){return true},
      [EDIT_ROLE_SUCC](){return false},
      [EDIT_ROLE_FAIL](){return false},
    })
  }),

  roleAuths: combineReducers({
    show: cr(false, {
      [SHOW_ROLE_AUTHS](){return true},
      [CLOSE_ROLE_AUTHS](){return false},
      [RECEIVE_ROLE_AUTHS_ERR](){return false},
      [SAVE_ROLE_AUTHS_SUCC](){return false}
    }),
    loading: cr(false, {
      [SHOW_ROLE_AUTHS](){return true},
      [RECEIVE_ROLE_AUTHS](){return false}
    }),
    role: cr(null, {
      [SHOW_ROLE_AUTHS]({role}){return role},
    }),
    //模块树上选中的模块
    selectedModule: cr(null, {
      [SELECT_MODULE]({module}){return module},
      [SHOW_ROLE_AUTHS](){return null},
      [CLOSE_ROLE_AUTHS](){return null}
    }),
    //所有权限列表中勾选的的权限
    roleActionIds: cr([], {
      [RECEIVE_ROLE_AUTHS]({data}){
        return data.filter(m=>m.moduleType=='action').map(m=>m.moduleId)
      },
      [SET_ACTIONS]({selecteds, all}, state){
        return state.filter(o => !_.contains(all, o)).concat(selecteds)
      },
      [UNSET_ACTIONS]({ids}, state){
        return _.without(state, ...ids)
      },
      [SHOW_ROLE_AUTHS](){return []},
      [CLOSE_ROLE_AUTHS](){return []}
    }),
    //树上已勾选的的模块
    roleModIds: cr([], {
      [RECEIVE_ROLE_AUTHS]({data}){
        return data.filter(m=>m.moduleType!='action').map(m=>m.moduleId)
      },
      [SET_MODS]({ids}){return ids},
      [SHOW_ROLE_AUTHS](){return []},
      [CLOSE_ROLE_AUTHS](){return []}
    }),
    waiting: cr(false, {
      [REQ_SAVE_ROLE_AUTHS](){return true},
      [SAVE_ROLE_AUTHS_SUCC](){return false},
      [SAVE_ROLE_AUTHS_ERR](){return false}
    })
  })
})
