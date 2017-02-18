import './ChannelBindModal.less'
import React from 'react'
import _ from 'underscore'
import fetch from 'utils/fetch'
import {Spin, Row, Col, Modal, Button, message, Icon, Card, Tree, Input} from 'antd'
const Search = Input.Search
const TreeNode = Tree.TreeNode

export default class ChannelBindModal extends React.Component{
  state = {
    treeData: [],
    binded: [],
    leftChecked: [],
    rightChecked: [],
    leftFilter: '',
    rightFilter: '',
    leftWaitingSearch: false,
    leftSearchResult: []
  }
  render(){
    const {onCancel, waitBind} = this.props
    return <Modal
      className="xk-modal-channel-bind"
      visible={true}
      title="绑定业务员"
      width="70%"
      footer={false}
      onCancel={onCancel}
      // onOk={()=>{onOk(_.pluck(this.state.binded, 'empCode'))}}
    >
      <Spin spinning={waitBind}><div className="wrapper">
        <Card className="left-ctn" title="待绑定业务员" extra={this.renderLeftSearch()}>
          <div className="content-box">
            {this.renderLeftContent()}
          </div>
        </Card>
        <div className="center-bar">
          <Button onClick={this.toRight.bind(this)} type="ghost">
            <Icon type="caret-right" />
          </Button>
          <br/>
          <Button onClick={this.toLeft.bind(this)} type="ghost">
            <Icon type="caret-left" />
          </Button>
        </div>
        <Card className="right-ctn" title="已绑定业务员" extra={this.renderRightSearch()}>
          {this.renderUserList()}
        </Card>
      </div></Spin>

    </Modal>
  }

  renderLeftSearch(){
    const filter = this.state.leftFilter
    return React.createElement(Input, {
      addonBefore: <Icon type="search" style={{color: filter ? '#f50' : '#999'}}/>,
      placeholder: '业务员姓名/ID/部门',
      value: filter,
      onChange: (evt)=>{
        clearTimeout(this.searchTimeoutId)
        const value = evt.target.value.trim()
        if(!value) return this.setState({
          leftFilter: '',
          leftSearchResult: []
        })
        this.setState({
          leftFilter: value,
          leftWaitingSearch: true
        })
        this.searchTimeoutId = setTimeout(()=>{
          fetch('/api/seller/query-channel-other-seller', 'post', {query: value}, (err, r) => {
            this.setState({leftWaitingSearch: false})
            if(!err && r && r.code===0)
              this.setState({leftSearchResult: (r.data || []).map(u => {return {
                empCode: u.sellerId,
                empName: u.sellerName,
                deptName: u.deptName,
              }})})
            else {
              message.error('查询业务员时发生错误')
            }
          })
        }, 1000)
      }
    })
  }

  renderRightSearch(){
    const filter = this.state.rightFilter
    return React.createElement(Input, {
      addonBefore: <Icon type="filter" style={{color: filter ? '#f50' : '#999'}}/>,
      placeholder: '业务员姓名/ID/部门',
      value: filter,
      onChange: (evt)=>{this.setState({rightFilter: evt.target.value.trim()})}
    })
  }

  renderLeftContent(){
    return this.state.leftFilter ? this.renderLeftSearchResut() : this.renderDeptTree()
  }

  renderLeftSearchResut(){
    const {leftSearchResult, leftChecked, leftWaitingSearch, binded} = this.state
    if(leftWaitingSearch) return <Spin tip="正在搜索..."><div style={{height:'200px'}}/></Spin>
    const showingList = leftSearchResult.filter(l => !binded.find(b=>b.empCode==l.empCode))
    if(!showingList.length) return <div className="empty-search-tip">没有搜索到相符的业务员</div>
    return showingList.map(b =>
      <Row className="user-row">
        <Col span={3}>
          <input type="checkbox" checked={!!leftChecked.find(r => r.empCode==b.empCode)} onChange={(evt)=>{
            this.setState({
              leftChecked: evt.target.checked ?
                leftChecked.concat(b) : leftChecked.filter(r => b.empCode!=r.empCode)
            })
          }}/>
        </Col>
        <Col span={7}>{b.empCode}</Col>
        <Col span={7}>{b.empName}</Col>
        <Col span={7}>{b.deptName}</Col>
      </Row>
    )
  }

