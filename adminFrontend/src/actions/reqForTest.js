// 仅用于开发时测试数据
import _ from 'underscore'

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
const req = (url, method, ...args) => () => {
  let cb = function(){}, body = null, pagination = null
  args.forEach((arg)=>{
    if(typeof arg == 'function'){
      cb = arg
    }else if(typeof arg == 'object'){
      if(arg.pageSize && arg.current){
        pagination = arg
      }else{
        body = _.clone(arg)
      }
    }
  })
  body = body || {}
  body._t = +new Date()
  if(pagination){
    if(body){
      _.extend(body, _.pick(pagination, 'current', 'pageSize'))
    }else{
      body = pagination
    }
  }
  getDevData(url, cb, pagination, body)
}

export function post(url, ...args){
  return req.call(this, url, 'POST', ...args)
}

export function get(url, ...args){
  return req.call(this, url, 'GET', ...args)
}

export default req

function getDevData(url, cb, pagination, body){
  setTimeout(function(){
    const target = testSet[url]
    if(!target){
      cb({code: 404, message: '接口不存在'})
    }else{
      let r = testSet[url], err = null
      if (_.isFunction(r)) r = r(pagination, body)
      if(r.code && r.message){
        err = r
      }
      if(pagination){
        pagination.total = _.isNumber(r.total) ? r.total : 100
        cb(err, r, pagination)
      }else{
        cb(err, r)
      }
    }
  },Math.floor(Math.random()*1000))
}

const testSet = {
  ['/api/model/menu'](){return [
    {
      "moduleId": 1,
      "moduleName": "我的工作台",
      "moduleType": "page",
      "moduleDefine": "workbench",
      "parentId": 0
    },
    {
      "moduleId": 2,
      "moduleName": "权限模块",
      "moduleType": "folder",
      "moduleDefine": "",
      "parentId": 0
    },
    {
      "moduleId": 21,
      "moduleName": "权限管理",
      "moduleType": "page",
      "moduleDefine": "authority",
      "parentId": 2
    },
    {
      "moduleId": 22,
      "moduleName": "角色管理",
      "moduleType": "page",
      "moduleDefine": "roles",
      "parentId": 2
    },
    {
      "moduleId": 23,
      "moduleName": "用户管理",
      "moduleType": "page",
      "moduleDefine": "users",
      "parentId": 2
    },
    {
      "moduleId": 3,
      "moduleName": "工单模块",
      "moduleType": "page",
      "moduleDefine": "worksheet",
      "parentId": 0
    },
    {
      "moduleId": 4,
      "moduleName": "客户资料模块",
      "moduleType": "folder",
      "moduleDefine": "",
      "parentId": 0
    },
    {
      "moduleId": 41,
      "moduleName": "客户管理",
      "moduleType": "page",
      "moduleDefine": "customer",
      "parentId": 4
    },
    {
      "moduleId": 42,
      "moduleName": "客户标签",
      "moduleType": "page",
      "moduleDefine": "customertag",
      "parentId": 4
    },
    {
      "moduleId": 5,
      "moduleName": "日志模块",
      "moduleType": "folder",
      "moduleDefine": "",
      "parentId": 0
    },
    {
      "moduleId": 51,
      "moduleName": "用户访问日志",
      "moduleType": "page",
      "moduleDefine": "visitlog",
      "parentId": 5
    },
    {
      "moduleId": 52,
      "moduleName": "业务通话日志",
      "moduleType": "page",
      "moduleDefine": "alllog",
      "parentId": 5
    },
  ]},

  ['/api/model/worksheet'](){return [
    {
      "col1": "1",
      "col2": "资源定制",
      "col3": "李三",
      "col4": "李三",
      "col5": "刘六",
      "col6": "xxxxxxxxxxx",
      "col7": "系统界面",
      "col8": "2016-12-20 15:30:32",
    },
    {
      "col1": "2",
      "col2": "资源定制",
      "col3": "李三",
      "col4": "李三",
      "col5": "刘六",
      "col6": "xxxxxxxxxxx",
      "col7": "系统界面",
      "col8": "2016-12-20 15:30:32",
    },
  ]},

  ['/api/model/workbench'](){return [
    {
      "col1": "株洲天元小学",
      "col2": "2016-12-20 15:30:32",
    },
  ]}
}
