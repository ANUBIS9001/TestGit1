import mac from 'utils/mac'
import {post} from './req'
import {message} from 'antd'
import _ from 'underscore'

export const REQ_LIST = 'alllog/REQ_LIST'
export const RECEIVE_LIST = 'alllog/RECEIVE_LIST'
export const RECEIVE_LIST_ERR = 'alllog/RECEIVE_LIST_ERR'
export const FILTER='alllog/FILTER'
export const CLEAR = 'alllog/CLEAR'
export const setFilter=mac(FILTER,'data')

const reqList = mac(REQ_LIST)
const receive = mac(RECEIVE_LIST, 'list', 'pagination')
const receiveErr = mac(RECEIVE_LIST_ERR)
export const clear = mac(CLEAR)

export const getData = (pagination) => (dispatch,getState) => {
  dispatch(reqList())
  pagination = pagination || {current: 1, pageSize: 10}
  let filter=getState().alllog.filter;
  let params=_.extend({},_.omit(filter, 'key','value'));
  if(filter.value){
      switch(filter.key){
        case 'customerName':
          _.extend(params,{customerName:filter.value});
          break;
        case 'workerName':
          _.extend(params,{workerName:filter.value});
          break;
        case 'contactsName':
          _.extend(params,{contactsName:filter.value});
          break;
        case 'contactsPhone':
          _.extend(params,{contactsPhone:filter.value});
          break;
        default:
          break;
      }
  }
  dispatch(post('/api/marketing/service/query', params, pagination, (err, data, pagination)=>{
    if(err){
      message.error(err.message || '获取数据时发生错误')
      dispatch(receiveErr())
    }else{
      dispatch(receive(data, pagination))
    }
  }))
}
