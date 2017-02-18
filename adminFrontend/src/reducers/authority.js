import _ from 'underscore'
import { combineReducers } from 'redux'
import cr from 'utils/cr'
import {
  REQ_MODULE_TREE,
  RECEIVE_MODULE_TREE,
  RECEIVE_MODULE_TREE_ERR,
  SHOW_ADD_PATH,
  CLOSE_ADD_PATH,
  REQ_ADD_PATH,
  ADD_PATH_SUCC,
  ADD_PATH_FAIL,
  SHOW_EDIT_PATH,
  CLOSE_EDIT_PATH,
  REQ_EDIT_PATH,
  EDIT_PATH_SUCC,
  EDIT_PATH_FAIL,
  REQ_DEL_PATH,
  DEL_PATH_SUCC,
  DEL_PATH_FAIL,
  SHOW_PATH_AUTHS,
  CLOSE_PATH_AUTHS,
  REQ_EDIT_PATH_AUTH,
  EDIT_PATH_AUTH_SUCC,
  DEL_PATH_AUTH_SUCC,
  EDIT_PATH_AUTH_FAIL,
} from 'act/authority'

export default combineReducers({
  path: combineReducers({
    loading: cr(false, {
      [REQ_MODULE_TREE](){return true},
      [RECEIVE_MODULE_TREE](){return false},
      [RECEIVE_MODULE_TREE_ERR](){return false},
      [REQ_DEL_PATH](){return true},
      [DEL_PATH_SUCC](){return false},
      [DEL_PATH_FAIL](){return false},
    }),
    tree: cr([], {
      [RECEIVE_MODULE_TREE]({data}){
        return makeChildren(data).children

        function makeChildren(mod){
          if(mod.moduleType=='action'){
            return _.omit(mod, 'children')
          }else if(mod.moduleType == 'uri'){
            return _.omit(_.extend({authorities: mod.children.map(item=>_.extend({parent: mod}, makeChildren(item)))}, mod), 'children')
          }else if(!mod.children || !mod.children.length){
            return _.omit(mod, 'children')
          }else{
            return _.extend({}, mod, {
              children: mod.children.map(item => _.extend({parent: mod}, makeChildren(item)))
            })
          }
        }
      }
   })
  }),

  addPath: combineReducers({
    show: cr(false, {
      [SHOW_ADD_PATH](){return true},
      [CLOSE_ADD_PATH](){return false},
      [ADD_PATH_SUCC](){return false},
    }),
    parent: cr(null, {
      [SHOW_ADD_PATH]({parent}){return parent || null},
      [CLOSE_ADD_PATH](){return null},
      [ADD_PATH_SUCC](){return null},
    }),
    waiting: cr(false, {
      [REQ_ADD_PATH](){return true},
      [ADD_PATH_SUCC](){return false},
      [ADD_PATH_FAIL](){return false},
    })
  }),

  editPath: combineReducers({
    show: cr(false, {
      [SHOW_EDIT_PATH](){return true},
      [CLOSE_EDIT_PATH](){return false},
      [EDIT_PATH_SUCC](){return false},
    }),
    data: cr(null, {
      [SHOW_EDIT_PATH]({data}){return data},
      [CLOSE_EDIT_PATH](){return null},
      [EDIT_PATH_SUCC](){return null},
    }),
    waiting: cr(false, {
      [REQ_EDIT_PATH](){return true},
      [EDIT_PATH_SUCC](){return false},
      [EDIT_PATH_FAIL](){return false},
    })
  }),

  pathAuths: combineReducers({
    show: cr(false, {
      [SHOW_PATH_AUTHS](){return true},
      [CLOSE_PATH_AUTHS](){return false}
    }),
    data: cr (null, {
      [SHOW_PATH_AUTHS]({data}){return data},
      [CLOSE_PATH_AUTHS](){return null},
      [EDIT_PATH_AUTH_SUCC]({data}, state){
        let auths = state.authorities
        const edited = auths.find(item => item.moduleId == data.moduleId)
        if(edited) _.extend(edited, data)
        else auths.push(data)
        return state
      },
      [DEL_PATH_AUTH_SUCC]({id}, state){
        let auths = state.authorities
        const deletedIndex = _.findIndex(auths, item => item.moduleId == id)
        auths.splice(deletedIndex, 1)
        return state
      }
    }),
    loading: cr(false, {
      [REQ_EDIT_PATH_AUTH](){return true},
      [EDIT_PATH_AUTH_SUCC](){return false},
      [DEL_PATH_AUTH_SUCC](){return false},
      [EDIT_PATH_AUTH_FAIL](){return false},
    })
  })

})
