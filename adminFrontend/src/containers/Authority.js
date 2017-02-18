import _ from 'underscore'
import React from 'react'
import {connect} from 'react-redux'
import {message, Button, Table, Modal, Form, Input, Radio, Select} from 'antd'
import Icon from 'cpn/Icon'
import {
  showAddPath,
  closeAddPath,
  sendAddPath,
  sendEditPath,
  fetchModuleTree,
  delPath,
  showEditPath,
  closeEditPath,
  showPathAuths,
  closePathAuths,
  savePathAuth,
  delPathAuth
} from 'act/authority'
import moduleTypeDict from 'data/moduleType'
import actionTypeDict from 'data/actionType'

class Authority extends React.Component {
  render() {
    return <div>
      {this.renderTable()}
      {this.renderPathAuthoritiesModal()}
      {this.renderAddPathModal()}
      {this.renderEditPathModal()}
      {this.renderPathAuthsModal()}
    </div>
  }

  renderTable(){
    const {dispatch, path} = this.props

    const addMod = (rec, type) => {
      dispatch(showAddPath(type=='child' ? rec : rec.parent))
    }

    const delMod = (rec) => {
      Modal.confirm({
        title: '确认删除路径',
        content: <div>
          确定要删除路径 <b>{rec.moduleName}</b> 吗？
          {rec.children && <div style={{color: '#f50'}}>其所有下级路径也将被删除!</div>}
        </div>,
        onOk(){return dispatch(delPath(rec.moduleId)) }
      })
    }

    let columns = [{
      title: '路径名',
      dataIndex: 'moduleName'
    },{
      title: 'ID',
      dataIndex: 'moduleId'
    },{
      title: 'URL',
      dataIndex: 'moduleDefine'
    },{
      title: '类型',
      dataIndex: 'moduleType',
      render(val){return moduleTypeDict[val]}
    },{
      title: '上级路径',
      dataIndex: 'parent.moduleName'
    },{
      title: '操作',
      className: 'opt-col',
      render: (rec)=>{
        return <div>
          <a title="修改" onClick={()=> dispatch(showEditPath(rec))}><Icon type="edit"/></a>
          {rec.moduleType=='mod' &&
            <a title="添加下级路径" onClick={()=> addMod(rec, 'child')}><Icon type="plus"/></a>
          }
          {rec.moduleType=='uri' &&
            <a title="编辑权限" onClick={()=>dispatch(showPathAuths(rec))}><Icon type="ptjs"/></a>
          }
          <a title="删除" onClick={()=>delMod(rec)}><Icon type="trash"/></a>
        </div>
      }
    }]

    const props = {
      columns,
      rowKey: 'moduleId',
      dataSource: path.tree,
      loading: path.loading,
      pagination: false
    }

    return <Table {...props}/>


  }

  renderPathAuthoritiesModal(){

  }

  renderAddPathModal(){
    const {dispatch, addPath} = this.props
    return addPath.show &&
      <AddPathModal
        onOk={(params)=>dispatch(sendAddPath(params))}
        onCancel={()=>dispatch(closeAddPath())}
        waiting={addPath.waiting}
        parent={addPath.parent}
      />
  }

  renderEditPathModal(){
    const {dispatch, editPath} = this.props
    return editPath.show &&
      <AddPathModal
        onOk={(params)=>dispatch(sendEditPath(params))}
        onCancel={()=>dispatch(closeEditPath())}
        waiting={editPath.waiting}
        parent={editPath.data.parent}
        data={editPath.data}
      />
  }

  renderPathAuthsModal(){
    const {dispatch, pathAuths} = this.props
    return pathAuths.show &&
      <PathAuthsModal
        data={pathAuths.data}
        onSave={(param, isAdd, cb) => dispatch(savePathAuth(param, isAdd, cb))}
        onDel={(id)=>dispatch(delPathAuth(id))}
        onClose={()=>dispatch(closePathAuths())}
      />
  }

  componentDidMount(){
    this.props.dispatch(fetchModuleTree())
  }
}

export default connect(function(state) {
  return state.authority
})(Authority);

