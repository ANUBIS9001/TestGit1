import React from 'react'
import _ from 'underscore'
import {Button, Form, Input, Select,Row, Col, Modal, message, DatePicker, Checkbox, } from 'antd'
import {schoolTypeList} from 'data/schoolType'
import fetch from 'utils/fetch'

const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group

class AddSchoolModal extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      provinceId:0,
      cityId:0,
      cities:[],
      districts:[]
    }
  }
  render(){
    return (
      <Modal
        title="添加客户"
        visible={true}
        maskClosable={false}
        onCancel={this.props.onCancel}
        footer={null}
      >
        {this.renderForm()}
      </Modal>
    )
  }

  renderForm(){
    const options = [
      { label: '幼儿园', value: 'isNurserySchool' },
      { label: '小学', value: 'isGradeSchool' },
      { label: '初中', value: 'isMiddleSchool' },
      { label: '高中', value: 'isHighSchool' },
    ]
    const { getFieldDecorator } = this.props.form
    const itemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    }
    const tailFormItemLayout = {
      wrapperCol: {
        span: 6,
        offset: 17,
      },
    }
    let title={color:'#108ee9',fontSize:'15px'};
    const _this=this;
    return (
      <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
        <Row style={{marginBottom:15}} >
          <Col span={24}>
            <span style={title}>基本信息</span>
          </Col>
        </Row>
            <FormItem
              {...itemLayout}
              label="客户名"
              hasFeedback
            >
              {getFieldDecorator('schoolName', {
                rules: [{
                  required: true, message: '请填写客户名！',
                }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...itemLayout}
              label="客户简称"
              hasFeedback
            >
              {getFieldDecorator('schoolShortName')(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...itemLayout}
              label="成立日期"
            >
              {getFieldDecorator('schoolEstablishment')(
                <DatePicker style={{ width: '100%' }}/>
              )}
            </FormItem>
            <FormItem
              {...itemLayout}
              label="客户类型"
              hasFeedback
            >
              {getFieldDecorator('schoolType', {
                rules: [{
                  required: true, message: '请选择客户类型！',
                }],
              })(
                <Select style={{ width: '100%' }}>
                  {_.map(schoolTypeList, ({text,key}) =>
                    <Option key={key}>{text}</Option>
                  )}
                </Select>
              )}
            </FormItem>
            <FormItem
              {...itemLayout}
              label="学段"
              hasFeedback
            >
              {getFieldDecorator('stage', {
                initialValue: ['isMiddleSchool'],
                rules: [{
                  required: true, message: '请选择学段！',
                }],
              })(
                <CheckboxGroup options={options} />
              )}
            </FormItem>
        <Row style={{marginBottom:15,marginTop:15}} >
          <Col span={24}>
            <span style={title}>联系信息</span>
          </Col>
        </Row>
            <FormItem
              label="客户地址"
              {...itemLayout}
              hasFeedback
            >
              <Col span="8">
                <FormItem hasFeedback>
                  {getFieldDecorator('provinceId', {
                    rules: [{
                      required: true, message: '请选择省份！',
                    }],
                    onChange:(value)=>{
                      _this.getCities(value);
                      this.props.form.setFieldsValue({cityId:''})
                      this.props.form.setFieldsValue({districtId:''})
                    }
                  })(
                    <Select placeholder="省" >
                      <Option key="null" value="">
                        <span style={{color: '#ccc'}}>不限</span>
                      </Option>
                      {this.props.provinces.map(item => <Option key={item.provinceID}>{item.provinceName}</Option>)}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem hasFeedback>
                  {getFieldDecorator('cityId', {
                    rules: [{
                      required: true, message: '请选择市！',
                    }],
                    onChange:(value)=>{
                      _this.getDistricts(value);
                      this.props.form.setFieldsValue({districtId:''})
                    }
                  })(
                    <Select placeholder="市" >
                      <Option key="null" value="">
                        <span style={{color: '#ccc'}}>不限</span>
                      </Option>
                      {this.state.cities.map(item => <Option key={item.cityID}>{item.cityName}</Option>)}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem hasFeedback>
                  {getFieldDecorator('districtId', {
                    rules: [{
                      required: true, message: '请选择区/县！',
                    }],
                  })(
                    <Select placeholder="区/县" >
                      <Option key="null" value="">
                        <span style={{color: '#ccc'}}>不限</span>
                      </Option>
                      {this.state.districts.map(item => <Option key={item.districtID}>{item.districtName}</Option>)}
                    </Select>
                  )}
                </FormItem>
              </Col>
            </FormItem>
            <FormItem
              {...itemLayout}
              label="详细地址"
              hasFeedback
            >
              {getFieldDecorator('schoolAddress')(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...itemLayout}
              label="邮编"
              hasFeedback
            >
              {getFieldDecorator('schoolZipcode')(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...itemLayout}
              label="官方网站"
              hasFeedback
            >
              {getFieldDecorator('schoolSite')(
                <Input />
              )}
            </FormItem>
        <Row style={{marginBottom:15,marginTop:15}} >
          <Col span={24} style={title}>
            <span >备注</span>
          </Col>
        </Row>
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

  getCities(provinceId){
    const _this=this;
    fetch('/api/area/city','get', {id:provinceId},function(err, data){
      _this.setState({
        cities: data.data,
      })
    })
  }

  getDistricts(cityId){
    const _this=this;
    fetch('/api/area/district','get', {id:cityId},function(err, data){
      _this.setState({
        districts: data.data,
      })
    })
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let schoolEstablishment=values['schoolEstablishment'].format('YYYY-MM-DD')
        let stage=values['stage'];
        if(_.indexOf(stage,'isNurserySchool')>-1){
          _.extend(values,{isNurserySchool:true});
        }
        if(_.indexOf(stage,'isGradeSchool')>-1){
          _.extend(values,{isGradeSchool:true});
        }
        if(_.indexOf(stage,'isMiddleSchool')>-1){
          _.extend(values,{isMiddleSchool:true});
        }
        if(_.indexOf(stage,'isHighSchool')>-1){
          _.extend(values,{isHighSchool:true});
        }
        _.extend(values,{schoolEstablishment});
        this.props.onOk(values);
      }
    });
  }
}

export default Form.create()(AddSchoolModal)
