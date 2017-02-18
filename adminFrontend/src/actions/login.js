import mac from 'utils/mac'
// import md5 from 'md5'
import {message} from 'antd'
import {post} from './req'
import {fetchMenu} from 'act/main'

export const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS'
export const TO_LOGIN = 'login/TO_LOGIN'

export const toLogin = mac(TO_LOGIN)

export const login = (name, password) => dispatch => {
  dispatch(post('/api/account/login', {name, password}, (err) => {
    if(!err){
      // dispatch(receiveProfile(r))
      dispatch({type: LOGIN_SUCCESS})
      dispatch(fetchMenu())
    }else{
      message.error(err.message || '登录失败')
    }
  }))
}

export const logout = () => dispatch =>{
  dispatch(post('/api/account/logout', (err)=>{
    if(err){
      message.error('注销失败，请重试')
    }else{
      location.reload()
    }
  }))
}
