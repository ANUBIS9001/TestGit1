import mac from 'utils/mac'
import {post,get} from './req'
import {message} from 'antd'
import _ from 'underscore'

export const REQ_LIST = 'visitlog/REQ_LIST'
export const RECEIVE_LIST = 'visitlog/RECEIVE_LIST'
export const RECEIVE_LIST_ERR = 'visitlog/RECEIVE_LIST_ERR'
export const FILTER='visitlog/FILTER'
export const CLEAR = 'visitlog/CLEAR'
export const setFilter=mac(FILTER,'data')


export const RECEIVE_DETAIL = 'visitlog/RECEIVE_DETAIL'
export const CLEARDETAIL = 'visitlog/CLEARDETAIL'


const receiveDetail = mac(RECEIVE_DETAIL, 'detail')
export const clearDetail = mac(CLEARDETAIL)

const reqList = mac(REQ_LIST)
const receive = mac(RECEIVE_LIST, 'list', 'pagination')
const receiveErr = mac(RECEIVE_LIST_ERR)
export const clear = mac(CLEAR)

export const getData = (pagination) => (dispatch,getState) => {
  dispatch(reqList())
  pagination = pagination || {current: 1, pageSize: 10}
  let filter=getState().visitlog.filter;
  dispatch(post('/api/log/query', filter, pagination, (err, data, pagination)=>{
    if(err){
      message.error(err.message || '获取数据时发生错误')
      dispatch(receiveErr())
    }else{
      dispatch(receive(data, pagination))
    }
  }))
}

export const getDetailsData = (id) => (dispatch,getState) => {
  dispatch(get('/api/log/get', {id}, (err, data)=>{
    if(err){
      message.error(err.message || '获取数据时发生错误')
    }else{
      dispatch(receiveDetail(data))
    }
  }))
}
