import './AreaChooser.less'
import React from 'react'
import _ from 'underscore'
import {Tree, Button, message, Icon, Card, Spin} from 'antd'
const TreeNode = Tree.TreeNode
import fetch from 'utils/fetch'

export default class AreaChooser extends React.Component{
  state = {
    treeData: [{
      areaId: 0,
      areaName: '全国',
      areaType: 0
    }],
    selected: [],
    leftChecked: [],
    rightChecked: [],
  }
  render(){
    return <div className="xk-cpn-area-chooser">
      <Card className="left-ctn" title="待选区域">
        {this.renderLeftTree()}
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
      <Card className="right-ctn" title="已选区域">
        {this.renderRightList()}
      </Card>
    </div>
  }

  renderLeftTree(){
    const {treeData, leftChecked} = this.state
    const selected = this.props.value
    if(!treeData) return <Spin><div className="content"/></Spin>
    const genTreeNodes = data => data.filter(
      item => !_.findWhere(selected, {areaId: item.areaId, areaType: item.areaType})
    ).map(item => item.children ?
      <TreeNode title={item.areaName} key={item.areaType+'-'+item.areaId} nodeData={item}>
        {genTreeNodes(item.children)}
      </TreeNode> :
      <TreeNode title={item.areaName} key={item.areaType+'-'+item.areaId} nodeData={item} isLeaf={item.areaType==3} />
    )
    return <div className="content-box">
      <Tree className="myCls"
        checkable checkStrictly
        checkedKeys={leftChecked.map(c => c.areaType+'-'+c.areaId)}
        loadData={this.onLoadData.bind(this)}
        onCheck={(keys, evt)=>{
          this.setState({
            leftChecked: evt.checkedNodes.map(node => node.props.nodeData)
          })
          // const curr = evt.node.props.nodeData
          // this.setState({
          //   leftChecked: evt.checked ?
          //     leftChecked.concat(curr) :
          //     leftChecked.filter(item => item.areaId!=curr.areaId && item.areaType!=curr.areaType)
          // })
        }}
      >
        {genTreeNodes(treeData)}
      </Tree>
    </div>
  }

  renderRightList(){
    const {rightChecked} = this.state
    return <div className="content-box">
      {this.props.value.map(item=>
        <div className="tag"><input type="checkbox" checked={rightChecked.find(r=>r==item.areaId)!==undefined} onChange={evt=>{

          this.setState({
            rightChecked: evt.target.checked ? rightChecked.concat(item.areaId):
              rightChecked.filter(r => r != item.areaId)
          })
        }}/>{item.areaName}</div>
      )}
    </div>
  }

  onLoadData(treeNode){
    const areaTypesForUrl = {
      0: 'province',
      1: 'city',
      2: 'district'
    }
    const {nodeData} = treeNode.props
    const {areaId, areaType} = nodeData
    const url = '/api/area/' + areaTypesForUrl[areaType]
    return fetch(url, 'get', {id: areaId}, (err, r)  => {
      if(err){
        message.error('获取地区数据时发生错误')
      }else{
        if(r.code==200){
            nodeData.children = r.data.map(item => {return {
              areaId: item.districtID || item.cityID || item.provinceID,
              areaName: item.provinceName || item.cityName || item.districtName,
              areaType: areaType+1
            }})
            this.setState({
              treeData: this.state.treeData
            })
        }else{
          message.error(r.message || '获取地区数据时发生错误')
        }
      }
    })
  }

  toRight(){
    const {leftChecked} = this.state
    const {value, onChange} = this.props
    onChange(value.concat(leftChecked))
    this.setState({
      leftChecked: []
    })
  }

  toLeft(){
    const {rightChecked} = this.state
    const {value, onChange} = this.props
    onChange(value.filter(item => !_.any(rightChecked, r => r==item.areaId)))
    this.setState({
      rightChecked: []
    })
  }


}
