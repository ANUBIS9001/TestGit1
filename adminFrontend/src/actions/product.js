import mac from 'utils/mac'
import {post} from './req'
import {message} from 'antd'

export const CLEAR = 'product/CLEAR'
export const ADD_FILTER = 'product/ADD_FILTER'
export const RESET_FILTER = 'product/RESET_FILTER'
export const REQ_LIST = 'product/REQ_LIST'
export const RECEIVE_LIST = 'product/RECEIVE_LIST'
export const RECEIVE_LIST_ERR = 'product/RECEIVE_LIST_ERR'
export const REQ_FILTER='product/REQ_FILTER'
export const RECEIVE_TAG_GROUPS_IN_USE = 'product/RECEIVE_TAG_GROUPS_IN_USE'
export const RECEIVE_DETAIL = 'product/RECEIVE_DETAIL'
export const REQ_SAVE = 'product/REQ_SAVE'
export const SAVE_SUCC = 'product/SAVE_SUCC'
export const SAVE_FAIL = 'product/SAVE_FAIL'

export const clear = mac(CLEAR)
const addFilter = mac(ADD_FILTER, 'field', 'value')
export const resetFilter = mac(RESET_FILTER)
const reqList = mac(REQ_LIST)
const receiveErr = mac(RECEIVE_LIST_ERR)
const receive = mac(RECEIVE_LIST, 'list', 'pagination', 'isAppend')

export const getData = (pagination, isAppend) => (dispatch,getState) => {
  pagination = pagination || {current: 1, pageSize: 10}
  const params = getState().product['filter']
  dispatch(reqList(params))
  dispatch(post('/api/product/query-product', params, pagination, (err, data, pagination)=>{
    if(err){
      message.error(err.message || '获取产品列表时发生错误')
      dispatch(receiveErr())
    }else{
      dispatch(receive(data, pagination, isAppend))
    }
  }))
}

export const setFilter = (field, val) => (dispatch) => {
  dispatch(addFilter(field, val))
}

export const fetchTagGroupsInUse = () => dispatch =>{
  dispatch(post('/api/tag/query-tag-for-sales-target', (err, data) => {
    if(err){
       message.error(err.message || '获取可见用户选项时发生错误')
    }else{
      dispatch({type: RECEIVE_TAG_GROUPS_IN_USE, data})
    }
  }))
}

//暂停产品销售
export const pauseProductSell = (params,pagination) => dispatch => {
  dispatch(post('/api/product/suspend-product-sales', params, (err)=>{
    if(err){
      message.error(err.message || '暂停产品销售失败')
    }else{
      message.success('暂停产品销售成功');
      dispatch(getData(pagination))
    }
  }))
}

//恢复产品销售
export const resumeProductSell = (params,pagination) => dispatch => {
  dispatch(post('/api/product/resume-product-sales', params, (err)=>{
    if(err){
      message.error(err.message || '恢复产品销售失败')
    }else{
      message.success('恢复产品销售成功');
      dispatch(getData(pagination))
    }
  }))
}

export const fetchDetail = (productId) => dispatch => {
  dispatch(post('/api/product/query-product-detail', {productId}, (err, data)=>{
    if(err){
      message.error(err.message || '获取产品信息失败')
    }else{
      dispatch({type: RECEIVE_DETAIL, data})
    }
  }))
}

export const clearDetail = () => dispatch =>  dispatch({type: RECEIVE_DETAIL, data: null})

export const save = (data, cb) => dispatch => {
  const url = data.productId ? '/api/product/modify-product' : '/api/product/add-product'
  dispatch({type: REQ_SAVE})
  dispatch(post(url, data, 'json', (err, data)=>{
    if(err){
      message.error(err.message || '保存产品失败')
      dispatch({type: SAVE_FAIL})
    }else{
      dispatch({type: SAVE_SUCC, data})
      dispatch(getData())
    }
    cb && cb(err)
  }))
}
