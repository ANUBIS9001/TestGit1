import './VisitLog.less'
import _ from 'underscore'
import React from 'react'
import {connect} from 'react-redux'
import {Button, Table, DatePicker, Input,Modal,Row, Col} from 'antd'
import moment from 'moment'
import Icon from 'cpn/Icon'
import {getData,setFilter,clear,getDetailsData,clearDetail} from 'act/visitlog'
const { RangePicker } = DatePicker

class VisitLog extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  render() {
    return <div className="xk-page-visitlog">
      {this.renderFilter()}
      {this.renderTable()}
      {this.renderModal()}
    </div>
  }

  renderModal(){
    const {dispatch,detail}=this.props;
    if(!(_.isEmpty(detail))){
      return (
        <Modal
          visible={true}
          title="日志详情"
          maskClosable={false}
          onCancel={()=>dispatch(clearDetail())}
          footer={[
            <Button type="primary" size="large" onClick={()=>dispatch(clearDetail())}>关闭</Button>
          ]}
        >
          <div>
            <Row className="row-style">
              <Col span={3}>
                <span className="col-title">日 志 ID：</span>
              </Col>
              <Col span={9}>
                <span>{detail.id}</span>
              </Col>
              <Col span={3}>
                <span className="col-title">操作时间：</span>
              </Col>
              <Col span={9}>
                <span>{moment(detail.requestTime,'x').format('YYYY-MM-DD HH:mm:ss')}</span>
              </Col>
            </Row>
            <Row className="row-style">
              <Col span={3}>
                <span className="col-title">用 户 名：</span>
              </Col>
              <Col span={9}>
                <span>{detail.userName}</span>
              </Col>
              <Col span={3}>
                <span className="col-title">用 户 ID：</span>
              </Col>
              <Col span={9}>
                <span>{detail.userId}</span>
              </Col>
            </Row>
            <Row className="row-style">
              <Col span={3}>
                <span className="col-title">系统名称：</span>
              </Col>
              <Col span={9}>
                <span>{detail.systemName}</span>
              </Col>
              <Col span={3}>
                <span className="col-title">操作名称：</span>
              </Col>
              <Col span={9}>
                <span>{detail.operateName}</span>
              </Col>
            </Row>
            <Row className="row-style">
              <Col span={3}>
                <span className="col-title">请求类型：</span>
              </Col>
              <Col span={9}>
                <span>{detail.method}</span>
              </Col>
            </Row>
            <Row className="row-style">
              <Col span={3}>
                <span className="col-title">请求链接：</span>
              </Col>
              <Col span={21}>
                <span>{detail.url}</span>
              </Col>
            </Row>
            <Row className="row-style">
              <Col span={3}>
                <span className="col-title">请求数据：</span>
              </Col>
              <Col span={21}>
                <span>{detail.request}</span>
              </Col>
            </Row>
            <Row className="row-style">
              <Col span={3}>
                <span className="col-title">响应数据：</span>
              </Col>
              <Col span={21}>
                <span>{detail.response}</span>
              </Col>
            </Row>
            <Row className="row-style">
              <Col span={3}>
                <span className="col-title">响应时间：</span>
              </Col>
              <Col span={9}>
                <span>{detail.timeUsed}s</span>
              </Col>
              <Col span={3}>
                <span className="col-title">IP 地 址：</span>
              </Col>
              <Col span={9}>
                <span>{detail.ip}</span>
              </Col>
            </Row>
            <Row className="row-style">
              <Col span={3}>
                <span className="col-title">浏 览 器：</span>
              </Col>
              <Col span={21}>
                <span>{detail.userAgent}</span>
              </Col>
            </Row>
            <Row className="row-style">
              <Col span={3}>
                <span className="col-title">是否成功：</span>
              </Col>
              <Col span={9}>
                <span>{detail.result?'是':'否'}</span>
              </Col>
              {detail.result?'':
                <Col span={12}>
                  <span className="col-title">失败原因：</span>
                  <span>{detail.message}</span>
                </Col>
              }
            </Row>
            
          </div>
        </Modal>
      )
    }else{
      return null;
    }
  }

  renderFilter(){
    const {dispatch} = this.props
    return (
      <div>
        <RangePicker 
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder={['开始时间', '结束时间']}
            onChange={this.rangeChange.bind(this)}
          />
        &emsp;&emsp;&emsp;&emsp;
        <label>
          关键字搜索：
          <Input
            placeholder="客户ID/客户名称"
            style={{width:'150px'}}
            onChange={(evt)=>dispatch(setFilter('userName', evt.target.value))}
            onPressEnter={() => dispatch(getData())}
          />
        </label>
        &emsp;
        <Button onClick={()=>dispatch(getData())} type="primary">筛选</Button>
      </div>
    )
  }

  renderTable(){
    let columns = [{
      title: '日志ID',
      dataIndex: 'id',
      width:'5%'
    }, {
      title: '用户名',
      dataIndex: 'userName',
      width:'5%'
    }, {
      title: '系统名称',
      dataIndex: 'systemName',
      width:'5%'
    }, {
      title: '操作名称',
      dataIndex: 'operateName',
      width:'8%'
    }, {
      title: '请求链接',
      dataIndex: 'url',
    }, {
      title: 'IP',
      dataIndex: 'ip',
      width:'5%'
    }, {
      title: '响应时间',
      dataIndex: 'timeUsed',
      width:'15%',
      render:(text, record, index)=>{
        return text+'s'; 
      }
    }, {
      title: '浏览器标识',
      dataIndex: 'userAgent',
      width:'25%'
    }, {
      title: '操作时间',
      dataIndex: 'requestTime',
      width:'5%',
    }, {
      title: '是否成功',
      dataIndex: 'result',
      width:'5%',
      render:(text, record, index)=>{
        return text?'是':'否'
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
        onRowClick={this.handleRowClick.bind(this)}
      />
    );
  }

  rangeChange(dates, dateStrings){
    const {dispatch} = this.props;
    dispatch(setFilter({requestTimeBegin:dateStrings[0]}));
    dispatch(setFilter({requestTimeEnd:dateStrings[1]}));
  }

  handleTableChange(pagination){
    this.props.dispatch(getData(pagination))
  }

  handleRowClick(record, index){
    this.props.dispatch(getDetailsData(record.id))
  }

  componentDidMount() {
    const {dispatch} = this.props
    dispatch(clear())
    dispatch(getData())
  }
}


export default connect(function(state) {
  return state.visitlog
})(VisitLog);