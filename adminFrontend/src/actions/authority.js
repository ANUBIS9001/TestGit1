import _ from 'underscore'
import mac from 'utils/mac'
import {post} from './req'
import {message} from 'antd'

export const REQ_MODULE_TREE = 'authority/REQ_MODULE_TREE'
export const RECEIVE_MODULE_TREE = 'authority/RECEIVE_MODULE_TREE'
export const RECEIVE_MODULE_TREE_ERR = 'authority/RECEIVE_MODULE_TREE_ERR'

export const SHOW_ADD_PATH = 'authority/SHOW_ADD_PATH'
export const CLOSE_ADD_PATH = 'authority/CLOSE_ADD_PATH'
export const REQ_ADD_PATH = 'authority/REQ_ADD_PATH'
export const ADD_PATH_SUCC = 'authority/ADD_PATH_SUCC'
export const ADD_PATH_FAIL = 'authority/ADD_PATH_FAIL'

export const SHOW_EDIT_PATH = 'authority/SHOW_EDIT_PATH'
export const CLOSE_EDIT_PATH = 'authority/CLOSE_EDIT_PATH'
export const REQ_EDIT_PATH = 'authority/REQ_EDIT_PATH'
export const EDIT_PATH_SUCC = 'authority/EDIT_PATH_SUCC'
export const EDIT_PATH_FAIL = 'authority/EDIT_PATH_FAIL'

export const REQ_DEL_PATH = 'authority/REQ_DEL_PATH'
export const DEL_PATH_SUCC = 'authority/DEL_PATH_SUCC'
export const DEL_PATH_FAIL = 'authority/DEL_PATH_FAIL'

export const SHOW_PATH_AUTHS = 'authority/SHOW_PATH_AUTHS'
export const CLOSE_PATH_AUTHS = 'authority/CLOSE_PATH_AUTHS'
export const REQ_EDIT_PATH_AUTH = 'authority/REQ_EDIT_PATH_AUTH'
export const EDIT_PATH_AUTH_SUCC = 'authority/EDIT_PATH_AUTH_SUCC'
export const DEL_PATH_AUTH_SUCC = 'authority/DEL_PATH_AUTH_SUCC'
export const EDIT_PATH_AUTH_FAIL = 'authority/EDIT_PATH_AUTH_FAIL'

export const showAddPath = mac(SHOW_ADD_PATH, 'parent')
export const closeAddPath = mac(CLOSE_ADD_PATH)

export const showEditPath = mac(SHOW_EDIT_PATH, 'data')
export const closeEditPath = mac(CLOSE_EDIT_PATH)

export const showPathAuths = mac (SHOW_PATH_AUTHS, 'data')
export const closePathAuths = mac (CLOSE_PATH_AUTHS)

export const fetchModuleTree = () => dispatch => {
  dispatch({type: REQ_MODULE_TREE})
  dispatch(post('/api/module/tree', (err, data)=>{
    if(err){
      message.error(err.message || '获取路径数据失败')
      dispatch({type: RECEIVE_MODULE_TREE_ERR})
    }else{
      dispatch({type: RECEIVE_MODULE_TREE, data})
    }

  }))
}

export const sendAddPath = (param) => dispatch => {
  dispatch(({type: REQ_ADD_PATH}))
  dispatch(post('/api/module/add', param, (err)=>{
    if(err){
      dispatch({ type: ADD_PATH_FAIL})
      message.error(err.message || '添加路径失败')
    }else{
      dispatch({ type: ADD_PATH_SUCC})
      dispatch(fetchModuleTree())
    }
  }))
}

export const sendEditPath = (param) => dispatch => {
  dispatch(({type: REQ_EDIT_PATH}))
  dispatch(post('/api/module/update', param, (err)=>{
    if(err){
      dispatch({ type: EDIT_PATH_FAIL})
      message.error(err.message || '修改路径失败')
    }else{
      dispatch({ type: EDIT_PATH_SUCC})
      dispatch(fetchModuleTree())
    }
  }))
}

export const delPath = moduleId => dispatch => {
  dispatch(({type: REQ_DEL_PATH}))
  return dispatch(post('/api/module/delete', {moduleId}, (err)=>{
    if(err){
      dispatch({ type: DEL_PATH_FAIL})
      message.error(err.message || '删除路径失败')
    }else{
      dispatch({ type: DEL_PATH_SUCC})
      dispatch(fetchModuleTree())
    }
  }))
}

export const savePathAuth = (param, isAdd, cb) => dispatch => {
  dispatch({type: REQ_EDIT_PATH_AUTH})
  const url = `/api/module/${isAdd ? 'add' : 'update'}`
  dispatch(post(url, _.extend({moduleType: 'action'}, param), (err)=>{
    if(err){
      dispatch({ type: EDIT_PATH_AUTH_FAIL})
      message.error(err.message || `${isAdd ? '添加' : '修改'}权限失败`)
    }else{
      dispatch({ type: EDIT_PATH_AUTH_SUCC, data: param})
    }
    cb(err)
  }))
}

export const delPathAuth = moduleId => dispatch => {
  dispatch({type: REQ_EDIT_PATH_AUTH})
  return dispatch(post('/api/module/delete', {moduleId}, (err)=>{
    if(err){
      dispatch({ type: EDIT_PATH_AUTH_FAIL })
      message.error(err.message || '删除权限失败')
    }else{
      dispatch({ type: DEL_PATH_AUTH_SUCC, id: moduleId })
    }
  }))
}
