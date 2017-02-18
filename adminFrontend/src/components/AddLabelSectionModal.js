import React from 'react'
import _ from 'underscore'
import {Button, Form, Input, Row, Col, Modal, message} from 'antd'

class AddLabelSectionModal extends React.Component{
  render(){
    return (
      <Modal
        title={'添加标签分类'}
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
    const { getFieldDecorator } = this.props.form
    const itemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    }

    return (
      <Form horizontal style={{paddingRight: '24px'}}>
        <Row gutter={8}>
          <Col span={20}>
            <Form.Item {...itemLayout} label="分类名称">
              {getFieldDecorator('name', {rules: [
               {required: true, message:'请填写分类名称'},
              ]})(
                <Input size="default" />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={20}>
            <Form.Item {...itemLayout} label="分类标识">
              {getFieldDecorator('classification', {rules: [
               {required: true, message:'请填写分类标识'},
              ]})(
                <Input size="default" />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={20}>
            <Form.Item {...itemLayout} label="分类描述">
              {getFieldDecorator('description', {rules: [
               {required: true, message:'请填写分类描述'},
              ]})(
                <Input size="default" />
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

  handleSubmit(e){
    const {pagination} = this.props
    e.preventDefault()
    this.props.form.validateFields((errors, values) => {
      if(errors) return
      this.props.onOk(values,pagination)
    })
  }
}

export default Form.create()(AddLabelSectionModal)
