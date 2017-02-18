import React from 'react'
import _ from 'underscore'
import {Button, Form, Input, Select,Row, Col, Modal, message, DatePicker, Checkbox, Table} from 'antd'
import {schoolTypeList} from 'data/schoolType'
import fetch from 'utils/fetch'
import moment from 'moment'
import AddContactModal from 'cpn/AddContactModal'

const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
const dateFormat = 'YYYY-MM-DD'
const Option = Select.Option

class EditDoneModal extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      provinceId:0,
      cityId:0,
      cities:[],
      districts:[],
      links:[],
      linkModalShow:false
    }
  }
  render(){
    return (
      <Modal
        title="编辑客户"
        visible={true}
        maskClosable={false}
        onCancel={this.props.onCancel}
        footer={null}
      >
        {this.renderForm()}
        {this.renderAddContactModal()}
      </Modal>
    )
  }

  renderAddContactModal(){
    let editting={};
    let info=this.props.info;
    if(this.state.linkModalShow){
      return (
        <AddContactModal
                editting={editting}
                onSubmit={data => {
                  this.setState({linkModalShow:false});
                  this.props.addContact(_.extend({schoolId:info.schoolId}, data));
                  this.getLinks(info.schoolId);
                }}
                onCancel={()=>this.setState({linkModalShow:false})}
              />
      )
    }else{
      return null;
    }
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
    let info=this.props.info;
    let stageArr=[];
    if(info.isNurserySchool){
      stageArr.push('isNurserySchool');
    }
    if(info.isGradeSchool){
      stageArr.push('isGradeSchool');
    }
    if(info.isMiddleSchool){
      stageArr.push('isMiddleSchool');
    }
    if(info.isHighSchool){
      stageArr.push('isHighSchool');
    }
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
                initialValue: info.schoolName,
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
              {getFieldDecorator('schoolShortName',{
                initialValue: info.schoolShortName,
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...itemLayout}
              label="成立日期"
            >
              {getFieldDecorator('schoolEstablishment',{
                initialValue: moment(info.schoolEstablishment),
              })(
                <DatePicker style={{ width: '100%' }} />
              )}
            </FormItem>
            <FormItem
              {...itemLayout}
              label="客户类型"
              hasFeedback
            >
              {getFieldDecorator('schoolType', {
                initialValue: info.schoolType+'',
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
                initialValue: stageArr,
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
                    initialValue: info.provinceID+'',
                    rules: [{
                      required: true, message: '请选择省份！',
                    }],
                    onChange:(value)=>{
                      _this.getCities(value);
                      this.props.form.setFieldsValue({cityId:''})
                      this.props.form.setFieldsValue({districtId:''})
                      this.props.form.setFieldsValue({edit:'edit'})
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
                    initialValue: info.cityID+'',
                    rules: [{
                      required: true, message: '请选择市！',
                    }],
                    onChange:(value)=>{
                      _this.getDistricts(value);
                      this.props.form.setFieldsValue({districtId:''})
                      this.props.form.setFieldsValue({edit:'edit'})
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
                    initialValue: info.districtID+'',
                    rules: [{
                      required: true, message: '请选择区/县！',
                    }],
                    onChange:(value)=>{
                      this.props.form.setFieldsValue({edit:'edit'})
                    }
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
              {getFieldDecorator('schoolAddress',{
                initialValue: info.schoolAddress,
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...itemLayout}
              label="邮编"
              hasFeedback
            >
              {getFieldDecorator('schoolZipcode',{
                initialValue: info.schoolZipCode,
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...itemLayout}
              label="官方网站"
              hasFeedback
            >
              {getFieldDecorator('schoolSite',{
                initialValue: info.schoolSite,
              })(
                <Input />
              )}
            </FormItem>
        <Row style={{marginBottom:10,marginTop:15}} >
          <Col span={20}>
            <span style={title}>联系人信息</span>
          </Col>
          <Col span={4}>
            <Button onClick={()=>this.setState({linkModalShow:true})}>添加联系人</Button>
          </Col>
        </Row>
        {this.renderTable()}
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
              {getFieldDecorator('surveyInfo',{
                initialValue: info.surveyInfo,
              })(
                <Input type="textarea" rows={4}/>
              )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" size="large">提交</Button>
            </FormItem>
      </Form>
    )
  }

  renderTable(){
    let columns = [{
      title: '姓名',
      dataIndex: 'customer',
    }, {
      title: '职务',
      dataIndex: 'customerJob',
    }, {
      title: '电话',
      dataIndex: 'linkPhone',
    }, {
      title: '手机',
      dataIndex: 'linkMobile'
    }, {
      title: '邮箱',
      dataIndex: 'linkEmail'
    },{
      title: 'QQ',
      dataIndex: 'linkQQ',
    }];
    return (
      <Table columns={columns}
        rowKey='key'
        dataSource={this.state.links}
        pagination={false}
      />
    );
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

  getLinks(id){
    const _this=this;
    fetch('/api/school/query-customers','post', {schoolId:id},function(err, data){
      _this.setState({
        links: data.data,
      })
    })
  }

  handleSubmit(e){
    e.preventDefault();
    let info=this.props.info;
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
        _.extend(values,{schoolEstablishment,id:info.schoolId});
        this.props.onOk(values);
      }
    });
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.form.getFieldValue('edit')!='edit'){
      let info=nextProps.info;
      this.getCities(info.provinceID);
      this.getDistricts(info.cityID);
      this.getLinks(info.schoolId);
    }
  }
}

export default Form.create()(EditDoneModal)
