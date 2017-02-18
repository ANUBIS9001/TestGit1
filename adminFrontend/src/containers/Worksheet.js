/*eslint no-console:0 */
require('./Worksheet.less')
import _ from 'underscore'
import React from 'react'
import { connect } from 'react-redux'
import {Modal, Button, Input, Tooltip, Table, Radio ,DatePicker } from 'antd'
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import LabelCard from 'cpn/LabelCard'
import Icon from 'cpn/Icon'
import {handleStatus,categoryStatus} from '../data/status'
import {getData,setFilter,clear,sendDelSheet,
        selectedlist,resetSelected,selectedlist_mine,resetSelected_mine,
        resetFilter_mine,setFilter_mine,getData_mine,clear_mine,setFilter_handle,sheetHandle,resetFilter_handle,
        cleardetail,getSheetDetail,getSheetOrderLog,showSheetDetail,closeSheetDetail} from '../actions/worksheet'
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker
import SheetDetailModal from '../components/SheetDetailModal'
import moment from 'moment'

Date.prototype.format = function(fmt) {
     var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
     for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
     }
    return fmt;
}

class Worksheet extends React.Component{
  render(){
    return (
      <div className="xk-page-worksheet">
        <Tabs defaultActiveKey="1">
          <TabPane tab="全部" key="1">
            {this.renderFilterBar()}
            {this.renderTable()}
          </TabPane>
          <TabPane tab="我的工单" key="3">
            {this.renderFilterBar1()}
            {this.renderTable1()}
          </TabPane>
        </Tabs>

        {this.renderEidtModal()}
      </div>
    )
  }

  renderFilterBar(){
    const {dispatch, worksheet} = this.props
    const getProps = (field, searchNow) => {
      return {
      value: worksheet.filter[field],
      onChange: val => {
        dispatch(setFilter(field, _.isString(val) ? val : val.target.value))
        searchNow && this.handleSearchWorkSheet()
      }
    }}
    const emptyOption = (
      <RadioButton value="">不限</RadioButton>
    )
    return (
      <div>
      <LabelCard inline className="searchbar" label="筛选条件">
        <div className="filters-ctn">
          <label>
            按状态：
            <RadioGroup className='nomarginr' value={worksheet.filter.status?worksheet.filter.status:""} onChange={this.handleChangeStatusAll.bind(this)}>
              {emptyOption}
              {_.map(handleStatus, (label, key) => <RadioButton value={key} key={key}>{label}</RadioButton>)}
            </RadioGroup>
          </label>

          <label>
            按类别：
            <RadioGroup className='nomarginr' value={worksheet.filter.classification?worksheet.filter.classification:""} onChange={this.handleChangeClassAll.bind(this)}>
              {emptyOption}
              {_.map(categoryStatus, (label, key) => <RadioButton value={key} key={key}>{label}</RadioButton>)}
            </RadioGroup>
          </label>

          <label>
            关键字：
            <Tooltip title="请输入要搜索的工单ID/名称">
              <Input ref="t" placeholder="请输入要搜索的工单ID/名称" style={{width:'200px'}} {...getProps('query')} onPressEnter={this.handleSearchWorkSheet.bind(this)} />
            </Tooltip>
          </label>

          <Button type="primary" onClick={this.handleSearchWorkSheet.bind(this)}>搜索</Button>
        </div>
      </LabelCard>
      <br/>
      <Button type="primary" onClick={()=>this.multiDel()}>
        <Icon type='trash'/> 批量删除工单
      </Button>
    </div>
    )
  }

