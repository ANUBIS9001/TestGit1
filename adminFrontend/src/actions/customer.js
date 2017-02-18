import _ from 'underscore'
import mac from 'utils/mac'
import {get, post} from 'act/req'
import {message} from 'antd'

export const ADD_FILTER = 'customer/ADD_FILTER'
export const RESET_FILTER = 'customer/RESET_FILTER'

export const SET_PROVINCES = 'customer/SET_PROVINCES'
export const SET_CITIES = 'customer/SET_CITIES'
export const SET_DISTRICTS = 'customer/SET_DISTRICTS'

export const REQ_LIST = 'customer/REQ_LIST'
export const RECEIVE_LIST = 'customer/RECEIVE_LIST'
export const RECEIVE_LIST_ERR = 'customer/RECEIVE_LIST_ERR'

export const RECEIVE_TODO_DETAIL = 'customer/RECEIVE_TODO_DETAIL'
export const RECEIVE_DONE_DETAIL = 'customer/RECEIVE_DONE_DETAIL'

export const CLEAR_LIST = 'customer/CLEAR_LIST'
export const CLEAR = 'customer/CLEAR'

export const addFilter = mac(ADD_FILTER, 'field', 'value')
export const resetFilter = mac(RESET_FILTER)

const setProvinces = mac(SET_PROVINCES, 'data')
const setCities = mac(SET_CITIES, 'data')
const setDistricts = mac(SET_DISTRICTS, 'data')

const reqList = mac(REQ_LIST)
const receive = mac(RECEIVE_LIST, 'list', 'pagination')
const receiveErr = mac(RECEIVE_LIST_ERR)

const receiveTodoDetail = mac(RECEIVE_TODO_DETAIL, 'data')
const receiveDoneDetail = mac(RECEIVE_DONE_DETAIL, 'data')

export const clearList = mac(CLEAR_LIST)
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

export const getTodoData = (pagination) => (dispatch, getState) => {
  pagination = pagination || {current: 1, pageSize: 10}
  const params = getState().customer['filter'];
  let stage=params.stage;
  if(stage){
    switch(stage){
      case 1:
        _.extend(params,{isGradeSchool:true})
        break;
      case 2:
        _.extend(params,{isMiddleSchool:true})
        break;
      case 3:
        _.extend(params,{isHighSchool:true})
        break;
      case 4:
        _.extend(params,{isGradeSchool:true,isMiddleSchool:true})
        break;
      case 5:
        _.extend(params,{isHighSchool:true,isMiddleSchool:true})
        break;
      case 6:
        _.extend(params,{isGradeSchool:true,isMiddleSchool:true,isHighSchool:true})
        break;
      case 7:
        _.extend(params,{isNurserySchool:true})
        break;
      default:
        break;
    }
  }
  let keyword=params.keyword;
  if(keyword){
    if(_.isNumber(keyword)){
      _.extend(params,{id:keyword})
    }else{
      _.extend(params,{schoolName:keyword})
    }
  }
  dispatch(reqList())
  dispatch(post('/api/school/query-temp', params, pagination, (err, data, pagination)=>{
    if(err){
      message.error(err.message || '获取客户数据时发生错误', 3)
      dispatch(receiveErr())
    }else{
      dispatch(receive(data, pagination))
    }
  }))
}

export const getDoneData = (pagination) => (dispatch, getState) => {
  pagination = pagination || {current: 1, pageSize: 10}
  const params = getState().customer['filter']
  dispatch(reqList())
  dispatch(post('/api/school/query', params, pagination, (err, data, pagination)=>{
    if(err){
      message.error(err.message || '获取客户数据时发生错误', 3)
      dispatch(receiveErr())
    }else{
      dispatch(receive(data, pagination))
    }
  }))
}

export const deletDoneSchool = (schoolId) => (dispatch) => {
  dispatch(post('/api/school/delete',{schoolId},(err, r)=>{
    if(err){
       message.error(err.message || '删除学校失败，请重试！')
    }else{
      message.success("删除成功！")
    }
  }))
}

export const deletTodoSchool = (id) => (dispatch) => {
  dispatch(post('/api/school/delete-temp',{id},(err, r)=>{
    if(err){
       message.error(err.message || '删除学校失败，请重试！')
    }else{
      message.success("删除成功！")
    }
  }))
}

export const addSchool = (params) => (dispatch) => {
  dispatch(post('/api/school/add-temp',params,(err, r)=>{
    if(err){
       message.error(err.message || '添加失败，请重试！')
    }else{
      message.success("添加成功！")
    }
  }))
}

export const getTodoDetailData = (id) => (dispatch) => {
  dispatch(post('/api/school/get-temp', {id}, (err, data)=>{
    if(err){
      message.error(err.message || '获取客户数据时发生错误')
    }else{
      dispatch(receiveTodoDetail(data))
    }
  }))
}

export const examSchool = (params) => (dispatch) => {
  dispatch(post('/api/school/audit',params,(err, r)=>{
    if(err){
       message.error(err.message || '审核失败，请重试！')
    }else{
      message.success("审核成功！")
    }
  }))
}

export const getDoneDetailData = (id) => (dispatch) => {
  dispatch(post('/api/school/get', {id}, (err, data)=>{
    if(err){
      message.error(err.message || '获取客户数据时发生错误')
    }else{
      dispatch(receiveDoneDetail(data))
    }
  }))
}

export const editDoneSchool = (params) => (dispatch) => {
  dispatch(post('/api/school/update',params,(err, r)=>{
    if(err){
       message.error(err.message || '更新失败，请重试！')
    }else{
      message.success("更新成功！")
    }
  }))
}

export const addContact = (params) => (dispatch) => {
  dispatch(post('/api/school/add-customer',params,(err, r)=>{
    if(err){
       message.error(err.message || '添加失败，请重试！')
    }else{
      message.success("添加成功！")
    }
  }))
}