import _ from 'underscore'
import moment from 'moment'
import React from 'react'
import {connect} from 'react-redux'
import {Button, Table, Modal, Input, Spin, Select, TreeSelect} from 'antd'
const TreeNode = TreeSelect.TreeNode
import Icon from 'cpn/Icon'
import {
  setFilter,
  fetchUsers,
  fetchDepts,
  showImport,
  delUser,
  toggleDisable,
  showSelectRoles,
  closeSelectRoles,
  changeSelectedRoles,
  saveSelectRoles
} from 'act/users'
import { fetchRoles } from 'act/roles'

const initialPagination = {current: 1, pageSize: 10}

class Users extends React.Component {
  render() {
    return <div>
      {this.renderSearchBar()}
      {this.renderTable()}
      {this.rederSelectRolesModal()}
    </div>
  }

  renderSearchBar(){
    const {dispatch, filter, roles, depts} = this.props
    return <div style={{marginBottom: '12px'}}>
      <Select
        style={{width: '150px'}}
        placeholder="角色"
        allowClear={true}
        value={filter.roleId}
        onChange={(roleId)=>{
          dispatch(setFilter({roleId}))
          dispatch(fetchUsers(initialPagination))
        }
      }>
        {roles.map(role =>
          <Select.Option key={role.roleId} value={role.roleId}>{role.roleName}</Select.Option>
        )}
      </Select>
      &emsp;
      <TreeSelect
        style={{width: '200px'}}
        placeholder="部门"
        value={filter.deptId}
        onChange={deptId => {
          dispatch(setFilter({deptId}))
          dispatch(fetchUsers(initialPagination))
        }}
      >
        {depts && genDeptTree(depts)}
      </TreeSelect>
      &emsp;
      <Input.Search
        style={{width: '180px'}}
        placeholder='用户名/姓名/员工编号'
        value={filter.keyword}
        onChange={(e)=>dispatch(setFilter({keyword: e.target.value}))}
        onSearch={()=>dispatch(fetchUsers(initialPagination))}
      />
      {/* <Button style={{float: 'right'}} onClick={()=>this.props.dispatch(showImport())}>
        <Icon type="ziyuan"/> OA系统导入
      </Button> */}
    </div>
  }

  renderTable(){
    const {dispatch, list, loading, pagination} = this.props

    const confirmDelUser = (rec) => {
      Modal.confirm({
        title: '确认删除用户',
        content: <div>
          确定要删除用户 <b>{rec.roleName}</b> 吗？
        </div>,
        onOk(){return dispatch(delUser(rec.sellerId)) }
      })
    }

    const confirmToggleDisable = (rec) => {
      Modal.confirm({
        title: `确认${rec.isDisabled ? '启用' : '禁用'}`,
        content: <div>
          确定要{rec.isDisabled ? '启用' : '禁用'}用户 <b>{rec.sellerName}</b> 吗？
        </div>,
        onOk(){return dispatch(toggleDisable(rec)) }
      })
    }

    let columns = [{
      title: 'OA员工编号',
      dataIndex: 'sellerId'
    },{
      title: 'OA员工姓名',
      dataIndex: 'sellerName'
    },{
      title: '角色名',
      dataIndex: 'roleName'
    },{
      title: '部门',
      dataIndex: 'deptName'
    },{
      title: '职位',
      dataIndex: ''
    },{
      title: '添加时间',
      dataIndex: 'sellerRegTime',
      render(val){return moment(val).format('YYYY-MM-DD')}
    },{
      title: '用户状态',
      dataIndex: 'isDisabled',
      render(isDisabled){return isDisabled ?
        <span style={{color: '#f30'}}>已禁用</span> :
        <span style={{color: '#0a0'}}>已启用</span>}
    },{
      title: '操作',
      className: 'opt-col',
      render: (rec)=>{
        return <div>
          <a title="配置角色" onClick={()=> dispatch(showSelectRoles(rec.sellerId))}><Icon type="jiaoseguanli"/></a>
          <a title={rec.isDisabled ? '启用' : '禁用'} onClick={()=> dispatch(confirmToggleDisable(rec))}>
            <Icon type={rec.isDisabled ? "unlock" : "lock"}/>
          </a>
          {/* <a title="删除" onClick={()=> confirmDelUser(rec)}><Icon type="trash"/></a> */}
        </div>
      }
    }]

    const props = {
      columns,
      rowKey: 'sellerId',
      dataSource: list,
      loading: loading,
      pagination: _.extend({
        onChange(page){dispatch(fetchUsers({current: page}))}
      }, pagination)
    }

    return <Table {...props}/>
  }

  rederSelectRolesModal(){
    const {dispatch, selectRoles} = this.props
    if(!selectRoles.show) return null
    const {roles} = this.props
    const tableProps = {
      columns: [{
        title: 'ID',
        dataIndex: 'roleId'
      },{
        title: '角色名称',
        dataIndex: 'roleName'
      },{
        title: '描述',
        dataIndex: 'roleDescription'
      }],
      rowKey: 'roleId',
      dataSource: roles,
      pagination: false,
      rowSelection: {
        selectedRowKeys: selectRoles.roles,
        onChange(ids){
          dispatch(changeSelectedRoles(ids.filter(id=>_.isNumber(id))))
        }
      }
    }
    return <Modal
      visible={true}
      title='配置用户角色'
      confirmLoading={selectRoles.waiting}
      onOk={()=>dispatch(saveSelectRoles())}
      onCancel={()=>dispatch(closeSelectRoles())}
    >
      <Spin spinning={selectRoles.loading}>
        <Table {...tableProps}/>
      </Spin>
    </Modal>
  }


  componentDidMount(){
    this.props.dispatch(fetchUsers())
    this.props.dispatch(fetchRoles())
    this.props.dispatch(fetchDepts())
  }
}

export default connect(function(state) {
  return _.extend({}, state.users, {
    roles: state.roles.list
  })
})(Users);

function genDeptTree(data){
  const props = {
    title: data.deptName,
    key: data.deptId,
    value: data.deptId
  }
  return data.children ?
    <TreeNode {...props}>{data.children.map(item=>genDeptTree(item))}</TreeNode>
  :
    <TreeNode {...props}/>
}
