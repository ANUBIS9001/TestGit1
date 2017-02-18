import mac from 'utils/mac'
import {post} from './req'
import {message} from 'antd'

export const RECEIVE_MENU = 'main/RECEIVE_MENU'
export const SELECT_MENU_ITEM = 'main/SELECT_MENU_ITEM'
export const SET_PATH = 'main/SET_PATH'
export const RECEIVE_PROFILE = 'main/RECEIVE_PROFILE'
export const SET_CURRENT_PAGE = 'main/SET_CURRENT_PAGE'

const receiveMenu = mac(RECEIVE_MENU, 'data')
const selectMenuItem = mac(SELECT_MENU_ITEM, 'key')
const setPath = mac(SET_PATH, 'path')


export const fetchMenu = () => (dispatch) =>{
  dispatch(post('/api/module/menu', {parentId:99, platform: 1}, (err, r) => {
    if(!err){
      dispatch(receiveMenu(r))
      dispatch(switchPage())
    }else{
      message.error(err.message || '获取菜单失败')
    }
  }))
}

export const switchPage = () => (dispatch, getState) => {
  const {pathname} = getState().routing.locationBeforeTransitions
  const navKey = pathname.replace('/','') || 'workbench'
  dispatch(selectMenuItem(navKey))
  const {menuList} = getState().main
  if(!menuList.length) return
  const menuItem = menuList.find(item =>
    item.moduleDefine && navKey == item.moduleDefine.toLowerCase()
  )
  dispatch({type: SET_CURRENT_PAGE, data: menuItem})
  dispatch(setPath(getPath(menuItem)))
  function getPath(item){
    if(item.parentId=='99')
      return [item.moduleName]
    return getPath(menuList.find(m => m.moduleId == item.parentId)).concat(item.moduleName)
  }
}

export const fetchProfile = () => dispatch => {
  dispatch(post('/api/seller/info', (err, data) => {
    if(!err){
      dispatch({type: RECEIVE_PROFILE, data})
    }else{
      message.error(err.message || '获取登录用户信息失败')
    }
  }))
}
