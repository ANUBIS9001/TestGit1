import './Main.less'
import React from 'react'
import _ from 'underscore'
import { connect } from 'react-redux'
import {Button, Table, Modal, Input,Tooltip,Icon,Select,Card,Row, Col} from 'antd'
import LabelCard from 'cpn/LabelCard'
import ChooseTagModal from 'cpn/ChooseTagModal'
import EditChannelModal from 'cpn/EditChannelModal'
import ChannelBindModal from 'cpn/ChannelBindModal'
import {getProvinces,getData,setFilter,resetFilter,fetchTagGroupsInUse,saveChannel,clear,enableChannel,disableChannel,getDetailData,clearDetailData, bindUsers, unbindUsers} from 'act/channel'
import {getAllTag, setTagGroupUsage} from 'act/customertag'
import {fetchDepts} from 'act/users'
import moment from 'moment'
const Option = Select.Option

class Channel extends React.Component{

  constructor(props){
    super(props)
    this.state = {
    	confirmShow:false,
    	channelStatus:false,
    	detailShow:false,
      showChooseTagModal:false,
      showAddModal: false,
      showEditModal: false,
      showBindModal: false,
      channelId:0
    }
  }

  render() {
    return <div>
      {this.renderFilter()}
      <div style={{marginTop: '16px',}}>
        <Button onClick={()=>this.setState({showChooseTagModal: true})}>
          可见客户选项设置
        </Button>
        <Button onClick={()=>this.setState({showAddModal: true})} type="primary" style={{ float:'right'}}>添加渠道</Button>
      </div>
      {this.renderTable()}
      {this.renderConfirmModal()}
      {this.renderDetailModal()}
      {this.renderAddModal()}
      {this.renderEditModal()}
      {this.renderBindModal()}
      {this.renderChooseTagModal()}
    </div>
  }

  renderDetailModal(){
  	if(this.state.detailShow){
  		let {detail,allTagGroups}=this.props;
  		let color=detail.status?'#00CC00':'red'
      return (
        <Modal
          visible={true}
          title="渠道详情"
          onCancel={this.handleCancel.bind(this)}
          footer={[
            <Button type="primary" size="large" onClick={this.handleCancel.bind(this)}>关闭</Button>
          ]}
        >
          <div>
          	<Row style={{marginBottom:'10px'}}>
              <Col span={3}>
                <span style={{color:'#999999'}}>渠道名称：</span>
              </Col>
              <Col span={21}>
                <span>{detail.name}</span>
              </Col>
            </Row>
            <Row style={{marginBottom:'10px'}}>
              <Col span={3}>
                <span style={{color:'#999999'}}>启用状态：</span>
              </Col>
              <Col span={21}>
                <span style={{color:color}}>{detail.status?'启用':'禁用'}</span>
              </Col>
            </Row>
          	<Row style={{marginBottom:'10px'}}>
              <Col span={3}>
                <span style={{color:'#999999'}}>可见客户：</span>
              </Col>
              <Col span={21}>
                <Card >
                	{
                		detail.tagIds &&detail.tagIds.length>0 &&
                		_.map(allTagGroups,(item)=>{
                			let obj=item.tags.find((e)=>{
                				let r=detail.tagIds.map(v=>{
                					return e.id==v;
                				})
                				return r.find((v)=>v);
                			})
                			if(obj){
                				return (
                					<Row style={{marginBottom:'10px'}}>
						              <Col span={4} style={{textAlign:'right'}}>
						                <span style={{marginRight:'10px'}}>{item.name}</span>
						              </Col>
						              <Col span={20}>
						              	{
						              		detail.tagIds.map(v=>{
						              			let tag=item.tags.find(i=>{
						              				return i.id==v;
						              			})
						              			if(tag){
						              				return <span style={{color:'#999999',marginRight:'5px'}}>{tag.name}</span>
						              			}
						              		})

						              	}
						              </Col>
						            </Row>
                				)
                			}
                		})
                	}
                	{
                		detail.areas && detail.areas.length>0 &&
                				<Row style={{marginBottom:'10px'}}>
					              <Col span={4} style={{textAlign:'right'}}>
					                <span style={{marginRight:'10px'}}>区域</span>
					              </Col>
					              <Col span={20}>
					              	{
					              		detail.areas.map(item=>{
					              			return <span style={{color:'#999999',marginRight:'5px'}}>{item.areaName}</span>
					              		})
					              	}
					              </Col>
					            </Row>
                	}
				</Card>
              </Col>
            </Row>
          </div>
        </Modal>
      )
    }else{
      return null;
    }
  }

