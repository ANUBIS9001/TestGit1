import _ from 'underscore'
import React from 'react'
import {connect} from 'react-redux'
import {Button, Table, Modal, Form, Input, Radio, Row, Col, Tree, Spin} from 'antd'
const TreeNode = Tree.TreeNode
import Icon from 'cpn/Icon'
import {AuthA, AuthButton} from './Auth'
import {
  fetchRoles,
  delRole,
  showAdd,
  sendAdd,
  closeAdd,
  showEdit,
  sendEdit,
  closeEdit,
  showRoleAuths,
  closeRoleAuths,
  selectModule,
  setActions,
  unsetActions,
  setMods,
  saveRoleAuths
} from 'act/roles'
import { fetchModuleTree } from 'act/authority'
import actionTypeDict from 'data/actionType'

class Roles extends React.Component {
  render() {
    return <div>
      {this.renderTitleRow()}
      {this.renderTable()}
      {this.rederAddRoleModal()}
      {this.rederEditRoleModal()}
      {this.renderRoleAuthsModal()}
    </div>
  }

  renderTitleRow(){
    return <div style={{marginBottom: '12px', textAlign: 'right'}}>
      {/* <Input.Search/> */}
      <AuthButton tail="add" onClick={()=>this.props.dispatch(showAdd())}>
        <Icon type="plus"/> 添加角色
      </AuthButton>
    </div>
  }

  renderTable(){
    const {dispatch, list, loading} = this.props

    const delMod = (rec) => {
      Modal.confirm({
        title: '确认删除角色',
        content: <div>
          确定要删除角色 <b>{rec.roleName}</b> 吗？
        </div>,
        onOk(){return dispatch(delRole(rec.roleId)) }
      })
    }

    let columns = [{
      title: 'ID',
      dataIndex: 'roleId'
    },{
      title: '角色名称',
      dataIndex: 'roleName'
    },{
      title: '描述',
      dataIndex: 'roleDescription'
    },{
      title: '状态',
      dataIndex: 'enabled',
      render(enabled){return enabled ? '启用' : '禁用'}
    },{
      title: '添加时间',
      dataIndex: 'createdAt'
    },{
      title: '操作',
      className: 'opt-col',
      render: (rec)=>{
        return <div>
          <AuthA tail="auth" title="权限" onClick={()=> dispatch(showRoleAuths(rec))}><Icon type="quanxian3"/></AuthA>
          <AuthA tail="edit" title="修改" onClick={()=> dispatch(showEdit(rec))}><Icon type="edit1"/></AuthA>
          <AuthA tail="del" title="删除" onClick={()=>delMod(rec)}><Icon type="trash"/></AuthA>
        </div>
      }
    }]

    const props = {
      columns,
      rowKey: 'roleId',
      dataSource: list,
      loading: loading,
      pagination: false
    }

    return <Table {...props}/>

  }

  rederAddRoleModal(){
    const {dispatch, add} = this.props
    return add.show &&
      React.createElement(RoleFormModal, {
        onOk(params){dispatch(sendAdd(params))},
        onCancel(){dispatch(closeAdd())},
        waiting: add.waiting
      })
  }

  rederEditRoleModal(){
    const {dispatch, edit} = this.props
    return edit.show &&
      React.createElement(RoleFormModal, _.extend({
        onOk(params){dispatch(sendEdit(_.extend({roleId: edit.data.roleId}, params)))},
        onCancel(){dispatch(closeEdit())}
      }, edit))
  }