  renderTable(){
    const {worksheet,dispatch} = this.props

    const columns = [{
      title: '工单ID',
      dataIndex: 'col1',
      width: '5%',
      render(text, rec){
        return rec.id
      }
    },{
      title: '工单名称',
      dataIndex: 'col2',
      width: '10%',
      render(text, rec){
        return rec.name
      }
    },{
      title: '发起人',
      dataIndex: 'col3',
      width: '10%',
      render(text, rec){
        return rec.creator
      }
    },{
      title: '处理人',
      dataIndex: 'col4',
      width: '10%',
      render(text, rec){
        return rec.handler
      }
    },{
      title: '抄送人',
      dataIndex: 'col5',
      width: '10%',
      render(text, rec){
        return rec.other
      }
    },{
      title: '描述',
      dataIndex: 'col6',
      width: '20%',
      render(text, rec){
        return rec.description
      }
    },{
      title: '状态',
      width: '5%',
      render(text, rec){
        return handleStatus[rec.status]?handleStatus[rec.status]:rec.status
      }
    },{
      title: '类别',
      dataIndex: 'col7',
      width: '10%',
      render(text, rec){
        return rec.classification
      }
    },{
      title: '添加时间',
      dataIndex: 'col8',
      width: '10%',
      render(text, rec){
        return rec.createTime
      }
    },{
      title: '操作',
      width: '10%',
      render: this.renderOptCol.bind(this)
    }
    ];

    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys:selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        const ids = _.pluck(selectedRows, 'id')
        dispatch(resetSelected())
        dispatch(selectedlist("id",ids))
        this.setState({ selectedRowKeys:selectedRowKeys });
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
        const ids = _.pluck(selectedRows, 'id')
        dispatch(resetSelected())
        dispatch(selectedlist("id",ids))
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
        const ids = _.pluck(selectedRows, 'id')
        dispatch(resetSelected())
        dispatch(selectedlist("id",ids))
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',
      }),
    };
    return (
      <Table columns={columns}
        rowKey='col1'
        rowSelection={rowSelection}
        dataSource={worksheet.list}
        pagination={{
          current: worksheet.pagination.current,
          total: worksheet.pagination.total,
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30', '40'],
          showQuickJumper: true
        }}
        loading={worksheet.loading}
        // onChange={this.handleTableChange.bind(this)}
      />
    );
  }

  state={
      selectedRowKeys: [],
      selectedRowKeys_mine: []
  }

  refresh(){
    this.setState({
        selectedRowKeys: [],
        selectedRowKeys_mine: []
    });
  }

  renderTable1(){
    const {myworksheet,dispatch} = this.props

    const columns = [{
      title: '工单ID',
      dataIndex: 'col1',
      width: '5%',
      render(text, rec){
        return rec.id
      }
    },{
      title: '工单名称',
      dataIndex: 'col2',
      width: '10%',
      render(text, rec){
        return rec.name
      }
    },{
      title: '发起人',
      dataIndex: 'col3',
      width: '10%',
      render(text, rec){
        return rec.creator
      }
    },{
      title: '处理人',
      dataIndex: 'col4',
      width: '10%',
      render(text, rec){
        return rec.handler
      }
    },{
      title: '抄送人',
      dataIndex: 'col5',
      width: '10%',
      render(text, rec){
        return rec.other
      }
    },{
      title: '描述',
      dataIndex: 'col6',
      width: '20%',
      render(text, rec){
        return rec.description
      }
    },{
      title: '状态',
      width: '5%',
      render(text, rec){
        return handleStatus[rec.status]?handleStatus[rec.status]:rec.status
      }
    },{
      title: '类别',
      dataIndex: 'col7',
      width: '10%',
      render(text, rec){
        return rec.classification
      }
    },{
      title: '添加时间',
      dataIndex: 'col8',
      width: '10%',
      render(text, rec){
        return rec.createTime
      }
    },{
      title: '操作',
      width: '10%',
      render: this.renderOptCol.bind(this)
    }
    ];

    const { selectedRowKeys_mine } = this.state;
    const rowSelection = {
      selectedRowKeys: selectedRowKeys_mine,
      onChange: (selectedRowKeys_mine, selectedRows) => {
        const ids = _.pluck(selectedRows, 'id')
        dispatch(resetSelected_mine())
        dispatch(selectedlist_mine("id",ids))
        this.setState({ selectedRowKeys_mine:selectedRowKeys_mine })
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
        const ids = _.pluck(selectedRows, 'id')
        dispatch(resetSelected_mine())
        dispatch(selectedlist_mine("id",ids))
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
        const ids = _.pluck(selectedRows, 'id')
        dispatch(resetSelected_mine())
        dispatch(selectedlist_mine("id",ids))
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',
      }),
    };

    return (
      <Table columns={columns}
        rowKey='key'
        rowSelection={rowSelection}
        dataSource={myworksheet.list}
        pagination={{
          current: myworksheet.pagination.current,
          total: myworksheet.pagination.total,
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30', '40'],
          showQuickJumper: true
        }}
        loading={myworksheet.loading}
        // onChange={this.handleTableChange.bind(this)}
      />
    );
  }

  renderEidtModal(){
    const {dispatch,displayingDetail,workDetail,workOrderLog,handleFilter} = this.props
    if(displayingDetail){
      return  <SheetDetailModal
                onCancel = {()=>dispatch(closeSheetDetail())}
                workDetail= {workDetail}
                workOrderLog= {workOrderLog}
                setFilter_handle={(field,value)=>dispatch(setFilter_handle(field,value))}
                sheetHandle={()=>dispatch(sheetHandle())}
                handleFilter={handleFilter}
              />
    }
  }

  renderOptCol(text, rec){
    const {dispatch} = this.props

    const contactBtn = <Tooltip title={rec.status==0?"编辑":"查看"}>
      <Button size="small"
        onClick={()=>{
          //初始化要提交的结果
          dispatch(resetFilter_handle())
          dispatch(setFilter_handle('orderId',rec.id))
          dispatch(setFilter_handle('status',"2"))

          dispatch(cleardetail())
          dispatch(getSheetDetail({id:rec.id}))
          dispatch(getSheetOrderLog({orderId:rec.id}))
          dispatch(showSheetDetail())}
        }
        >
        <Icon type={rec.status==0?"pencilsquareo":"iconfontjilufuzhi"}/>
      </Button>
    </Tooltip>

    const delBtn = <Tooltip title="删除">
      <Button size="small"
        onClick={()=>this.del(rec)}
        >
        <Icon type="trasho"/>
      </Button>
    </Tooltip>

    return (
      <span>
        {contactBtn}&nbsp;{delBtn}
      </span>
    )
  }

  //删除工单
  del(rec){
    const {dispatch,worksheet,myworksheet} = this.props
    Modal.confirm({
      title: '确认删除',
      content: <div>
        确定要删除标签工单ID为 <b>{rec.id}</b> 的工单吗？
      </div>,
      onOk:()=>dispatch(sendDelSheet({id:rec.id},worksheet.pagination,myworksheet.pagination))
    })
  }

  //所有工单的批量删除
  multiDel(){
    const {dispatch,worksheet,myworksheet} = this.props
    Modal.confirm({
      title: '确认删除',
      content: <div>
        确定要删除这些工单吗？
      </div>,
      onOk:()=>{
        dispatch(sendDelSheet({id:worksheet.selected.id},worksheet.pagination,myworksheet.pagination))
        this.refresh()
      }
    })
  }

  //我的工单的批量删除
  multiDel_mine(){
    const {dispatch,worksheet,myworksheet} = this.props
    Modal.confirm({
      title: '确认删除',
      content: <div>
        确定要删除这些工单吗？
      </div>,
      onOk:()=>{
        dispatch(sendDelSheet({id:myworksheet.selected.id},worksheet.pagination,myworksheet.pagination))
        this.refresh()
      }
    })
  }

  renderFilterBar1(){
    const {dispatch, myworksheet} = this.props
    const getProps = (field, searchNow) => {
      return {
      value: myworksheet.filter[field],
      onChange: val => {
        dispatch(setFilter_mine(field, _.isString(val) ? val : val.target.value))
        searchNow && this.handleSearchWorkSheet1()
      }
    }}
    const emptyOption = (
      <RadioButton value="">不限</RadioButton>
    )
    return (
      <div>
        <RadioGroup value={myworksheet.filter.handle?myworksheet.filter.handle:"1"} onChange={this.handleChangeHandle.bind(this)}>
          <RadioButton value="1">由我处理</RadioButton>
          <RadioButton value="2">待我处理</RadioButton>
          <RadioButton value="3">我已处理</RadioButton>
          <RadioButton value="4">由我发起</RadioButton>
          <RadioButton value="5">抄送我的</RadioButton>
        </RadioGroup>
        <br/>
        <br/>
      <LabelCard inline className="searchbar" label="筛选条件">
          <div className="filters-ctn">
          按时间：
          <RadioGroup className="nomarginr" value={"1"}
            onChange={this.handleChangeTime.bind(this)}
            value={myworksheet.filter.timeType?myworksheet.filter.timeType:"1"}
            >
            <RadioButton value="1">今天</RadioButton>
            <RadioButton value="2">一个月</RadioButton>
            <RadioButton value="3">三个月</RadioButton>
            <RadioButton value="4">一年</RadioButton>
          </RadioGroup>&nbsp;&nbsp;
          <span className="my-time">
            自定义时间：
            <RangePicker ref="dateRange"
              value={myworksheet.filter.beginTime&&myworksheet.filter.endTime?[moment(myworksheet.filter.beginTime, 'YYYY-MM-DD'), moment(myworksheet.filter.endTime, 'YYYY-MM-DD')]:null}
              onChange={this.handleSelectTime.bind(this)}
            />
          </span>&nbsp;&nbsp;

          <label>
            按状态：
            <RadioGroup className='nomarginr'
              value={myworksheet.filter.status?myworksheet.filter.status:""}
              onChange={this.handleChangeStatusMy.bind(this)}
              disabled={myworksheet.filter.handle==2||myworksheet.filter.handle==3?true:false}
              >
              {emptyOption}
              {_.map(handleStatus, (label, key) => <RadioButton value={key} key={key}>{label}</RadioButton>)}
            </RadioGroup>
          </label>

          <label>
            按类别：
            <RadioGroup className='nomarginr' value={myworksheet.filter.classification?myworksheet.filter.classification:""} onChange={this.handleChangeClassMy.bind(this)}>
              {emptyOption}
              {_.map(categoryStatus, (label, key) => <RadioButton value={key} key={key}>{label}</RadioButton>)}
            </RadioGroup>
          </label>

          <label>
            关键字：
            <Tooltip title="请输入要搜索的工单ID/名称">
              <Input placeholder="请输入要搜索的工单ID/名称" style={{width:'200px'}}
              {...getProps('query')}
              onPressEnter={this.handleSearchWorkSheet1.bind(this)} />
            </Tooltip>
          </label>

          {/* <Button type="ghost" onClick={this.handleCancel.bind(this)}>重置</Button>&nbsp;&nbsp; */}
          <Button type="primary" onClick={this.handleSearchWorkSheet1.bind(this)}>搜索</Button>
        </div>
      </LabelCard>
      <br/>
      <Button type="primary" onClick={()=>this.multiDel_mine()}>
        <Icon type='trash'/> 批量删除工单
      </Button>
    </div>
    )
  }

  handleCancel(event){
  }

  //所有工单按状态
  handleChangeStatusAll(event){
    const {dispatch} = this.props;
    let v=event.target.value;
    dispatch(setFilter("status",v))
    dispatch(getData());
  }

  //所有工单按类别
  handleChangeClassAll(event){
    const {dispatch} = this.props;
    let v=event.target.value;
    dispatch(setFilter("classification",v))
    dispatch(getData());
  }

  //我的工单区别处理人
  handleChangeHandle(event){
    const {dispatch} = this.props;
    let v=event.target.value;
    //只有区别处理人的操作需要清空条件（考虑增加状态的置灰处理）
    dispatch(resetFilter_mine())
    dispatch(setFilter_mine("handle",v))
    dispatch(getData_mine());
  }

  //我的工单按状态
  handleChangeStatusMy(event){
    const {dispatch} = this.props;
    let v=event.target.value;
    dispatch(setFilter_mine("status",v))
    dispatch(getData_mine());
  }

  //我的工单按类别
  handleChangeClassMy(event){
    const {dispatch} = this.props;
    let v=event.target.value;
    dispatch(setFilter_mine("classification",v))
    dispatch(getData_mine());
  }

  //选择时间范围
  handleChangeTime(event){
    const {dispatch} = this.props;
    let v=event.target.value;
    let date=new Date();
    let endTime=new Date().format("yyyy-MM-dd")+" 23:59:59";
    switch(v){
      case "1":
        break;
      case "2":
        date.setMonth(date.getMonth()-1);
        break;
      case "3":
        date.setMonth(date.getMonth()-3);
        break;
      case "4":
        date.setFullYear(date.getFullYear()-1);
        break;
      default:
        break;
    }
    let beginTime=date.format("yyyy-MM-dd")+" 00:00:00";
    dispatch(setFilter_mine("beginTime",beginTime))
    dispatch(setFilter_mine("endTime",endTime))
    dispatch(setFilter_mine("timeType",v))
    dispatch(getData_mine());
  }

  handleSelectTime(date, dateString){
    const {dispatch} = this.props;
    dispatch(setFilter_mine("beginTime",dateString[0]+" 00:00:00"))
    dispatch(setFilter_mine("endTime",dateString[1]+" 23:59:59"))
    dispatch(getData_mine());
  }

  handleSearchWorkSheet(){
    const {dispatch} = this.props
    dispatch(getData())
  }

  handleSearchWorkSheet1(){
    const {dispatch} = this.props
    dispatch(getData_mine())
  }

  componentDidMount() {
    const {dispatch,location} = this.props
    dispatch(clear())

    if(location.query.status==0){
      dispatch(setFilter("status","0"))
    }else if(location.query.status==2){
      dispatch(setFilter("status","2"))
    }

    dispatch(getData())
    dispatch(clear_mine())
    dispatch(getData_mine())
  }
}

export default connect(function (state) {
  return _.clone(state.worksheet)
})(Worksheet);