  renderConfirmModal(){
    if(this.state.confirmShow){
    	let text=this.state.channelStatus?'禁用':'启用';
      return (
        <Modal
          visible={true}
          title={"确认"+text}
          maskClosable={false}
          onOk={this.handleConfirmOk.bind(this)}
          onCancel={this.handleConfirmCancel.bind(this)}
          footer={[
            <Button size="large" onClick={this.handleConfirmCancel.bind(this)}>取消</Button>,
            <Button type="primary" size="large" onClick={this.handleConfirmOk.bind(this)}>确定</Button>
          ]}
        >
          <span>是否确认{text}该渠道？</span>
        </Modal>
      )
    }else{
      return null;
    }
  }

  renderFilter(){
    const {dispatch, filter,provinces, cities, districts} = this.props
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
      <LabelCard inline label="筛选" style={{marginTop: '10px'}}>
      	<label>
      　  	渠道区域：
            <Tooltip title="省/直辖市/自治区"><span>
              <Select placeholder="省" style={{width: '83px',marginRight:'5px'}} {...getProps('provinceId')}>
                {emptyOption}
                {provinces.map(item => <Option key={item.provinceID}>{item.provinceName}</Option>)}
              </Select>
            </span></Tooltip>
            <Tooltip title="市/州/盟"><span>
              <Select placeholder="市" style={{width: '96px',marginRight:'5px'}} {...getProps('cityId')}>
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
        <div style={{marginTop: '10px',marginLeft: '15px'}}>
          &nbsp;关 键 字：
          <Tooltip title="渠道ID/渠道名称">
            <Input
              placeholder="渠道ID/渠道名称"
              style={{width:'289px'}}
              onPressEnter={() => dispatch(getData())}
              {...getProps('query')}
            />
          </Tooltip>
          <span style={{marginLeft: '158px'}}>
            <Button type="ghost" onClick={()=>dispatch(resetFilter())} style={{marginRight: '8px'}}>重置</Button>
            <Button type="primary" onClick={()=>{
              dispatch(getData())
            }}>筛选</Button>
          </span>
        </div>
      </LabelCard>
    )
  }

  renderTable(){
    let columns = [{
      title: '渠道ID',
      dataIndex: 'id',
      render:(text, record, index)=>{
      	return <a onClick={this.handleRowClick.bind(this,text)}>{text}</a>
      }
    }, {
      title: '渠道名称',
      dataIndex: 'name',
      render:(text, record, index)=>{
      	return <a onClick={this.handleRowClick.bind(this,record.id)}>{text}</a>
      }
    }, {
      title: '渠道状态',
      dataIndex: 'status',
      render:(text, record, index)=>{
      	return text?'启用':'禁用'
      }
    }, {
      title: '渠道添加时间',
      dataIndex: 'createTime',
      sorter:true,
      render:(text)=>{
        return text
      	// return moment(text,'x').format('YYYY-MM-DD HH:mm:ss');
      }
    }, {
      title: '操作',
      render:(text, record, index)=>{
      	let channelStatus=record.status;
      	let type=channelStatus?"minus-circle":"check-circle";
        return (
        	<div>
        	<Tooltip title="编辑">
            <Button style={{marginRight:'5px'}} onClick={()=>{
              this.props.dispatch(getDetailData(record.id))
              this.setState({showEditModal: true})
            }}><Icon type="edit" /></Button>
          </Tooltip>
        	<Tooltip title={()=>channelStatus?'禁用':'启用'}><Button style={{marginRight:'5px'}} onClick={()=>this.setState({confirmShow:true,channelStatus:channelStatus,channelId:record.id})}><Icon type={type} /></Button></Tooltip>
        	<Tooltip title="绑定"><Button onClick={()=>{
            this.setState({showBindModal: record.id})
          }}><Icon type="user" /></Button></Tooltip>
        	</div>
        )
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

  handleTableChange(pagination){
    this.props.dispatch(getData(pagination))
  }

  handleConfirmOk() {
  	const {dispatch,pagination} = this.props
  	let channelId=this.state.channelId;
  	this.setState({
      confirmShow: false,
    });
  	if(this.state.channelStatus){
  		dispatch(disableChannel(channelId));
  		dispatch(getData(pagination));
  	}else{
  		dispatch(enableChannel(channelId));
  		dispatch(getData(pagination));
  	}
  }

  handleConfirmCancel(e) {
    this.setState({
      confirmShow: false,
    });
  }

  handleCancel(e) {
    this.setState({
      detailShow: false,
    });
    this.props.dispatch(clearDetailData())
  }

  handleRowClick(id){
    this.props.dispatch(getDetailData(id))
    this.setState({
      detailShow: true,
    });
  }

  renderChooseTagModal(){
    if(!this.state.showChooseTagModal) return null
    const {dispatch, allTagGroups, tagGroupInUse, savingTagUesage} = this.props
    const close = ()=>this.setState({showChooseTagModal: false})
    return React.createElement(ChooseTagModal, {
      title: '设置渠道可见客户选项',
      allTagGroups,
      tagGroupInUse,
      saving: savingTagUesage,
      onCancel: close,
      onOk: ids => dispatch(setTagGroupUsage(1, ids, err => {
        if(!err){
          close()
          dispatch(fetchTagGroupsInUse())
        }
      }))
    })
  }

  renderAddModal(){
    if(!this.state.showAddModal) return null
    const {dispatch, tagGroupInUse} = this.props
    const close = ()=>this.setState({showAddModal: false})
    return React.createElement(EditChannelModal, {
      onCancel: close,
      onOk: (data)=>{dispatch(saveChannel(data, (err)=>{!err && close()}))},
      tagGroupInUse
    })
  }

  renderEditModal(){
    const {dispatch, tagGroupInUse, detail} = this.props
    if(!this.state.showEditModal || !detail) return null
    const close = ()=>{
      this.setState({showEditModal: false})
      dispatch(clearDetailData())
    }
    return React.createElement(EditChannelModal, {
      data: detail,
      onCancel: close,
      onOk: (data)=>{
        dispatch(saveChannel(data, (err)=>{!err && close()}))},
      tagGroupInUse
    })
  }

  renderBindModal(){
    const {showBindModal} = this.state
    const {dispatch, depts, waitBind} = this.props
    if(!showBindModal) return null
    const close = () => {this.setState({showBindModal: false})}
    return React.createElement(ChannelBindModal, {
      channelId: showBindModal,
      depts,
      waitBind,
      onCancel: close,
      onBind(ids, cb){dispatch(bindUsers(showBindModal, ids, cb))},
      onUnbind(ids, cb){dispatch(unbindUsers(showBindModal, ids, cb))},
    })
  }

  componentDidMount() {
    const {dispatch} = this.props
    dispatch(getProvinces())
    dispatch(clear())
    dispatch(getData())
    dispatch(getAllTag('channelTarget'))
    dispatch(fetchTagGroupsInUse())
    dispatch(fetchDepts())
  }
}

export default connect(function mapStateToProps(state) {
  return {
  	provinces: state.channel.provinces,
    cities: state.channel.cities,
    districts: state.channel.districts,
    filter: state.channel.filter,
    list: state.channel.list,
    loading: state.channel.loading,
    pagination: state.channel.pagination,
    tagGroupInUse: state.channel.tagGroupInUse,
    allTagGroups: state.customertag.allTagGroups,
    savingTagUesage: state.customertag.savingTagUesage,
    detail:state.channel.detail,
    waitBind:state.channel.waitBind,
    depts:state.users.depts,
  }
})(Channel);
