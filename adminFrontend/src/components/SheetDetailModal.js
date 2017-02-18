require('./SheetDetailModal.less')
import React from 'react'
import _ from 'underscore'
import {Button, Form, Input, Row, Col, Modal, Timeline, Radio } from 'antd'
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import {categoryStatus} from '../data/status'

class SheetDetailModal extends React.Component{
  render(){
    return (
      <Modal
        className="xk-modal-sheetDetail"
        title={''}
        visible={true}
        maskClosable={false}
        onCancel={this.props.onCancel}
        style={{top: '50px'}}
        footer={null}
      >
        {this.renderDetail()}
        {this.renderForm()}
      </Modal>
    )
  }

  renderDetail(){
    const {workDetail} = this.props
    return (
      <div>
      <span className="title">工单详情</span>
      <div className="sheetHandle"></div>
      <Row gutter={8}>
        <Col span={30} className="flex-container">
          <span className="spanLeft">* 工单标题：</span><span className="spanRight">{workDetail.name}</span>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={30} className="flex-container">
          <span className="spanLeft">* 工单发起人：</span><span className="spanRight">{workDetail.creator}</span>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={30} className="flex-container">
          <span className="spanLeft">抄送人：</span><span className="spanRight">{workDetail.other}</span>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={30} className="flex-container">
          <span className="spanLeft">类别：</span><span className="spanRight">{
            categoryStatus[workDetail.classification]
            ?categoryStatus[workDetail.classification]:workDetail.classification}</span>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={30} className="flex-container">
          <span className="spanLeft">描述：</span><span className="spanRight">{workDetail.description}</span>
        </Col>
      </Row>
      </div>
    )
  }

  renderForm(){
    const { getFieldDecorator } = this.props.form
    const {workOrderLog,setFilter_handle,handleFilter,workDetail,onCancel} = this.props
    const itemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    }

    return (
      <div>

      <span className="title">处理工单</span>
      <div className="sheetHandle"></div>

      <div className="timelinediv">
      <Timeline className="timeline">
        {workOrderLog.map(item=>
          <Timeline.Item key={item.id}> [{item.handleTime}}] {item.title} </Timeline.Item>
        )}
      </Timeline>
      </div>

      {workDetail.status==0?
      <Form horizontal style={{paddingRight: '24px'}}>
        <Row gutter={8}>
          <Col span={20}>
            <Form.Item {...itemLayout} label="处理结果">
                <RadioGroup className="nomarginr"
                  value={handleFilter.status?handleFilter.status:"2"}
                  onChange={this.handleOp.bind(this)}
                  >
                  <RadioButton value="2">完成</RadioButton>
                  <RadioButton value="3">退回</RadioButton>
                  <RadioButton value="1">转发他人</RadioButton>
                </RadioGroup>
            </Form.Item>
          </Col>
        </Row>
        {handleFilter.status==1?
        <Row gutter={8}>
          <Col span={20}>
            <Form.Item {...itemLayout} label="转发人">
              {getFieldDecorator('forward', {rules: [
               {required: true, message:'请填写转发人'},
              ]})(
                <Input size="default"
                onChange={ val => {
                      setFilter_handle("forward", _.isString(val) ? val : val.target.value)
                    }
                  }
                />
              )}
            </Form.Item>
          </Col>
        </Row>:""}
        <Row gutter={8}>
          <Col span={20}>
            <Form.Item {...itemLayout} label="处理意见">
              {getFieldDecorator('suggestion', {rules: [
               {required: true, message:'请填写处理意见'},
              ]})(
                <Input type="textarea"  size="default"
                onChange={ val => {
                      setFilter_handle("suggestion", _.isString(val) ? val : val.target.value)
                    }
                  }
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row style={{textAlign:'right'}}>
          <Col span={24}>
            <Button type="ghost" onClick={this.hadleReset.bind(this)}>重置</Button>&nbsp;&nbsp;
            <Button type="primary" onClick={this.handleSubmit.bind(this)}>确定</Button>
          </Col>
        </Row>
      </Form>
      :<div style={{textAlign:'right'}}><Button type="ghost" onClick={()=>onCancel()}>关闭</Button></div>}
      </div>
    )
  }

  handleSubmit(e){
    const {sheetHandle} = this.props
    e.preventDefault()
    this.props.form.validateFields((errors, values) => {
      if(errors) return
      sheetHandle();
    })
  }

  hadleReset(e){
    const {setFilter_handle} = this.props
    setFilter_handle('status',"2")
    this.props.form.setFieldsValue({forward:""})
    this.props.form.setFieldsValue({suggestion:""})
  }

  handleOp(event){
    const {setFilter_handle} = this.props
    let v=event.target.value;
    setFilter_handle('status',v)
  }
}

export default Form.create()(SheetDetailModal)
