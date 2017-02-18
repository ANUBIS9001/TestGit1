import _ from 'underscore'
import './Workbench.less'
import React from 'react'
import {connect} from 'react-redux'
import { Row, Col, Button, Card, Table, Tooltip} from 'antd'
import Icon from '../components/Icon'
import {Link} from 'react-router'
import Auth from './Auth'
import {fetchUnverified,fetchVerified,fetchUnhandled,fetchHandled,clear} from '../actions/workBench'

class Workbench extends React.Component {
  render() {
    return <div className="xk-ctn-workbench">
      {this.renderCustomerLists()}
      {this.renderWorkList()}
    </div>
  }

  renderCustomerLists(){
    const {unverified,verified,loading} = this.props
    return (
      <Row gutter={12} className="lists-row">
        <Col span={12}>
        <Auth tail="01">
        <Card
          className="list-box"
          title={<span><Icon type="xinxi01"/> 待审核的客户</span>}
          extra={<Tooltip title="更多"><Link to="/customer?radioValue=todo"><Icon type="list"/></Link></Tooltip>}
        >
        <div className="notice-line">
          <div className="bold">学校名称</div>
          <div className="bold">添加人</div>
          <div className="bold">学段</div>
          <div className="bold">添加日期</div>
        </div>
          {unverified.map(({id,schoolName,sellerName,isGradeSchool,isMiddleSchool,isHighSchool,isNurserySchool,addTime}) =>{
            let stage = "";
            if(isNurserySchool){
              stage+="幼，"
            }
            if(isGradeSchool){
              stage+="小，"
            }
            if(isMiddleSchool){
              stage+="初，"
            }
            if(isHighSchool){
              stage+="高，"
            }
            stage=stage.substring(0,stage.length-1)
            return <div className="notice-line" key={id}>
              <div className="name">{schoolName}</div>
              <div className="name">{sellerName}</div>
              <div className="name">{stage}</div>
              <div className="name">{addTime?addTime.split(/\s/)[0]:addTime}</div>
            </div>
            }
          )}

          {unverified.length>0?"":<div style={{
            color: '#aaa',
            textAlign: 'center'
          }}>
            <br/>
            <br/>
            {loading==true?"加载中...":"暂无待审核的客户"}
            <br/>
            <br/>
            <Icon type="comments" style={{fontSize:'120px', color: '#f5f5f5'}}/>
          </div>}
        </Card>
        </Auth>
        </Col>
        <Col span={12}>
        <Auth tail="02">
        <Card
          className="list-box"
          title={<span><Icon type="xinxi01"/> 已审核的客户</span>}
          extra={<Tooltip title="更多"><Link to="/customer?radioValue=done"><Icon type="list"/></Link></Tooltip>}
        >
        <div className="notice-line">
          <div className="bold">学校名称</div>
          <div className="bold">添加人</div>
          <div className="bold">审核人</div>
          <div className="bold">审核日期</div>
        </div>
          {verified.map(({schoolId,schoolName,sellerName,handler,handleTime}) =>{
            return <div className="notice-line" key={schoolId}>
              <div className="name">{schoolName}</div>
              <div className="name">{sellerName}</div>
              <div className="name">{handler}</div>
              <div className="name">{handleTime?handleTime.split(/\s/)[0]:handleTime}</div>
            </div>
            }
          )}

          {verified.length>0?"":<div style={{
            color: '#aaa',
            textAlign: 'center'
          }}>
            <br/>
            <br/>
            {loading==true?"加载中...":"暂无已审核的客户"}
            <br/>
            <br/>
            <Icon type="comments" style={{fontSize:'120px', color: '#f5f5f5'}}/>
          </div>}
        </Card>
        </Auth>
        </Col>
      </Row>
    )
  }

  renderWorkList(){
    const {unhandled,handled,loading} = this.props
    let id = 0;
    return (
      <Row gutter={12} className="lists-row">
        <Col span={12}>
        <Auth tail="03">
        <Card
          className="list-box"
          title={<span><Icon type="xinxi01"/> 待处理的工单</span>}
          extra={<Tooltip title="更多"><Link to="/worksheet?status=0"><Icon type="list"/></Link></Tooltip>}
        >
        <div className="notice-line" key={id}>
          <div className="bold">工单名称</div>
          <div className="bold">发起人</div>
          <div className="bold">处理人</div>
          <div className="bold">提单日期</div>
        </div>
          {unhandled.map(({createTime,creator,handler,id,name}) =>{
            return <div className="notice-line" key={id}>
              <div className="name">{name}</div>
              <div className="name">{creator}</div>
              <div className="name">{handler}</div>
              <div className="name">{createTime?createTime.split(/\s/)[0]:createTime}</div>
            </div>
            }
          )}

          {unhandled.length>0?"":<div style={{
            color: '#aaa',
            textAlign: 'center'
          }}>
            <br/>
            <br/>
            {loading==true?"加载中...":"暂无待处理的工单"}
            <br/>
            <br/>
            <Icon type="comments" style={{fontSize:'120px', color: '#f5f5f5'}}/>
          </div>}
        </Card>
        </Auth>
        </Col>
        <Col span={12}>
        <Auth tail="04">
        <Card
          className="list-box"
          title={<span><Icon type="xinxi01"/> 已完成的工单</span>}
          extra={<Tooltip title="更多"><Link to="/worksheet?status=2"><Icon type="list"/></Link></Tooltip>}
        >
          <div className="notice-line" key={id}>
            <div className="bold">工单名称</div>
            <div className="bold">发起人</div>
            <div className="bold">处理人</div>
            <div className="bold">提单日期</div>
          </div>
            {handled.map(({createTime,creator,handler,id,name}) =>{
              return <div className="notice-line" key={id}>
                <div className="name">{name}</div>
                <div className="name">{creator}</div>
                <div className="name">{handler}</div>
                <div className="name">{createTime?createTime.split(/\s/)[0]:createTime}</div>
              </div>
              }
            )}

          {handled.length>0?"":<div style={{
            color: '#aaa',
            textAlign: 'center'
          }}>
            <br/>
            <br/>
            {loading==true?"加载中...":"暂无已完成的工单"}
            <br/>
            <br/>
            <Icon type="comments" style={{fontSize:'120px', color: '#f5f5f5'}}/>
          </div>}
        </Card>
        </Auth>
        </Col>
      </Row>
    )
  }

  componentDidMount() {
    const {dispatch} = this.props
    dispatch(clear())
    dispatch(fetchUnverified())
    dispatch(fetchVerified())
    dispatch(fetchUnhandled())
    dispatch(fetchHandled())
  }
}

export default connect(function(state) {
  return state.workBench
})(Workbench);
