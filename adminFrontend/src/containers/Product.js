// import './Main.less'
// import React from 'react'
// import { connect } from 'react-redux'
// import Editor from 'cpn/Editor'

/*eslint no-console:0 */
require('./Worksheet.less')
import _ from 'underscore'
import React from 'react'
import { connect } from 'react-redux'
import { Button, Input, Tooltip, Table, Radio, Modal, Spin, Icon } from 'antd'
import LabelCard from 'cpn/LabelCard'
import ChooseTagModal from 'cpn/ChooseTagModal'
import EditProductModal from 'cpn/EditProductModal'
import {productType,productStatus} from 'data/status'
import {getData,setFilter,clear,pauseProductSell,resumeProductSell,
        selectedlist,resetSelected,fetchTagGroupsInUse, fetchDetail, save, clearDetail} from 'act/product'
import {getData as fetchChannels} from 'act/channel'
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import {getAllTag, setTagGroupUsage} from 'act/customertag'

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

class Product extends React.Component{
  state={
      selectedRowKeys: [],
      selectedRowKeys_mine: [],
      showChooseTagModal:false,
      showAddModal: false,
      showEditModal: false
  }

  render(){
    return (
      <div className="xk-page-worksheet">
        {this.renderFilterBar()}
        <div style={{marginTop: '16px'}}>
          <Button onClick={()=>this.setState({showChooseTagModal: true})}>
            销售对象选项设置
          </Button>
          <Button type="primary" style={{float: 'right'}} onClick={()=>this.setState({showAddModal: true})}>
            <Icon type='plus'/> 添加产品
          </Button>
        </div>
        {this.renderTable()}
        {this.renderChooseTagModal()}
        {this.renderAddModal()}
        {this.renderEditModal()}
      </div>
    )
  }

