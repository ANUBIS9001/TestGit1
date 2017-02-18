import './ChooseTagModal.less'
import React from 'react'
import _ from 'underscore'
import {Button, Modal, Icon} from 'antd'

export default class ChooseTagModal extends React.Component{
  state={
    rightGroups: [],
    leftCheckedIds: [],
    rightCheckedIds: [],
  }
  render(){
    const {title, allTagGroups, onCancel, onOk, saving} = this.props
    const {rightGroups} = this.state
    const leftGoups = allTagGroups.filter(ag => !rightGroups.find(rg => rg.id == ag.id))
    return <Modal visible={true}
      className="xk-modal-chooselabel"
      title={title}
      width="60%"
      onCancel={onCancel}
      onOk={()=>onOk(_.pluck(rightGroups, 'id'))}
      confirmLoading={saving}
    >
      <div className="label-chooser-container">
        <div className="left-area">
          <div className="area-title">待使用选项</div>
          <div className="area-box">
            {_.sortBy(leftGoups, 'sequence').map(group => this.renderGroupLine(group, 'left'))}
          </div>
        </div>
        <div className="center-bar">
          <Button onClick={this.toRight.bind(this)}><Icon type="caret-right" /></Button>
          <br/>
          <Button onClick={this.toLeft.bind(this)}><Icon type="caret-left" /></Button>
        </div>
        <div className="right-area">
        <div className="area-title">使用中选项</div>
        <div className="area-box">
          {_.sortBy(this.state.rightGroups, 'sequence').map(group => this.renderGroupLine(group, 'right'))}
        </div>
        </div>
      </div>
    </Modal>
  }

  renderGroupLine(group, side){
    const checkedIds = this.state[side+'CheckedIds']
    const checked = checkedIds.find(id => id == group.id)
    const style = checked ? {background: '#f5fafa'} : {}
    const handleClick = ()=>{
      this.setState({
        [side+'CheckedIds']: checked ?
          checkedIds.filter(id=>id!=group.id) :
          checkedIds.concat(group.id)
      })
    }
    return <div onClick={handleClick} className="group-line" style={style}>
      <input type="checkbox" checked={checked}/>
      <span className="group-name">{group.name}</span>
      <span className="group-tags">{group.tags.map(g=>g.name).join(', ')}</span>
    </div>
  }

  toRight(){
    const {allTagGroups} = this.props
    const {leftCheckedIds, rightGroups} = this.state
    const newSels = allTagGroups.filter(g => leftCheckedIds.find(lid => lid == g.id))
    this.setState({
      rightGroups: _.chain(newSels).union(rightGroups).value(),
      leftCheckedIds: []
    })
  }

  toLeft(){
    const {rightCheckedIds, rightGroups} = this.state
    const newRightGroups = rightGroups.filter(rg => !rightCheckedIds.find(rid => rid == rg.id))
    this.setState({
      rightGroups: newRightGroups,
      rightCheckedIds: []
    })
  }

  componentWillMount(){
    const {tagGroupInUse} = this.props
    this.setState({
      rightGroups: tagGroupInUse || []
    })
  }
}
