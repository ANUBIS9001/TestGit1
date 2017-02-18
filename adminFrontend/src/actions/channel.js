import _ from 'underscore'
import mac from 'utils/mac'
import {get, post} from 'act/req'
import {message} from 'antd'

export const ADD_FILTER = 'channel/ADD_FILTER'
export const RESET_FILTER = 'channel/RESET_FILTER'
export const SET_PROVINCES = 'channel/SET_PROVINCES'
export const SET_CITIES = 'channel/SET_CITIES'
export const SET_DISTRICTS = 'channel/SET_DISTRICTS'
export const REQ_LIST = 'channel/REQ_LIST'
export const RECEIVE_LIST = 'channel/RECEIVE_LIST'
export const RECEIVE_LIST_ERR = 'channel/RECEIVE_LIST_ERR'
export const RECEIVE_TAG_GROUPS_IN_USE = 'channel/RECEIVE_TAG_GROUPS_IN_USE'
export const REQ_SAVE = 'channel/REQ_SAVE'
export const SAVE_SUCC = 'channel/SAVE_SUCC'
export const SAVE_FAIL = 'channel/SAVE_FAIL'
export const RECEIVE_DETAIL = 'channel/RECEIVE_DETAIL'
export const REQ_SET_BIND = 'channel/REQ_SET_BIND'
export const SET_BIND_END = 'channel/SET_BIND_END'
export const CLEAR = 'channel/CLEAR'

export const addFilter = mac(ADD_FILTER, 'field', 'value')
export const resetFilter = mac(RESET_FILTER)
const setProvinces = mac(SET_PROVINCES, 'data')
const setCities = mac(SET_CITIES, 'data')
const setDistricts = mac(SET_DISTRICTS, 'data')
const reqList = mac(REQ_LIST)
const receive = mac(RECEIVE_LIST, 'list', 'pagination')
const receiveErr = mac(RECEIVE_LIST_ERR)
const receiveDetail = mac(RECEIVE_DETAIL, 'data')
export const clear = mac(CLEAR)

export const setFilter = (field, val) => (dispatch) => {
  if(field == 'provinceId'){
    dispatch(addFilter('cityId', null))
    dispatch(addFilter('districtId', null))
    dispatch(setCities([]))
    dispatch(setDistricts([]))
    if(val){
      dispatch(get('/api/area/city',{id: val},(err, r)=>{
        if(!err && r)
          dispatch(setCities(r))
        else
          message.warn('获取城市列表失败 '+ (err && err.message))
      }))
    }
  }else if(field == 'cityId'){
    dispatch(addFilter('districtId', null))
    dispatch(setDistricts([]))
    if(val){
      dispatch(get('/api/area/district',{id: val},(err, r)=>{
        if(!err && r)
          dispatch(setDistricts(r))
        else
          message.warn('获取区县列表失败 ' + (err && err.message))
      }))
    }
  }
  dispatch(addFilter(field, val))
}

export const getProvinces = () => (dispatch) => {

  dispatch(get('/api/area/province',(err, r)=>{
    if(!err && r)
      dispatch(setProvinces(r))
    else
      message.warn('获取省份列表失败 '+ (err && err.message))
  }))
}

export const getData = (pagination) => (dispatch, getState) => {
  pagination = pagination || {current: 1, pageSize: 10}
  const params = getState().channel['filter']

  dispatch(reqList())
  dispatch(post('/api/channel/query-channel', params, pagination, (err, data, pagination)=>{
    if(err){
      message.error(err.message || '获取数据时发生错误')
      dispatch(receiveErr())
    }else{
      dispatch(receive(data, pagination))
    }
  }))
}

export const fetchTagGroupsInUse = () => dispatch =>{
  dispatch(post('/api/tag/query-tag-for-channel', (err, data) => {
    if(err){
       message.error(err.message || '获取可见用户选项是发生错误')
    }else{
      dispatch({type: RECEIVE_TAG_GROUPS_IN_USE, data})
    }
  }))
}

export const saveChannel = (data, cb) => dispatch => {
  const url = data.id ? '/api/channel/modify-channel' : '/api/channel/add-channel'
  data = _.extend({}, data, {
    areas: data.areas.map(a => {return {
      areaId: a.areaId,
      areaType: a.areaType
    }})
  })
  dispatch({type: REQ_SAVE})
  dispatch(post(url, data, 'json', (err) =>{
    if(err){
       message.error(err.message || '保存渠道失败')
       dispatch({type: SAVE_FAIL})
    }else{
      dispatch({type: SAVE_SUCC})
      dispatch(getData())
        message.success('保存成功')
    }
    cb(err)
  }))
}
export const enableChannel = (id) => (dispatch) => {
  dispatch(post('/api/channel/enable-channel',{id},(err, r)=>{
    if(err){
       message.error(err.message || '启用渠道失败，请重试！')
    }else{
      message.success("启用成功！")
    }
  }))
}

export const disableChannel = (id) => (dispatch) => {
  dispatch(post('/api/channel/disable-channel',{id},(err, r)=>{
    if(err){
       message.error(err.message || '禁用渠道失败，请重试！')
    }else{
      message.success("禁用成功！")
    }
  }))
}

export const getDetailData = (id) => (dispatch) => {
  dispatch(post('/api/channel/query-channel-detail', {id}, (err, data)=>{
    if(err){
      message.error(err.message || '获取数据时发生错误')
    }else{
      dispatch(receiveDetail(data))
    }
  }))
}

export const clearDetailData = () => dispatch => {
  dispatch(receiveDetail(null))
}

export const bindUsers = (channelId, sellerId, cb) => dispatch => {
  dispatch(post('/api/channel/binding-seller', {channelId, sellerId}, (err) => {
    if(err){
      message.error(err.message || '绑定业务员时发生错误')
     }
    cb && cb(err)
  }))
}
export const unbindUsers = (channelId, sellerId, cb) => dispatch => {
  dispatch({type: REQ_SET_BIND})
  dispatch(post('/api/channel/unbinding-seller', {channelId, sellerId}, (err) => {
    dispatch({type: SET_BIND_END})
    if(err){
      message.error(err.message || '解除绑定业务员时发生错误')
    }else{

    }
    cb && cb(err)
  }))
}