  renderFilterBar(){
    const {dispatch,filter} = this.props
    const getProps = (field, searchNow) => {
      return {
      value: filter[field],
      onChange: val => {
        dispatch(setFilter(field, _.isString(val) ? val : val.target.value))
        searchNow && this.handleSearchProduct()
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
            产品类型：
            <RadioGroup className='nomarginr' value={filter.productType?filter.productType:""} onChange={this.handleChangeProType.bind(this)}>
              {emptyOption}
              {_.map(productType, (label, key) => <RadioButton value={key} key={key}>{label}</RadioButton>)}
            </RadioGroup>
          </label>

          <label>
            产品状态：
            <RadioGroup className='nomarginr' value={filter.status?filter.status:""} onChange={this.handleChangeProStatus.bind(this)}>
              {emptyOption}
              {_.map(productStatus, (label, key) => <RadioButton value={key} key={key}>{label}</RadioButton>)}
            </RadioGroup>
          </label>

          <label>
            关键字：
            <Tooltip title="请输入产品ID\产品名称">
              <Input ref="t" placeholder="请输入产品ID\产品名称" style={{width:'200px'}} {...getProps('query')} onPressEnter={this.handleSearchProduct.bind(this)} />
            </Tooltip>
          </label>

          <Button type="primary" onClick={this.handleSearchProduct.bind(this)}>搜索</Button>
        </div>
      </LabelCard>
    </div>
    )
  }

  renderTable(){
    const {dispatch,list,pagination,loading} = this.props

    const columns = [{
      title: '产品ID',
      dataIndex: 'col1',
      width: '5%',
      render(text, rec){
        return rec.productId
      }
    },{
      title: '产品名称',
      dataIndex: 'col2',
      width: '20%',
      render(text, rec){
        return rec.productName
      }
    },{
      title: '产品类型',
      dataIndex: 'col3',
      width: '15%',
      render(text, rec){
        return productType[rec.productType]?productType[rec.productType]:rec.productType
      }
    },{
      title: '产品状态',
      dataIndex: 'col4',
      width: '15%',
      render(text, rec){
        return productStatus[rec.status]?productStatus[rec.status]:rec.status
      }
    },{
      title: '添加时间',
      dataIndex: 'col8',
      width: '30%',
      render(text, rec){
        return rec.addTime
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
        dataSource={list}
        pagination={{
          current: pagination.current,
          total: pagination.total,
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30', '40'],
          showQuickJumper: true
        }}
        loading={loading}
        onChange={this.handleTableChange.bind(this)}
      />
    );
  }

  refresh(){
    this.setState({
        selectedRowKeys: [],
        selectedRowKeys_mine: []
    });
  }

  handleTableChange(pagination){
    const {dispatch} = this.props
    dispatch(getData(pagination))
  }

  renderOptCol(text, rec){
    const {dispatch,pagination} = this.props

    const editBtn = <Tooltip title="编辑">
      <Button size="small"
        onClick={()=>{
          this.setState({showEditModal: true})
          dispatch(fetchDetail(rec.productId))
        }}
        >
        <Icon type="edit"/>
      </Button>
    </Tooltip>

    const pauseBtn = <Tooltip title={rec.status==1?"暂停":"恢复"}>
      <Button size="small"
        onClick={()=>{
          if(rec.status==1){
            dispatch(pauseProductSell({productId:rec.productId},pagination))
          }
          if(rec.status==3){
            dispatch(resumeProductSell({productId:rec.productId},pagination))
          }
        }}
        >
        <Icon type={rec.status==1?"pause-circle":"play-circle"}/>
      </Button>
    </Tooltip>

    return (
      <span>
        {rec.status!=0?editBtn:""}&nbsp;&nbsp;{rec.status==1||rec.status==3?pauseBtn:""}
      </span>
    )
  }

  //产品类型
  handleChangeProType(event){
    const {dispatch} = this.props;
    let v=event.target.value;
    dispatch(setFilter("productType",v))
    dispatch(getData());
  }

  //产品状态
  handleChangeProStatus(event){
    const {dispatch} = this.props;
    let v=event.target.value;
    dispatch(setFilter("status",v))
    dispatch(getData());
  }

  handleSearchProduct(){
    const {dispatch} = this.props
    dispatch(getData())
  }

  renderChooseTagModal(){
    if(!this.state.showChooseTagModal) return null
    const {dispatch, allTagGroups, tagGroupInUse, savingTagUesage} = this.props
    const close = ()=>this.setState({showChooseTagModal: false})
    return React.createElement(ChooseTagModal, {
      title: '设置销售对象选项',
      allTagGroups,
      tagGroupInUse,
      saving: savingTagUesage,
      onCancel: close,
      onOk: ids => dispatch(setTagGroupUsage(2, ids, err => {
        if(!err){
          close()
          dispatch(fetchTagGroupsInUse())
        }
      }))
    })
  }

  renderAddModal(){
    const {dispatch, tagGroupInUse,channelList} = this.props
    if(!this.state.showAddModal) return null
    return React.createElement(EditProductModal, {
      tagGroupInUse,
      channelList,
      onOk: (data)=>{
        dispatch(save(data, (err)=>!err && this.closeEditModal()))
      },
      onCancel: this.closeEditModal.bind(this)
    })
  }

  renderEditModal(){
    const {dispatch, tagGroupInUse, detail, channelList} = this.props
    if(!this.state.showEditModal) return null
    if(!detail) return this.renderLoadingModal()
    return React.createElement(EditProductModal, {
      tagGroupInUse,
      channelList,
      data: detail,
      onOk: (data)=>{
        dispatch(save(data, (err)=>!err && this.closeEditModal()))
      },
      onCancel: this.closeEditModal.bind(this)
    })
  }

  renderLoadingModal(){
    return <Modal visible={true} title="loading" footer={false}>
      <Spin><div style={{height: '200px'}}/></Spin>
    </Modal>
  }

  closeEditModal(){
    this.setState({
      showEditModal: false,
      showAddModal: false
    })
    this.props.dispatch(clearDetail())
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
    dispatch(getAllTag('channelTarget'))
    dispatch(fetchTagGroupsInUse())
    dispatch(fetchChannels())
  }
}

export default connect(function mapStateToProps(state) {
  return _.extend({}, state.product, {
    allTagGroups: state.customertag.allTagGroups,
    savingTagUesage: state.customertag.savingTagUesage,
    channelList: state.channel.list,
  })
})(Product);
