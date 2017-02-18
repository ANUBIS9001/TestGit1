import mac from 'utils/mac'
import {post} from './req'
import {message} from 'antd'

export const CLEAR = 'worksheet/CLEAR'
export const ADD_FILTER = 'worksheet/ADD_FILTER'
export const RESET_FILTER = 'worksheet/RESET_FILTER'
export const REQ_LIST = 'worksheet/REQ_LIST'
export const RECEIVE_LIST = 'worksheet/RECEIVE_LIST'
export const RECEIVE_LIST_ERR = 'worksheet/RECEIVE_LIST_ERR'
export const REQ_FILTER='worksheet/REQ_FILTER'

export const CLEAR_MINE = 'worksheet/CLEAR_MINE'
export const ADD_FILTER_MINE = 'worksheet/ADD_FILTER_MINE'
export const RESET_FILTER_MINE = 'worksheet/RESET_FILTER_MINE'
export const REQ_FILTER_MINE ='worksheet/REQ_FILTER_MINE'
export const REQ_LIST_MINE = 'worksheet/REQ_LIST_MINE'
export const RECEIVE_LIST_MINE = 'worksheet/RECEIVE_LIST_MINE'
export const RECEIVE_LIST_ERR_MINE = 'worksheet/RECEIVE_LIST_ERR_MINE'

//多选删除相关
export const ADD_SELECTED_LIST='worksheet/ADD_SELECTED_LIST'
export const RESET_SELECTED_LIST='worksheet/RESET_SELECTED_LIST'
export const ADD_SELECTED_LIST_MINE='worksheet/ADD_SELECTED_LIST_MINE'
export const RESET_SELECTED_LIST_MINE='worksheet/RESET_SELECTED_LIST_MINE'

//详情页的相关
export const SUBMIT_RESULT_SUCC = 'worksheet/SUBMIT_RESULT_SUCC'
export const RECEIVE_DETAIL = 'worksheet/RECEIVE_DETAIL'
export const CLEAR_DETAIL = 'worksheet/CLEAR_DETAIL'
export const RECEIVE_ORDERLOG = 'worksheet/RECEIVE_ORDERLOG'
export const ADD_FILTER_HANDLE = 'worksheet/ADD_FILTER_HANDLE'
export const RESET_FILTER_HANDLE = 'worksheet/RESET_FILTER_HANDLE'

//用来显示和隐藏工单详情
export const SHOW_SHEET_DETAIL = 'worksheet/SHOW_SHEET_DETAIL'
export const CLOSE_SHEET_DETAIL = 'worksheet/CLOSE_SHEET_DETAIL'
export const showSheetDetail = mac(SHOW_SHEET_DETAIL)
export const closeSheetDetail = mac(CLOSE_SHEET_DETAIL)

export const clear = mac(CLEAR)
const addFilter = mac(ADD_FILTER, 'field', 'value')
export const resetFilter = mac(RESET_FILTER)
const reqList = mac(REQ_LIST)
const receiveErr = mac(RECEIVE_LIST_ERR)
const receive = mac(RECEIVE_LIST, 'list', 'pagination', 'isAppend')

export const clear_mine = mac(CLEAR_MINE)
const addFilter_mine = mac(ADD_FILTER_MINE, 'field', 'value')
export const resetFilter_mine = mac(RESET_FILTER_MINE)
const reqList_mine = mac(REQ_LIST_MINE)
const receiveErr_mine = mac(RECEIVE_LIST_ERR_MINE)
const receive_mine = mac(RECEIVE_LIST_MINE, 'list', 'pagination', 'isAppend')

export const cleardetail = mac(CLEAR_DETAIL)
const receriveDetail = mac(RECEIVE_DETAIL, 'data')
const receriveOrderLog = mac(RECEIVE_ORDERLOG, 'data')
const addFilter_handle = mac(ADD_FILTER_HANDLE, 'field', 'value')

export const resetFilter_handle = mac(RESET_FILTER_HANDLE)
export const setFilter_handle = (field, val) => (dispatch) => {
  dispatch(addFilter_handle(field, val))
}

