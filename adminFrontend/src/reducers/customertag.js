import _ from 'underscore'
import { combineReducers } from 'redux'
import cr from 'utils/cr'
import {
  //加载标签分类列表
  ADD_FILTER,
  RESET_FILTER,
  REQ_FILTER,
  RECEIVE_LIST,
  CLEAR,
  REQ_LIST,
  RECEIVE_LIST_ERR,
  //添加标签分类
  ADD_SECTION_SUCC,
  //删除标签分类
  ADD_SELECTED_LIST,
  RESET_SELECTED_LIST,
  DEL_SECTION_SUCC,

  //加载标签列表
  ADD_FILTER_LABEL,
  RESET_FILTER_LABEL,
  REQ_FILTER_LABEL,
  RECEIVE_LIST_LABEL,
  CLEAR_LABEL,
  REQ_LIST_LABEL,
  RECEIVE_LIST_ERR_LABEL,

  //是否展示弹出框
  SHOW_ADD,
  CLOSE_ADD,
  SHOW_EDITLABEL,
  CLOSE_EDITLABEL,

  //输入数字限制
  SAVE_INPUT,

  RECEIVE_ALL_TAG,
  REQ_SET_TAG_GROUP_UESAGE,
  SET_TAG_GROUP_UESAGE_SUCC,
  SET_TAG_GROUP_UESAGE_FAIL,
} from '../actions/customertag'

export default combineReducers({
   labelSection:combineReducers({
    selected: cr([], {
      [ADD_SELECTED_LIST]({field, value}, state){
        if(value)
          return _.extend({}, state, {[field]: value})
        else
          return _.omit(state, field)
      },
      [RESET_SELECTED_LIST](){return {}}
    }),
    list: cr([], {
      [RECEIVE_LIST]({list, isAppend}, state){
        return isAppend ? state.concat(list) : list
      },
      [CLEAR](){return []}
    }),
    pagination: cr({}, {
        [RECEIVE_LIST]({pagination}){
          return pagination
        }
    }),
    filter: cr({}, {
      [REQ_FILTER](action,state){
        return Object.assign({}, state, action.filter)
      },
      [ADD_FILTER]({field, value}, state){
        if(value)
          return _.extend({}, state, {[field]: value})
        else
          return _.omit(state, field)
      },
      [RESET_FILTER](){return {}}
    }),
    loading: cr(false, {
      [REQ_LIST](){return true},
      [RECEIVE_LIST](){return false},
      [RECEIVE_LIST_ERR](){return false},
      [CLEAR](){return false}
    }),
  }),

  labelTabel:combineReducers({
   list: cr([], {
     [RECEIVE_LIST_LABEL]({list, isAppend}, state){
       return isAppend ? state.concat(list) : list
     },
     [CLEAR_LABEL](){return []}
   }),
   pagination: cr({}, {
       [RECEIVE_LIST_LABEL]({pagination}){
         return pagination
       }
   }),
   filter: cr({}, {
     [REQ_FILTER_LABEL](action,state){
       return Object.assign({}, state, action.filter)
     },
     [ADD_FILTER_LABEL]({field, value}, state){
       if(value)
         return _.extend({}, state, {[field]: value})
       else
         return _.omit(state, field)
     },
     [RESET_FILTER_LABEL](){return {}}
   }),
   loading: cr(false, {
     [REQ_LIST_LABEL](){return true},
     [RECEIVE_LIST_LABEL](){return false},
     [RECEIVE_LIST_ERR_LABEL](){return false},
     [CLEAR_LABEL](){return false}
   }),
 }),

  dispalyingAdd: cr(false, {
    [SHOW_ADD](){return true},
    [ADD_SECTION_SUCC](){return false},
    [CLOSE_ADD](){return false},
    [CLEAR](){return false}
  }),
  displayingEditLabel: cr(false, {
    [SHOW_EDITLABEL](){return true},
    [CLOSE_EDITLABEL](){return false},
    [CLEAR](){return false}
  }),

  //限制输入数字用的缓存
  intCheck: cr("", {
    [SAVE_INPUT](value){return value},
    [RECEIVE_LIST_LABEL](){return ""}
  }),

  allTagGroups: cr([], {
    [RECEIVE_ALL_TAG]({data}){return data}
  }),

  savingTagUesage: cr(false, {
    [REQ_SET_TAG_GROUP_UESAGE](){return true},
    [SET_TAG_GROUP_UESAGE_SUCC](){return false},
    [SET_TAG_GROUP_UESAGE_FAIL](){return false}
  })
})
