import _ from 'underscore'
import fetch from 'utils/fetch'
import {toLogin} from 'act/login'

/**
 * 用于Ajax请求的action。第一个参数必须为url，第二个参数必须为method(post、get等)。
 * 也可以使用post和get来替代此action使用，则无需传递method参数。
 * 其它所有参数没有顺序限制。
 * @param url【string】
 * @param method【string】 (post | get | delete | update)
 * @param params【object】 参数对象
 * @param pagination【object】分页信息对象，必须包含current和pageSize属性。
 *        若存在pagination参数，则回调函数将传递包含total的分页信息为第三个参数
 * @param callback【function】 请求回调函数，将传递的参数包括：
 *          err【{code:[string], message:[string]}】
 *          data【object】 接口返回内容的data字段
 *          pagination【{total:[int], current:[int], pageSize:[int]}】 仅当存在分页信息时有此参数
 */
const req = (url, method, ...args) => dispatch => {
  let cb = function(){}, body = null, pagination = null, contentType = undefined
  args.forEach((arg)=>{
    if(typeof arg == 'function'){
      cb = arg
    }else if(typeof arg == 'object'){
      if(arg.pageSize && arg.current){
        pagination = _.extend({}, {
          pageNo: arg.current,
          pageSize: arg.pageSize
        })
      }else{
        body = _.clone(arg)
      }
    }else if(arg=='json'){
      contentType = 'json'
    }
  })
  if(pagination){
    if(body){
      _.extend(body, pagination)
    }else{
      body = pagination
    }
  }

  fetch(url, method, contentType, body, function(err, data){
    if(err){
      if(err.statusCode == 401){
        dispatch(toLogin())
      }
      cb(err)
    }else{
      let retCode = data && data.code
      if(retCode == '200' ||retCode == '0'){
        if(!data.data && pagination){
          return cb( null, [], pagination)
        }
        if(pagination){
          return cb(null, data.data.result, _.extend({}, pagination, {total: data.data.total, current: pagination.pageNo}))
        }
        cb(null, data.data)
      }else if(retCode == '401'){
        dispatch(toLogin())
      }else{
        cb(data || {msg: '未知错误', code: -1})
      }
    }
  })
}

export function post(url, ...args){
  return req.call(this, url, 'POST', ...args)
}

export function get(url, ...args){
  return req.call(this, url, 'GET', ...args)
}

export function genFetchAction(url, acts, filterPath, cb = ()=>{}){
  if(_.isString(filterPath))
    filterPath = filterPath.split('.')
  return (extraParams = {}) => (dispatch, getState) => {
    dispatch(acts.creaters.req())
    let filter =  getFilter(getState(), filterPath)
    let pagination = undefined
    if(extraParams.current && extraParams.pageSize){
      pagination = _.extend({}, extraParams)
    }else{
      filter = _.extend({}, filter, extraParams)
    }
    dispatch(get(url, filter, pagination, (err, r, pagination)=>{
      if(err){
        dispatch(acts.creaters.err())
      }else{
        dispatch(acts.creaters.succ(r, pagination))
      }
      cb(err, r, dispatch)
    }))
  }

  function getFilter(state, path){
    if(!path) return {}
    return path.length ? getFilter(state[path[0]], path.slice(1)) : state
  }
}

export default req
