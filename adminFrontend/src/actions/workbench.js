import mac from 'utils/mac'
import {post} from './req'
import {message} from 'antd'

export const RECEIVE_UNVERIFIED = 'workBench/RECEIVE_UNVERIFIED'
export const RECEIVE_VERIFIED = 'workBench/RECEIVE_VERIFIED'
export const RECEIVE_UNHANDLED='workBench/RECEIVE_UNHANDLED'
export const RECEIVE_HANDLED = 'workBench/RECEIVE_HANDLED'
export const CLEAR = 'workBench/CLEAR'

export const REQ_LIST = 'workBench/REQ_LIST'
export const RECEIVE_LIST_ERR = 'workBench/RECEIVE_LIST_ERR'
export const ADD_FILTER = 'workBench/ADD_FILTER'

export const receiveUnverified = mac(RECEIVE_UNVERIFIED, 'data')
export const receiveVerified = mac(RECEIVE_VERIFIED, 'data')
export const receiveUnhandled = mac(RECEIVE_UNHANDLED, 'data')
export const receiveHandled = mac(RECEIVE_HANDLED, 'data')
export const clear = mac(CLEAR)

export const fetchUnverified = (pagination) => (dispatch) => {
  pagination = pagination || {current: 1, pageSize: 5}
  const params = {status:0}
  dispatch(post('/api/school/query-temp', params, pagination, (err, data)=>{
    if(err){
      message.error(err.message || '获取待审核客户列表时发生错误')
    }else{
      dispatch(receiveUnverified(data))
    }
  }))
}

export const fetchVerified = (pagination) => (dispatch) => {
  pagination = pagination || {current: 1, pageSize: 5}
  const params = {status:0}
  dispatch(post('/api/school/query', params, pagination, (err, data)=>{
    if(err){
      message.error(err.message || '获取已审核客户列表时发生错误')
    }else{
      dispatch(receiveVerified(data))
    }
  }))
}

export const fetchUnhandled = (pagination) => (dispatch) => {
  pagination = pagination || {current: 1, pageSize: 5}
  const params = {status:0}
  dispatch(post('/api/work-order/query-work-order', params, pagination, (err, data)=>{
    if(err){
      message.error(err.message || '获取待处理工单数据时发生错误')
    }else{
      dispatch(receiveUnhandled(data))
    }
  }))
}

export const fetchHandled = (pagination) => (dispatch) =>{
  pagination = pagination || {current: 1, pageSize: 5}
  const params = {status:2}
  dispatch(post('/api/work-order/query-work-order', params, pagination, (err, data)=>{
    if(err){
      message.error(err.message || '获取待处理工单数据时发生错误')
    }else{
      dispatch(receiveHandled(data))
    }
  }))
}
