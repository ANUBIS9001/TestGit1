import React from 'react'
import _ from 'underscore'
import {Button, Form, Input, Radio, Select, Row, Col, Modal, message} from 'antd'

class AddContactModal extends React.Component{
  render(){
    const {editting} = this.props
    return (
      <Modal
        title={`${editting ? '编辑' : '添加'}联系人`}
        visible={true}
        maskClosable={false}
        onCancel={this.props.onCancel}
        style={{top: '50px'}}
        footer={null}
      >
        {this.renderForm()}
      </Modal>
    )
  }

  renderForm(){
    const initData = this.props.editting || {}
    const { getFieldDecorator } = this.props.form
    const itemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    }
    return (
      <Form horizontal style={{paddingRight: '24px'}}>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item {...itemLayout} label="姓名">
              {getFieldDecorator('customer', {initialValue:initData.customer, rules: [
               {required: true, message:'请填写联系人姓名'},
               {pattern: /^[\u2E80-\u9FFF]{2,}$/, message: '请输入两个以上汉字'}
              ]})(
                <Input size="default" disabled={!!initData.customer}/>
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item {...itemLayout} label="状态">
              {getFieldDecorator('workStatus', { initialValue: '1' })(
                <Select style={{ width: '100%' }} disabled={true}>
                  <Select.Option value="1">在职</Select.Option>
                  <Select.Option value="2">离职</Select.Option>
                  <Select.Option value="3">转校</Select.Option>
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item labelCol={{span:3}} wrapperCol={{span:21}} label="职称">
              {getFieldDecorator('customerJob', { initialValue: initData.customerJob || '教师' })(
                <Radio.Group disabled={!!initData.customerJob}>
                <Radio value="校长">校长</Radio>
                <Radio value="副校长">副校长</Radio>
                <Radio value="主任">主任</Radio>
                <Radio value="副主任">副主任</Radio>
                <Radio value="教师">教师</Radio>
                </Radio.Group>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item {...itemLayout} label="座机">
              {getFieldDecorator('linkPhone', {
                initialValue: initData.linkPhone,
                rules: [
                  //  {validator: this.checkPhone.bind(this) },
                   {pattern: /^0\d{2,3}\-[1-9]\d{6,7}(\-\d+)?$/, message:'请输入正确的座机号码'}
                ]
              })(
                <Input size="default" placeholder="格式:010-68889999-1012" disabled={!!initData.linkPhone}/>
              )}
            </Form.Item>
            <Form.Item {...itemLayout} label="QQ">
              {getFieldDecorator('linkQQ', {initialValue:initData.linkQQ, rules: [
                {pattern: /^\d{5,}$/, message:'请输入正确的QQ号'}
              ]})(
                <Input size="default" disabled={!!initData.linkQQ}/>
              )}
            </Form.Item>
            <Form.Item {...itemLayout} label="邮编">
              {getFieldDecorator('zipCode', {initialValue:initData.zipCode, rules: [
                {pattern: /^\d{6}$/, message:'请输入6位邮政编码'}
              ]})(
                <Input size="default" disabled={!!initData.zipCode}/>
              )}
            </Form.Item>

          </Col>
          <Col span={12}>
            <Form.Item {...itemLayout} label="手机">
              {getFieldDecorator('linkMobile', {
                initialValue: initData.linkMobile,
                rules: [ {pattern: /^1\d{10}$/, message:'请输入正确的手机号码'} ]
              })(
                <Input size="default" placeholder="座机和手机需至少填写一项" disabled={!!initData.linkMobile}/>
              )}
            </Form.Item>
            <Form.Item {...itemLayout} label="Email">
              {getFieldDecorator('linkEmail', {initialValue:initData.linkEmail, rules: [
                {type: 'email', message:'请输入正确的Email地址'}
              ]})(
                <Input size="default" disabled={!!initData.linkEmail}/>
              )}
            </Form.Item>
            <Form.Item {...itemLayout} label="地址">
              {getFieldDecorator('address', {initialValue:initData.address})(
                <Input size="default" disabled={!!initData.address}/>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item labelCol={{span:3}} wrapperCol={{span:21}} label="备注">
            {getFieldDecorator('remark', {initialValue:initData.remark})(
              <Input size="default"/>
            )}
            </Form.Item>
          </Col>
        </Row>
        <Row style={{textAlign:'right'}}>
          <Col span={24}>
            <Button type="primary" onClick={this.handleSubmit.bind(this)}>确定</Button>
          </Col>
        </Row>
      </Form>
    )
  }

  checkPhone(rule, value, cb){
    const { getFieldValue } = this.props.form
    if(!getFieldValue('linkPhone') && !getFieldValue('linkMobile'))
      cb('座机和手机需至少填写一项')
    else
      cb()
  }

  handleSubmit(e){
    const initData = this.props.editting
    e.preventDefault()
    this.props.form.validateFields((errors, values) => {
      console.log(errors);
      if(errors) return
      if(!values.linkPhone && !values.linkMobile)
        return message.error('座机和手机需至少填写一项')
      this.props.onSubmit(_.extend({}, initData, values))
    })
  }
}

export default Form.create()(AddContactModal)
