import './AllLog.less'
import _ from 'underscore'
import React from 'react'
import {connect} from 'react-redux'
import {Button, Table, Modal, DatePicker, Input,Tooltip,Radio,Icon,Select} from 'antd'
import LabelCard from 'cpn/LabelCard'
import moment from 'moment'
import {setFilter,clear,getData} from 'act/alllog'
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const { RangePicker } = DatePicker
const Option = Select.Option

class AllLog extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      pickerValue:[],
      radioValue:'today',
      index:-1,
      mediaKey:""
    }
  }

  render() {
    return <div className="xk-page-alllog">
      {this.renderFilter()}
      {this.renderTable()}
      {this.renderModal()}
    </div>
  }

  renderModal(){
    if(this.state.index>-1){
      let src="/api/marketing/media/download?key="+this.state.mediaKey+"&format=wav"
      return (
        <Modal
          visible={true}
          title="通话录音"
          onCancel={this.handleCancel.bind(this)}
          footer={[
            <Button type="primary" size="large" onClick={this.handleCancel.bind(this)}>关闭</Button>
          ]}
        >
          <audio controls="controls" autoPlay="autoPlay">
            <source src={src} type="audio/wav" />
          </audio>
        </Modal>
      )
    }else{
      return null;
    }
  }

  renderFilter(){
    const {dispatch} = this.props;
    return (
      <LabelCard inline label="高级筛选">
        <label>
          时&emsp;间：
          <RadioGroup onChange={this.radioChange.bind(this)} value={this.state.radioValue}>
            <RadioButton value="today">今天</RadioButton>
            <RadioButton value="month">一月</RadioButton>
            <RadioButton value="months">三月</RadioButton>
            <RadioButton value="year">一年</RadioButton>
          </RadioGroup>
          <RangePicker 
            value={this.state.pickerValue}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder={['开始时间', '结束时间']}
            onChange={this.rangeChange.bind(this)}
          />
        </label>
        
        <br/>
        <div className="search-div">
        <label>
          关键字：
          <Select defaultValue="customerName" className="select-style" onChange={this.selectChange.bind(this)}>
            <Option value="customerName">客户姓名</Option>
            <Option value="workerName">业务人员姓名</Option>
            <Option value="contactsName">联系人姓名</Option>
            <Option value="contactsPhone">联系电话</Option>
          </Select>
          <Input className="input-style" 
            onChange={(evt)=>dispatch(setFilter({value:evt.target.value}))}
            onPressEnter={() => dispatch(getData())}/>
        </label>
        &emsp;
        <Button onClick={()=>dispatch(getData())} type="primary">筛选</Button>
        </div>
      </LabelCard>
    )
  }

  renderTable(){
    let columns = [{
      title: '客户ID',
      dataIndex: 'customerId',
    }, {
      title: '客户名称',
      dataIndex: 'customerName',
    }, {
      title: '业务员',
      dataIndex: 'workerName'
    }, {
      title: '联系人',
      dataIndex: 'contactsName',
    }, {
      title: '联系电话',
      dataIndex: 'contactsPhone',
    }, {
      title: '联系人职务',
      dataIndex: 'contactsTitle',
    }, {
      title: '通话状态',
      dataIndex: 'connected',
      render:(text) => text?'已接通':'未接通'
    }, {
      title: '通话时长',
      dataIndex: 'duration',
    }, {
      title: '联系时间',
      dataIndex: 'beginTime',
    }, {
      title: '操作',
      render:(text, record, index)=>{
        return record.connected?<Button onClick={()=>{this.setState({index:index,mediaKey:record.mediaKey})}}>播放</Button>:''
        //return this.state.index==index?<Icon type="pause-circle" />:<Icon type="play-circle" onClick={()=>{this.setState({index:index})}}/>
      }
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

  rangeChange(dates, dateStrings){
    const {dispatch} = this.props;
    this.setState({pickerValue:dates});
    this.setState({radioValue:'other'});
    dispatch(setFilter({beginTime:dateStrings[0]}));
    dispatch(setFilter({endTime:dateStrings[1]}));
  }

  handleTableChange(pagination){
    this.props.dispatch(getData(pagination))
  }
  radioChange(e) {
    let value=e.target.value;
    if(value=='other'){
      return;
    }
    const {dispatch} = this.props;
    let now=moment();
    let beginTime=moment().format('YYYY-MM-DD')+' 00:00:00';
    let endTime=moment().format('YYYY-MM-DD HH:mm:ss');  
    this.setState({radioValue:value});
    switch(value){
      case 'today':
        break;
      case 'month':
        beginTime=now.add(-1,'month').format('YYYY-MM-DD')+' 00:00:00';
        break;
      case 'months':
        beginTime=now.add(-3,'month').format('YYYY-MM-DD')+' 00:00:00';
        break;
      case 'year':
        beginTime=now.add(-1,'year').format('YYYY-MM-DD')+' 00:00:00';
        break;
      default:
        break;
    }
    dispatch(setFilter({beginTime}));
    dispatch(setFilter({endTime}));
    this.setState({pickerValue:[]});
  }

  selectChange(value){
    this.props.dispatch(setFilter({key:value}));
  }

  handleCancel(){
    this.setState({index:-1});
  }

  componentDidMount() {
    const {dispatch} = this.props
    dispatch(clear())
    dispatch(getData())
  }
}


export default connect(function(state) {
  return state.alllog
})(AllLog);