  renderRoleAuthsModal(){
    const {dispatch, roleAuths, authTree} = this.props
    if(!roleAuths.show) return null
    const {selectedModule, roleActionIds, roleModIds, role, waiting, loading} = roleAuths

    function genTreeNode(item){
      const icons = {
        mod: 'cubes',
        uri: '103'
      }
      const props = {
        title: <div onClick={()=>dispatch(selectModule(item))}>
          <Icon type={icons[item.moduleType]}/> {item.moduleName}
        </div>,
        key: item.moduleId,
        data: item
      }
      return item.children ? <TreeNode {...props}>
        {item.children.map(c => genTreeNode(c))}
      </TreeNode> :
      <TreeNode {...props}/>
    }

    const renderAuthTable = () => {
      if(!selectedModule || !selectedModule.authorities)
        return null
      const tableProps = {
        columns: [{
          title: '权限名称',
          dataIndex: 'moduleName'
        },{
          title: '权限标识(ID)',
          dataIndex: 'moduleId',
        },{
          title: '权限类型',
          dataIndex: 'moduleDefine',
          render(val){return actionTypeDict[val]}
        },{
          title: '权限描述',
          dataIndex: ''
        }],
        rowKey: 'moduleId',
        dataSource: selectedModule.authorities,
        pagination: false,
        rowSelection: {
          selectedRowKeys: roleActionIds,
          onChange(selecteds){
            dispatch(setActions(selecteds, selectedModule.authorities.map(a=>a.moduleId)))
          }
        }
      }
      return <Table {...tableProps}/>
    }

    return <Modal
      visible={true}
      width="800px"
      title={`设置${role.roleName}权限`}
      onCancel={()=>dispatch(closeRoleAuths())}
      onOk={()=>dispatch(saveRoleAuths())}
      confirmLoading={waiting}
    >
      <Spin spinning={loading}>
        <Row gutter={8}>
          <Col span={8}>
            <div style={{height: '300px', overflow: 'auto', background: '#fafafa'}}>
              <Tree
                checkable
                checkStrictly
                checkedKeys={roleModIds}
                onCheck={(keys, e)=>{
                  const {data} = e.node.props
                  dispatch(setMods(keys))
                  if(!e.checked){
                    dispatch(unsetActions(data.authorities.map(a=>a.moduleId)))
                  }
                }}
              >
                {authTree.map(item => genTreeNode(item))}
              </Tree>
            </div>
          </Col>
          <Col span={16}>
            {renderAuthTable()}
          </Col>
        </Row>
      </Spin>
    </Modal>
  }

  componentDidMount(){
    this.props.dispatch(fetchRoles())
    this.props.dispatch(fetchModuleTree())
  }
}

export default connect(function(state) {
  return _.extend({
    authTree: state.authority.path.tree
  }, state.roles)
})(Roles);

const RoleFormModal = Form.create()( class RoleFormModal extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      enabled: true
    }
  }
  render(){
    let {onCancel, onOk, waiting, form, data} = this.props
    const { getFieldDecorator } = form
    const rowSpans = {labelCol: {span: 5}, wrapperCol: {span: 12}}
    return <Modal
      visible={true}
      title={data ? '修改角色' : "添加角色"}
      onCancel={onCancel}
      onOk={()=>{
        form.validateFields((err, values) =>
          !err && onOk(_.extend(values)))
      }}
      confirmLoading={waiting}
    >
      <Form horizontal>
        <Form.Item label="角色名称" {...rowSpans}>
          {getFieldDecorator('roleName', {
            rules:[{required: true, message:'请输入角色名称'}],
            initialValue: data ? data.roleName : ''
          })(
            <Input placeholder="请输入角色名称"/>
          )}
        </Form.Item>
        <Form.Item label="角色描述" {...rowSpans}>
          {getFieldDecorator('roleDescription', {initialValue: data ? data.roleDescription : ''})(
            <Input placeholder="请输入描述内容" type="textarea" rows={4}/>
          )}
        </Form.Item>
        <Form.Item label="状态" {...rowSpans}>
          {getFieldDecorator('enabled', {initialValue: this.state.enabled})(
            <Radio.Group onChange={(e)=>{this.setState({enabled: e.target.value})}}>
              <Radio value={true}>启用</Radio>
              <Radio value={false}>禁用</Radio>
            </Radio.Group>
          )}
        </Form.Item>
      </Form>
    </Modal>
  }

  componentWillMount(){
    const {data} = this.props
    data && this.setState({
      enabled: data.enabled
    })
  }
})