//删除工单
export const selectedlist = mac(ADD_SELECTED_LIST, 'field', 'value')
export const resetSelected = mac(RESET_SELECTED_LIST)
export const selectedlist_mine = mac(ADD_SELECTED_LIST_MINE, 'field', 'value')
export const resetSelected_mine = mac(RESET_SELECTED_LIST_MINE)
export const sendDelSheet = (params,pagination1,pagination2) => dispatch => {
  dispatch(post('/api/work-order/remove-work-order', params, (err)=>{
    if(err){
      message.error(err.message || '删除工单失败')
    }else{
      message.success('删除工单成功');
      dispatch(getData(pagination1))
      dispatch(getData_mine(pagination2))
      dispatch(resetSelected())
      dispatch(resetSelected_mine())
    }
  }))
}

//工单处理
export const sheetHandle = () => (dispatch,getState) => {
  const params = getState().worksheet['handleFilter']
  dispatch(post('/api/work-order/handle-work-order', params, (err)=>{
    if(err){
      message.error(err.message || '工单处理出现错误')
    }else{
      message.success('工单处理成功');
      dispatch({ type: SUBMIT_RESULT_SUCC})
      dispatch(clear())
      dispatch(getData())
      dispatch(clear_mine())
      dispatch(getData_mine())
    }
  }))
}

//工单进度
export const getSheetOrderLog = (params) => dispatch => {
  dispatch(post('/api/work-order/query-work-order-log', params, (err,data)=>{
    if(err){
      message.error(err.message || '查询工单进度出现错误')
      dispatch({ type: CLOSE_SHEET_DETAIL})
    }else{
      dispatch(receriveOrderLog(data))
    }
  }))
}

//工单详情
export const getSheetDetail = (params) => dispatch => {
  dispatch(post('/api/work-order/query-work-order-by-id', params, (err,data)=>{
    if(err){
      message.error(err.message || '查询工单详情出现错误')
      dispatch({ type: CLOSE_SHEET_DETAIL})
    }else{
      dispatch(receriveDetail(data))
    }
  }))
}

export const getData = (pagination, isAppend) => (dispatch,getState) => {
  pagination = pagination || {current: 1, pageSize: 10}
  const params = getState().worksheet.worksheet['filter']
  dispatch(reqList(params))
  dispatch(post('/api/work-order/query-work-order', params, pagination, (err, data, pagination)=>{
    if(err){
      message.error(err.message || '获取全部工单数据时发生错误')
      dispatch(receiveErr())
    }else{
      dispatch(receive(data, pagination, isAppend))
    }
  }))
}

export const getData_mine = (pagination, isAppend) => (dispatch,getState) => {
  pagination = pagination || {current: 1, pageSize: 10}
  const params = getState().worksheet.myworksheet['filter']

  let url = "";
  if(params.handle=="1"){//由我处理
    url = '/api/work-order/query-work-order-for-handler'
  }else if(params.handle=="2"){//待我处理
    params.status="0"
    url = '/api/work-order/query-work-order-for-handler'
  }else if(params.handle=="3"){//由我处理
    params.status="2"
    url = '/api/work-order/query-work-order-for-handler'
  }else if(params.handle=="4"){//由我发起
    url = '/api/work-order/query-work-order-for-creator'
  }else if(params.handle=="5"){//抄送我的
    url = '/api/work-order/query-work-order-for-other'
  }else{
    url = '/api/work-order/query-work-order-for-handler'
  }

  dispatch(reqList_mine(params))
  dispatch(post(url, params, pagination, (err, data, pagination)=>{
    if(err){
      message.error(err.message || '获取我的工单数据时发生错误')
      dispatch(receiveErr_mine())
    }else{
      dispatch(receive_mine(data, pagination, isAppend))
    }
  }))
}

export const setFilter = (field, val) => (dispatch) => {
  dispatch(addFilter(field, val))
}

export const setFilter_mine = (field, val) => (dispatch) => {
  dispatch(addFilter_mine(field, val))
}
