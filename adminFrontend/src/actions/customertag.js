import _ from 'underscore'
import mac from 'utils/mac'
import {post} from './req'
import {message} from 'antd'

export const CLEAR = 'customertag/CLEAR'
export const ADD_FILTER = 'customertag/ADD_FILTER'
export const RESET_FILTER = 'customertag/RESET_FILTER'
export const REQ_LIST = 'customertag/REQ_LIST'
export const RECEIVE_LIST = 'customertag/RECEIVE_LIST'
export const RECEIVE_LIST_ERR = 'customertag/RECEIVE_LIST_ERR'
export const REQ_FILTER='customertag/REQ_FILTER'

export const CLEAR_LABEL = 'customertag/CLEAR_LABEL'
export const ADD_FILTER_LABEL = 'customertag/ADD_FILTER_LABEL'
export const RESET_FILTER_LABEL = 'customertag/RESET_FILTER_LABEL'
export const REQ_LIST_LABEL = 'customertag/REQ_LIST_LABEL'
export const RECEIVE_LIST_LABEL = 'customertag/RECEIVE_LIST_LABEL'
export const RECEIVE_LIST_ERR_LABEL = 'customertag/RECEIVE_LIST_ERR_LABEL'
export const REQ_FILTER_LABEL='customertag/REQ_FILTER_LABEL'

export const ADD_SELECTED_LIST='customertag/ADD_SELECTED_LIST'
export const RESET_SELECTED_LIST='customertag/RESET_SELECTED_LIST'
export const ADD_SECTION_SUCC='customertag/ADD_SECTION_SUCC'
export const DEL_SECTION_SUCC='customertag/DEL_SECTION_SUCC'
export const DEL_LABEL_SUCC='customertag/DEL_LABEL_SUCC'

export const SHOW_ADD = 'customertag/SHOW_ADD'
export const CLOSE_ADD = 'customertag/CLOSE_ADD'
export const SHOW_EDITLABEL = 'customertag/SHOW_EDITLABEL'
export const CLOSE_EDITLABEL = 'customertag/CLOSE_EDITLABEL'

export const SAVE_INPUT = 'customertag/SAVE_INPUT'

export const RECEIVE_ALL_TAG = 'customertag/RECEIVE_ALL_TAG'
export const REQ_SET_TAG_GROUP_UESAGE = 'customertag/REQ_SET_TAG_GROUP_UESAGE'
export const SET_TAG_GROUP_UESAGE_SUCC = 'customertag/SET_TAG_GROUP_UESAGE_SUCC'
export const SET_TAG_GROUP_UESAGE_FAIL = 'customertag/SET_TAG_GROUP_UESAGE_FAIL'

export const clear = mac(CLEAR)
const addFilter = mac(ADD_FILTER, 'field', 'value')
export const resetFilter = mac(RESET_FILTER)
const reqList = mac(REQ_LIST)
const receiveErr = mac(RECEIVE_LIST_ERR)
const receive = mac(RECEIVE_LIST, 'list', 'pagination', 'isAppend')

export const clear_label = mac(CLEAR_LABEL)
const addFilter_label = mac(ADD_FILTER_LABEL, 'field', 'value')
export const resetFilter_label = mac(RESET_FILTER_LABEL)
const reqList_label = mac(REQ_LIST_LABEL)
const receiveErr_label = mac(RECEIVE_LIST_ERR_LABEL)
const receive_label = mac(RECEIVE_LIST_LABEL, 'list', 'pagination', 'isAppend')

export const showAdd = mac(SHOW_ADD)
export const closeAdd = mac(CLOSE_ADD)
export const showEditLabel = mac(SHOW_EDITLABEL)
export const closeEditLabel = mac(CLOSE_EDITLABEL)

export const selectedlist = mac(ADD_SELECTED_LIST, 'field', 'value')
export const resetSelected = mac(RESET_SELECTED_LIST)

export const saveInput = mac(SAVE_INPUT, 'value')

export const sendAddSection = (param,pagination) => dispatch => {
  dispatch(post('/api/tag/add-tag-group', param, (err)=>{
    if(err){
      message.error(err.message || '添加标签分类失败')
    }else{
      dispatch({ type: ADD_SECTION_SUCC})
      dispatch(getData(pagination))
    }
  }))
}

export const sendDelSection = (params,pagination) => dispatch => {
  dispatch(post('/api/tag/remove-tag-group', params, (err)=>{
    if(err){
      message.error(err.message || '删除标签分类失败')
    }else{
      message.success('删除标签分类成功');
      dispatch({ type: DEL_SECTION_SUCC})
      dispatch(getData(pagination))
      dispatch(resetSelected())
    }
  }))
}

//添加标签
export const saveLabel = (param, cb) => dispatch => {
  dispatch(post('/api/tag/add-tag', param, (err)=>{
    if(err){
      message.error(err.message || '添加标签失败')
    }else{
      message.success('添加标签成功');
    }
    cb(err)
  }))
}

export const sendDelLabel = (param, pagination) => dispatch => {
  dispatch(post('/api/tag/remove-tag', param, (err)=>{
    if(err){
      message.error(err.message || '删除标签失败')
    }else{
      message.success('删除标签成功');
      dispatch({ type: DEL_LABEL_SUCC})
      dispatch(getData_label(pagination))
    }
  }))
}

export const getData = (pagination, isAppend) => (dispatch,getState) => {
  pagination = pagination || {current: 1, pageSize: 1000}
  const params = getState().customertag.labelSection['filter']
  dispatch(reqList(params))
  dispatch(post('/api/tag/query-tag-group', _.omit(params, v=>!v), pagination, (err, data, pagination)=>{
    if(err){
      message.error(err.message || '获取标签分类时发生错误')
      dispatch(receiveErr())
    }else{
      dispatch(receive(data, pagination, isAppend))
      dispatch(setFilter("id1",null))
      dispatch(setFilter("id2",null))
    }
  }))
}

export const setFilter = (field, val) => (dispatch) => {
  dispatch(addFilter(field, val))
}

export const getData_label = (pagination, cb) => (dispatch,getState) => {
  pagination = pagination || {current: 1, pageSize: 1000}
  const params = getState().customertag.labelTabel['filter']
  dispatch(reqList_label(params))
  dispatch(post('/api/tag/query-tag', params, pagination, (err, data, pagination)=>{
    if(err){
      message.error(err.message || '获取标签列表时发生错误')
      dispatch(receiveErr_label())
    }else{
      dispatch(receive_label(data, pagination, false))
      dispatch(setFilter_label("id1",null))
      dispatch(setFilter_label("id2",null))
    }
    if(cb){
      cb(err)
    }
  }))
}

export const setFilter_label = (field, val) => (dispatch) => {
  dispatch(addFilter_label(field, val))
}

export const getAllTag = (classification) => dispatch => {
  dispatch(post('/api/tag/query-tag-by-class', {classification}, (err, data)=>{
    if(err){
      message.error(err.message || '获取标签列表时发生错误')
    }else{
      dispatch({type: RECEIVE_ALL_TAG, data})
    }
  }))
}

export const setTagGroupUsage = (useType, groupId, cb) => dispatch => {
  dispatch({type: REQ_SET_TAG_GROUP_UESAGE})
  dispatch(post('/api/tag/config-tag-group-use', {useType, groupId}, (err) => {
    if(err){
      message.error(err.message || '设置可用选项时发生错误')
      dispatch({type: SET_TAG_GROUP_UESAGE_FAIL})
    }else{
      dispatch({type: SET_TAG_GROUP_UESAGE_SUCC})
    }
    cb(err)
  }))
}