  renderDeptTree(){
    const {treeData, leftChecked} = this.state
    const checkedKeys = leftChecked.map(l => l.empCode || l.deptId)
    return <Tree
      loadData={this.onLoadTreeData.bind(this)}
      checkable
      checkedKeys={checkedKeys}
      onCheck={(keys, evt)=>{
        // let leftChecked = this.state.leftChecked
        // if(evt.checked){
        //   leftChecked = leftChecked.concat(evt.node.props.nodeData)
        // }else{
        //   leftChecked = leftChecked.filter(l => l.empCode != evt.node.props.nodeData.empCode)
        // }
        const leftChecked = evt.checkedNodes.map(c => c.props.nodeData)
        this.setState({leftChecked})
      }}
    >
      {this.genDeptTree(treeData)}
    </Tree>
  }

  onLoadTreeData(treeNode){
    // if(treeNode.props.children && treeNode.props.children.length) return
    const {nodeData} = treeNode.props
    if(nodeData.loaded) return
    return this.loadUser(nodeData.deptId, (data)=>{
      nodeData.children = (nodeData.children || []).concat(data)
      nodeData.loaded = true
      this.setState({treeData: this.state.treeData})
    })
  }

  loadUser(deptId, cb){
    return fetch('/api/seller/query', 'post', {
      deptId,
      pageNo: 1,
      pageSize: 1000
    }, (err, r)  => {
      if(err){
        message.error('获取部门用户时发生错误')
      }else{
        if(r.code==200){
          cb(r.data.result.map(u => {return {
            empCode: u.sellerId,
            empName: u.sellerName,
            deptName: u.deptName,
          }}))
        }else{
          message.error(r.message || '获取部门用户时发生错误')
        }
      }
    })
  }

  genDeptTree(data){
    const {binded} = this.state
    const props = {
      title: <span><Icon type={data.empName ? "user" : "home"}/> {data.empName || data.deptName}</span>,
      key:  data.empCode || data.deptId,
      nodeData: data
    }
    return data.children ?
      <TreeNode {...props}>{data.children.filter(l => !binded.find(b => b.empCode==l.empCode))
      .map(item=>this.genDeptTree(item))}</TreeNode>
    :
      <TreeNode {...props} isLeaf={data.empName ? true : false}/>
  }

  renderUserList(){
    const {rightChecked, rightFilter} = this.state
    let userList = this.state.binded
    if(rightFilter){
      const tester = new RegExp(rightFilter)
      userList = userList.filter(u => tester.test(u.empCode+u.empName+u.deptName))
    }
    return <div className="content-box">
      {userList.map(b =>
        <Row className="user-row">
          <Col span={3}>
            <input type="checkbox" checked={!!rightChecked.find(r => r==b.empCode)} onChange={(evt)=>{
              this.setState({
                rightChecked: evt.target.checked ?
                  rightChecked.concat(b.empCode) : rightChecked.filter(r => b.empCode!=r)
              })
            }}/>
          </Col>
          <Col span={7}>{b.empCode}</Col>
          <Col span={7}>{b.empName}</Col>
          <Col span={7}>{b.deptName}</Col>
        </Row>
      )}
    </div>
  }

  toRight(){
    const {binded, leftChecked} = this.state

    this.props.onBind(_.pluck(leftChecked, 'empCode'), (err)=>{
      !err && this.setState({
        binded: binded.concat(leftChecked.filter(l => l.empName)),
        leftChecked: []
      })
    })
  }
  toLeft(){
    const {binded, rightChecked} = this.state
    this.props.onUnbind(rightChecked, (err)=>{
      !err && this.setState({
        binded: binded.filter(b => !rightChecked.find(r=>r==b.empCode)),
        rightChecked: []
      })
    })
  }

  componentWillMount(){
    const {depts} = this.props
    this.setState({treeData: depts})
  }

  componentDidMount(){
    const {channelId} = this.props
    fetch('/api/seller/query-channel-seller', 'post', {channelId}, (err, r) => {
      if(err){
        message.error('获取渠道绑定用户时发生错误')
      }else{
        if(r.code==200 || r.code==0){
          this.setState({binded: r.data.map(u=>{
            return {
              empCode: u.sellerId,
              deptName: u.deptName,
              empName: u.sellerName,
            }
          })})
        }else{
          message.error(r.message || '获取渠道绑定用户时发生错误')
        }
      }
    })
  }
}
