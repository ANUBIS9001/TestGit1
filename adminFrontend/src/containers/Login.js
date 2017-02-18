import './Login.less'
import React from 'react'
import {Form, Input, Button} from 'antd'
import { connect } from 'react-redux'
import {login} from 'act/login'
const FormItem = Form.Item

class Login extends React.Component{
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="xk-page-login">
        <div className="login-head">
          <h1>登录</h1>
        </div>
        <Form ref="form" className="login-form" onSubmit={this.submit.bind(this)}>
          <FormItem label="用户名" >
            {getFieldDecorator('userName', {
              rules: [{required: true, message: '请填写用户名'}]
            })(<Input/>)}
          </FormItem>
          <FormItem label="密码" >
            {getFieldDecorator('password', {
              rules: [{required: true, message: '请填写密码'}]
            })(<Input  type="password"/>)}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" style={{width:'100%'}}>确定</Button>
          </FormItem>
        </Form>
        <div className="login-foot">
          Copyright ©2003-{new Date().getFullYear()}
          <br/>
          Phoenix E-Learning Corporation, All Rights Reserved
        </div>
      </div>
    )
  }

  submit(evt){
    evt.preventDefault()
    this.props.form.validateFields((errors, values) => {
      if(!errors)
        this.props.dispatch(login(values.userName, values.password))
    })
  }
}

Login = Form.create()(Login);

export default connect(function mapStateToProps() {
  return {}
})(Login);
