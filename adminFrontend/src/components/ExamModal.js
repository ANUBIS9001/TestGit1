import _ from 'underscore'
import React from 'react'
import {Button, Modal, Row, Col,Form,Input,Radio } from 'antd'
import {schoolTypeList} from 'data/schoolType'
const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class ExamModal extends React.Component{
  render(){

    return (
      <Modal
        title="添加客户"
        visible={true}
        maskClosable={false}
        onCancel={this.props.onCancel}
        footer={null}
      >
        {this.renderInfo()}
        {this.renderForm()}
      </Modal>
    )
  }

  renderInfo(){
    let title={color:'#108ee9',fontSize:'15px'};
    let content={color:'#aaa'}
    let info=this.props.info;
    let school=schoolTypeList.find((item)=>item.key==info.schoolType)
    let schoolType=school?school.text:'';
    let stage=(info.isNurserySchool?'幼儿园，':'')+(info.isGradeSchool?'小学，':'')+(info.isMiddleSchool?'初中，':'')+(info.isHighSchool?'高中':'')
    return (
      <div style={{marginBottom:15}}>
        <Row style={{marginBottom:15}} >
          <Col span={24}>
            <span style={title}>基本信息</span>
          </Col>
        </Row>
        <div style={{marginBottom:10,marginLeft:10}}>
          <Row >
            <Col span={4}>
              <span >客户名：</span>
            </Col>
            <Col span={7}>
              <span style={content}>{info.schoolName}</span>
            </Col>
            <Col span={4}>
              <span >成立日期：</span>
            </Col>
            <Col span={7}>
              <span style={content}>{info.schoolEstablishment}</span>
            </Col>
          </Row>
          <Row >
            <Col span={4}>
              <span >客户类型：</span>
            </Col>
            <Col span={7}>
              <span style={content}>{schoolType}</span>
            </Col>
            <Col span={4}>
              <span >学段：</span>
            </Col>
            <Col span={7}>
              <span style={content}>{stage}</span>
            </Col>
          </Row>
        </div>

        <Row style={{marginBottom:15,marginTop:15}} >
          <Col span={24}>
            <span style={title}>联系信息</span>
          </Col>
        </Row>
        <div style={{marginBottom:10,marginLeft:10}}>
          <Row style={{marginBottom:10}}>
            <Col span={4}>
              <span >客户地址：</span>
            </Col>
            <Col span={18}>
              <span style={content}>{info.provinceName+info.cityName+info.districtName+info.schoolAddress}</span>
            </Col>
          </Row>
          <Row style={{marginBottom:10}}>
            <Col span={4}>
              <span >邮编：</span>
            </Col>
            <Col span={8}>
              <span style={content}>{info.schoolZipcode}</span>
            </Col>
            <Col span={4}>
              <span >官方网址：</span>
            </Col>
            <Col span={8}>
              <span style={content}>{info.schoolSite}</span>
            </Col>
          </Row>
        </div>

        <Row style={{marginBottom:15,marginTop:15}} >
          <Col span={24} style={title}>
            <span >备注</span>
          </Col>
        </Row>
        <div style={{marginBottom:10,marginLeft:10}}>
          <Row >
            <Col span={4} >
              <span >备注：</span>
            </Col>
            <Col span={18}>
              <span style={content}>{info.surveyInfo}</span>
            </Col>
          </Row>
        </div>
      </div>
    )
  }

  renderForm(){
    const { getFieldDecorator } = this.props.form
    const itemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 20 }
    }
    const tailFormItemLayout = {
      wrapperCol: {
        span: 6,
        offset: 20,
      },
    }
    return (
      <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
        <FormItem
          {...itemLayout}
          label="审核"
          hasFeedback
        >
          {getFieldDecorator('checkStatus', {
            rules: [{
              required: true, message: '请选择！',
            }],
            initialValue: '1',
          })(
            <RadioGroup >
              <RadioButton value="1">通过</RadioButton>
              <RadioButton value="2">驳回</RadioButton>
            </RadioGroup>
          )}
        </FormItem>
        
        <FormItem
          {...itemLayout}
          label="备注"
          hasFeedback
        >
          {getFieldDecorator('surveyInfo')(
            <Input type="textarea" rows={4}/>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">提交</Button>
        </FormItem>
  </Form>
    )
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let id=this.props.info.id;
        _.extend(values,{id:id});

        this.props.onOk(values);
      }
    });
  }
}
export default Form.create()(ExamModal)
