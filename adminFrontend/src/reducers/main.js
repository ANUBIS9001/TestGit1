import { combineReducers } from 'redux';
import cr from 'utils/cr'
import {
  RECEIVE_MENU,
  SELECT_MENU_ITEM,
  SET_PATH,
  RECEIVE_PROFILE,
  SET_CURRENT_PAGE
} from 'act/main'
import {LOGIN_SUCCESS, TO_LOGIN} from 'act/login'

export default combineReducers({
  menu: cr(null, {
    [RECEIVE_MENU]({data}){return data.children}
  }),
  menuList: cr([], {
    [RECEIVE_MENU]({data}){
      let list = []
      function fillAll(data){
        if(data.moduleType) list.push(data)
        if(data.children && (data.moduleType=='mod' || !data.moduleType))
          data.children.forEach(fillAll)
      }
      fillAll(data)
      return list
    }
  }),
  selectedMenuKey: cr(null, {
    [SELECT_MENU_ITEM]({key}){return key}
  }),
  path: cr([], {
    [SET_PATH]({path}){return path}
  }),
  profile: cr({}, {
    [RECEIVE_PROFILE]({data}){return data}
  }),

  needLogin: cr(false, {
    // [RECEIVE_MENU](){return false},
    [LOGIN_SUCCESS](){return false},
    [TO_LOGIN](){return true}
  }),

  currentPage: cr(null, {
    [SET_CURRENT_PAGE]({data}){return data}
  })
})
