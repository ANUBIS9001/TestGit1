import './EditChannelModal.less'
import React from 'react'
import _ from 'underscore'
import {Input, Radio, Row, Col, Modal, Button, message, Icon} from 'antd'
import AreaChooser from 'cpn/AreaChooser'

export default class EditChannelModal extends React.Component{
  state = {
    treeData: {},
    data: {
      status: 1,
      tagIds: [],
      areas: []
    }
  }
  render(){
    const {onCancel, onOk, saving} = this.props
    const {data} = this.state
    return <Modal className="xk-modal-edit-channel"
      visible={true}
      width="70%"
      title={(this.props.data ? '编辑' : '新增') + '渠道'}
      onCancel={onCancel}
      onOk={()=>{
        if(!data.name) return message.error('请输入渠道名称')
        onOk(data)
      }}
      confirmLoading={saving}
    >
      {this.renderContent()}
    </Modal>
  }
  renderContent(){
    const {data} = this.state
    return <table className="form-table">
      <tr>
        <th span={6}>渠道名称</th>
        <td span={18}>
          <Input value={data.name} onChange={evt=>this.fill('name',evt.target.value)}/>
        </td>
      </tr>
      <tr>
        <th span={6}>启用状态</th>
        <td span={18}>
          <Radio.Group value={data.status} onChange={evt=>this.fill('status',evt.target.value)}>
            <Radio value={1}>启用</Radio>
            <Radio value={0}>禁用</Radio>
          </Radio.Group>
        </td>
      </tr>
      <tr>
        <th span={6}>可见客户</th>
        <td span={18}>{this.renderTagBox()}</td>
      </tr>
      <tr>
        <th span={6}>代理区域</th>
        <td span={18}>{this.renderAreaBox()}</td>
      </tr>
    </table>
  }

  renderTagBox(){
    const {tagGroupInUse} = this.props
    const tagIds = this.state.data.tagIds || []
    return <div className="tag-box">
      {tagGroupInUse.map(group =>
        <Row>
          <Col span={6}>{group.name}</Col>
          <Col span={18}>
            {group.tags.map(tag =>
              <label>
                <input type="checkbox"
                  checked={!!tagIds.find(t => t == tag.id)}
                  onChange={evt=>{
                    const checked = evt.target.checked
                    const newTags = checked ? tagIds.concat(tag.id) : tagIds.filter(t => t!=tag.id)
                    this.fill('tagIds', newTags)
                  }}
                />
                {tag.name}
              </label>
            )}
          </Col>
        </Row>
      )}
    </div>
  }

  renderAreaBox(){
    return <AreaChooser value={this.state.data.areas} onChange={(data)=>this.fill('areas', data)}/>
  }

  fill(field, value){
    const {data} = this.state
    this.setState({data: _.extend({}, data, {[field]: value})})
  }

  componentWillMount(){
    const {data} = this.props
    data && this.setState({data})
  }
}