const AddPathModal = Form.create()( class AddPath extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      moduleType: 'uri'
    }
  }
  render(){
    let {onCancel, onOk, waiting, form, parent, data} = this.props
    parent = parent || {moduleId: '0', muduleName: '无'}
    const { getFieldDecorator } = form
    const rowSpans = {labelCol: {span: 5}, wrapperCol: {span: 12}}
    return <Modal
      visible={true}
      title={data ? '修改路径' : "添加路径"}
      onCancel={onCancel}
      onOk={()=>{
        form.validateFields((err, values) =>
          !err && onOk(_.extend({parentId: parent.moduleId}, values)))
      }}
      confirmLoading={waiting}
    >
      <Form horizontal>
        <Form.Item label="上级路径" {...rowSpans}>
          <span>{parent.moduleName}</span>
        </Form.Item>
        <Form.Item label="路径名称" {...rowSpans}>
          {getFieldDecorator('moduleName', {
            rules:[{required: true, message:'请输入路径名称'}],
            initialValue: data ? data.moduleName : ''
          })(
            <Input placeholder="请输入路径名称"/>
          )}
        </Form.Item>
        <Form.Item label="ID" {...rowSpans}>
          {getFieldDecorator('moduleId', {
            rules:[{required: true, message:'请输入模块ID'}],
            initialValue: data ? data.moduleId : ''
          })(
            <Input placeholder="请输入模块ID" disabled={!!data}/>
          )}
        </Form.Item>
        <Form.Item label="路径类型" {...rowSpans}>
          {getFieldDecorator('moduleType', {initialValue: this.state.moduleType})(
            <Radio.Group onChange={(e)=>{this.setState({moduleType: e.target.value})}}>
              <Radio value="mod">模块</Radio>
              <Radio value="uri">页面</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        {this.state.moduleType=='uri' &&
          <Form.Item label="路径URL" {...rowSpans}>
            {getFieldDecorator('moduleDefine', {
              rules:[{required: true, message:'请输入路径URL'}],
              initialValue: data ? data.moduleDefine : ''
            })(
              <Input placeholder="请输入路径URL"/>
            )}
          </Form.Item>
        }
        <Form.Item label="平台" {...rowSpans}>
          {getFieldDecorator('platform', {initialValue:data ? data.platform : 0})(
            <Radio.Group>
              <Radio value={0}>通用</Radio>
              <Radio value={1}>PC</Radio>
              <Radio value={2}>移动</Radio>
            </Radio.Group>
          )}
        </Form.Item>

      </Form>
    </Modal>
  }

  componentWillMount(){
    const {data} = this.props
    data && this.setState({
      moduleType: data.moduleType
    })
  }
})

class PathAuthsModal extends React.Component {
  state={
    editting: null,
    formData: {}
  }
  render(){
    const {data, onClose} = this.props
    const {editting, formData} = this.state
    let authList = data.authorities
    if(this.state.editting == authList.length){
      authList = authList.concat({})
    }

    const setForm = (key, val) => {
      this.setState({ formData: _.extend({}, formData, { [key]: val }) })
    }

    const columns = [{
      title: '权限名称',
      dataIndex: 'moduleName',
      render(val, rec, i){
        return i!=editting ? val :
        <Input
          value={formData.moduleName}
          style={{width:'100px'}}
          onChange={e=>setForm('moduleName', e.target.value)}
        />
      }
    },{
      title: '权限类型',
      dataIndex: 'moduleDefine',
      render(val, rec, i){
        return i!=editting ? actionTypeDict[val] :
          <Select style={{width: '100px'}} value={formData.moduleDefine} onChange={value => {
            setForm('moduleDefine', value)
          }}>
            {_.map(actionTypeDict, (text, key) =>
              <Select.Option key={key}>{text}</Select.Option>
            )}
          </Select>
      }
    },{
      title: '权限标识(ID)',
      dataIndex: 'moduleId',
      render(val, rec, i){
        return i!=editting ? val :
          <Input
            addonBefore={data.moduleId+'-'}
            value={formData.moduleId && formData.moduleId.replace(data.moduleId+'-', '')}
            style={{width: '60px'}}
            onChange={e=>setForm('moduleId', data.moduleId+'-'+e.target.value)}
          />
      }
    },{
      title: '操作',
      className: 'opt-col',
      render: (v, r, i) =>
        i==editting ?
          <div>
            <Button size="small" onClick={this.save.bind(this)}>保存</Button>
            <Button size="small" onClick={this.cancelEdit.bind(this)}>取消</Button>
          </div>
        :
          <div>
          <a title="修改" onClick={()=>this.edit(i)}><Icon type="edit"/></a>
          <a title="删除" onClick={()=>this.del(r)}><Icon type="trash"/></a>
          </div>
    },]

    const tableProps = {
      columns,
      pagination: false,
      dataSource: authList,
      footer:()=>
        <div>
          <Button onClick={()=>this.edit(data.authorities.length)}>
            <Icon type="plus"/> 添加权限
          </Button>
        </div>
    }

    return <Modal
      visible={true}
      width="600px"
      title={`设置 “${data.moduleName}”权限`}
      footer={false}
      onCancel={onClose}
    >
      <Table {...tableProps}/>
    </Modal>
  }

  edit(index){
    if(_.isNumber(this.state.editting)){
      return message.warn('请先保存正在编辑的权限')
    }
    const {authorities} = this.props.data
    this.setState({
      editting: index,
      formData: _.clone(authorities[index] || {})
    })
  }

  save(){
    const {data, onSave} = this.props
    const param = _.extend({parentId: data.moduleId}, this.state.formData)
    onSave(
      param,
      this.state.editting == data.authorities.length,
      err => !err && this.setState({editting: null})
    )
  }

  cancelEdit(){
    this.setState({editting: null})
  }

  del(rec){
    Modal.confirm({
      title: '确认删除路径',
      content: <div>
        确定要删除权限 <b>{rec.moduleName}</b> 吗？
      </div>,
      onOk:()=>{this.props.onDel(rec.moduleId)}
    })
  }
}
