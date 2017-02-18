import './Customer.less'
import _ from 'underscore'
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {push} from 'react-router-redux'
import {Button, Select, Input, Tooltip, Table, Form, Icon, Radio, Modal} from 'antd'
import LabelCard from 'cpn/LabelCard'
import MyIcon from 'cpn/Icon'
import {getProvinces,
  getTodoData,
  getDoneData,
  setFilter,
  resetFilter,
  clear,
  deletDoneSchool,
  deletTodoSchool,
  addSchool,
  getTodoDetailData,
  examSchool,
  getDoneDetailData,
  editDoneSchool,
  addContact
} from 'act/customer'
import AddSchoolModal from 'cpn/AddSchoolModal'
import ExamModal from 'cpn/ExamModal'
import EditDoneModal from 'cpn/EditDoneModal'
import stages from 'data/stages'
import schoolLevel from 'data/schoolLevel'
import {schoolTypeList} from 'data/schoolType'
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class Customer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      radioValue:'done',
      confirmShow:false,
      schoolId:'',
      addSchoolModalShow:false,
      examModalShow:false,
      editDoneShow:false,
    }
  }
  render(){
    return (
      <div className="xk-page-customer">
        {this.renderFilterBar()}
        {this.renderOperations()}
        {this.renderTable()}
        {this.renderConfirmModal()}
        {this.renderAddSchoolModal()}
        {this.renderExamModal()}
        {this.renderEditDoneModal()}
      </div>
    )
  }

  renderEditDoneModal(){
    const {doneDetail,provinces,dispatch} = this.props
    if(this.state.editDoneShow){
      return (
        <EditDoneModal 
          info={doneDetail} 
          onOk={(params)=>this.onEditDoneOk(params)} 
          onCancel={()=>this.setState({editDoneShow:false})} 
          provinces={provinces}
          addContact={(params)=>dispatch(addContact(params))}
           />
      )
    }else{
      return null;
    }
  }

  renderAddSchoolModal(){
    const {provinces} = this.props
    if(this.state.addSchoolModalShow){
      return (
        <AddSchoolModal 
          onOk={(params)=>this.handleAddOk(params)} 
          onCancel={()=>this.setState({addSchoolModalShow:false})}
          provinces={provinces} />
      )
    }else{
      return null;
    }
  }

  renderExamModal(){
    const {todoDetail} = this.props
    if(this.state.examModalShow){
      return (
        <ExamModal info={todoDetail} onOk={(params)=>this.onExamOk(params)} onCancel={()=>this.setState({examModalShow:false})}/>
      )
    }else{
      return null;
    }
  }

  renderConfirmModal(){
    if(this.state.confirmShow){
      return (
        <Modal
          visible={true}
          title="确认删除"
          maskClosable={false}
          onOk={this.handleConfirmOk.bind(this)}
          onCancel={this.handleConfirmCancel.bind(this)}
          footer={[
            <Button size="large" onClick={this.handleConfirmCancel.bind(this)}>取消</Button>,
            <Button type="primary" size="large" onClick={this.handleConfirmOk.bind(this)}>确定</Button>
          ]}
        >
          <span>是否确认删除该客户？</span>
        </Modal>
      )
    }else{
      return null;
    }
  }

  renderOperations(){
  	return (
  		<div style={{ marginTop: 16 }}>
		    <RadioGroup value={this.state.radioValue} onChange={this.handleRadioChange.bind(this)}>
		      <RadioButton value="done">已审核客户</RadioButton>
		      <RadioButton value="todo">待审核客户</RadioButton>
		    </RadioGroup>
		    <Button onClick={()=>this.setState({addSchoolModalShow:true})} style={{ float:'right' }}><Icon type="plus" />添加客户</Button>
		</div>
  	)
  }

  renderFilterBar(){
    const {dispatch, filter, provinces, cities, districts, products} = this.props
    const getProps = field => {return {
      value: filter[field],
      onChange: val => dispatch(setFilter(field, _.isString(val) ? val : val.target.value))
    }}
    const emptyOption = (
      <Option key="null" value="">
        <span style={{color: '#ccc'}}>不限</span>
      </Option>
    )
    return (
      <LabelCard inline className="searchbar" label="高级筛选">
        <Form className="filters-ctn">
          <label>
          　  地区：
            <Tooltip title="省/直辖市/自治区"><span>
              <Select placeholder="省" style={{width: '83px'}} {...getProps('provinceId')}>
                {emptyOption}
                {provinces.map(item => <Option key={item.provinceID}>{item.provinceName}</Option>)}
              </Select>
            </span></Tooltip>
            <Tooltip title="市/州/盟"><span>
              <Select placeholder="市" style={{width: '96px'}} {...getProps('cityId')}>
                {emptyOption}
                {cities.map(item => <Option key={item.cityID}>{item.cityName}</Option>)}
              </Select>
            </span></Tooltip>
            <Tooltip title="区/县/旗"><span>
              <Select placeholder="区/县" style={{width: '96px'}} {...getProps('districtId')}>
                {emptyOption}
                {districts.map(item => <Option key={item.districtID}>{item.districtName}</Option>)}
              </Select>
            </span></Tooltip>
          </label>
          <label>
            类型：
            <Select placeholder="客户类型" style={{width: '100px'}} {...getProps('schoolType')}>
              {emptyOption}
              {_.map(schoolTypeList, ({text,key}) =>
                <Option key={key}>{text}</Option>
              )}
            </Select>
          </label>
          <br/>
          <label>
          　  学校：
            <Tooltip title="学段"><span>
              <Select placeholder="学段" style={{width: '140px'}} {...getProps('stage')}>
                {emptyOption}
                {_.map(stages, (text,key) =>
                  <Option key={key}>{text}</Option>
                )}
              </Select>
            </span></Tooltip>
            <Tooltip title="学校等级"><span>
              <Select placeholder="学校等级" style={{width: '141px'}} {...getProps('schoolLevel')}>
                <Option key="-1" value="-1">
                  <span style={{color: '#ccc'}}>不限</span>
                </Option>
                {_.map(schoolLevel, (text,key) =>
                  <Option key={key}>{text}</Option>
                )}
              </Select>
            </span></Tooltip>
          </label>
          <br/>
          关键字：
          <Tooltip title="客户ID/客户名称">
            <Input
              placeholder="客户ID/客户名称"
              style={{width:'289px'}}
              onPressEnter={() =>{
                if(this.state.radioValue=='done'){
                  dispatch(getDoneData());
                }else{
                  dispatch(getTodoData());
                }
              }}
              {...getProps('keyword')}
            />
          </Tooltip>
          <span className="btn-group" style={{marginLeft: '158px'}}>
            <Button type="ghost" onClick={()=>dispatch(resetFilter())}>重置</Button>
            <Button type="primary" onClick={()=>{
              if(this.state.radioValue=='done'){
                dispatch(getDoneData());
              }else{
                dispatch(getTodoData());
              }
            }}>筛选</Button>
          </span>
        </Form>
      </LabelCard>
    )
  }

  renderTable(){
    let columns = [{
      title: '客户ID',
      dataIndex: this.state.radioValue=='done'?'schoolId':'id',
    }, {
      title: '客户名称',
      dataIndex: 'schoolName',
    }, {
      title: '学段',
      render:(text, record, index)=>{
        if(this.state.radioValue=='done'){
          return (record.nurserySchool?'幼儿园，':'')+(record.gradeSchool?'小学，':'')+(record.middleSchool?'初中，':'')+(record.highSchool?'高中，':'')
        }else{
          return (record.isNurserySchool?'幼儿园，':'')+(record.isGradeSchool?'小学，':'')+(record.isMiddleSchool?'初中，':'')+(record.isHighSchool?'高中，':'')
        }
      }
    }, {
      title: '添加人',
      dataIndex: 'sellerName'
    }, {
      title: '添加时间',
      dataIndex: 'addTime'
    },{
      title: '操作',
      render: this.renderOptCol.bind(this)
    }];

    const {list, pagination, loading} = this.props
    return (
      <Table columns={columns}
        rowKey='key'
        dataSource={list}
        pagination={{
          current: pagination.current,
          total: pagination.total,
          defaultPageSize: 10,
          pageSizeOptions: ['10', '20', '30', '40'],
          showQuickJumper: true
        }}
        loading={loading}
        onChange={this.handleTableChange.bind(this)}
      />
    );
  }

  renderOptCol(text, record, index){
    const {dispatch} = this.props
    if(this.state.radioValue=="done"){
      return (
        <span>
          <Tooltip title="编辑"><Button onClick={()=>{dispatch(getDoneDetailData(record.schoolId));this.setState({editDoneShow:true});}} style={{marginRight:'5px'}}><Icon type="edit" /></Button></Tooltip>
          <Tooltip title="删除"><Button onClick={()=>this.setState({schoolId:record.schoolId,confirmShow:true})}><Icon type="close-circle" /></Button></Tooltip>
        </span>
      )
    }else{
      return (
        <span>
          <Tooltip title="审核"><Button onClick={()=>{dispatch(getTodoDetailData(record.id));this.setState({examModalShow:true});}} style={{marginRight:'5px'}}><MyIcon type="shen" /></Button></Tooltip>
          <Tooltip title="删除"><Button onClick={()=>this.setState({schoolId:record.id,confirmShow:true})}><Icon type="close-circle" /></Button></Tooltip>
        </span>
      )
    }
  }


  handleTableChange(pagination){
    const {dispatch} = this.props
    if(this.state.radioValue=='done'){
      dispatch(getDoneData(pagination));
    }else{
      dispatch(getTodoData(pagination));
    }
  }

  handleRadioChange(e){
    const {dispatch} = this.props
    if(e.target.value=="done"){
      this.setState({radioValue:'done'})
      dispatch(getDoneData())
    }else{
      this.setState({radioValue:'todo'})
      dispatch(getTodoData())
    }
  }

  handleConfirmOk() {
    const {dispatch,pagination} = this.props
    let schoolId=this.state.schoolId;
    this.setState({
      confirmShow: false,
    });
    if(this.state.radioValue=='done'){
      dispatch(deletDoneSchool(schoolId));
      dispatch(getDoneData(pagination));
    }else{
      dispatch(deletTodoSchool(schoolId));
      dispatch(getTodoData(pagination));
    }
  }

  handleConfirmCancel(e) {
    this.setState({
      confirmShow: false,
    });
  }

  handleAddOk(params){
    const {dispatch} = this.props
    this.setState({addSchoolModalShow:false})
    dispatch(addSchool(params))
    if(this.state.radioValue=='todo'){
      dispatch(getTodoData());
    }
  }
  
  onExamOk(params){
    const {dispatch} = this.props
    this.setState({examModalShow:false})
    dispatch(examSchool(params))
    dispatch(getTodoData());
  }
  
  onEditDoneOk(params){
    const {dispatch} = this.props
    this.setState({editDoneShow:false})
    dispatch(editDoneSchool(params))
    dispatch(getDoneData());
  }

  componentDidMount() {
    const {dispatch,location} = this.props
    dispatch(clear())
    dispatch(getProvinces());
    let radioValue=location.query.radioValue;
    if(radioValue){
      if(radioValue=='done'){
        dispatch(getDoneData())
      }else{
        this.setState({radioValue:'todo'})
        dispatch(getTodoData())
      }
    }else{
      dispatch(getDoneData())
    }
  }
}

export default connect(function mapStateToProps(state) {
  return {
    filter: state.customer.filter,
    provinces: state.customer.provinces,
    cities: state.customer.cities,
    districts: state.customer.districts,
    list: state.customer.list,
    loading: state.customer.loading,
    pagination: state.customer.pagination,
    todoDetail: state.customer.todoDetail,
    doneDetail:state.customer.doneDetail,
  }
})(Customer)
