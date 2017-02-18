/*eslint no-console:0 */
require('./CustomerTag.less')
import _ from 'underscore'
import React from 'react'
import { connect } from 'react-redux'
import {Modal, Button, Input, Tooltip, Table, message} from 'antd'
import LabelCard from 'cpn/LabelCard'
import Icon from 'cpn/Icon'
import {
  getData,setFilter,clear,sendAddSection,sendDelSection,selectedlist,resetSelected,
  getData_label,setFilter_label,clear_label,resetFilter_label,sendDelLabel,saveLabel,saveInput,
  showAdd,closeAdd,showEditLabel,closeEditLabel
} from '../actions/customertag'
import AddLabelSectionModal from '../components/AddLabelSectionModal'
import AddLabelModal from '../components/AddLabelModal'

class CustomerTag extends React.Component {

  render(){
    return (
      <div className="xk-page-customertag">
        {this.renderFilterBar()}
        {this.renderTable()}
        {this.renderAddModal()}
        {this.renderEditLabelModal()}
      </div>
    )
  }

  renderAddModal(){
    const {dispatch,dispalyingAdd,labelSection} = this.props
    if(dispalyingAdd){
      return  <AddLabelSectionModal
                pagination={labelSection.pagination}
                onCancel={()=>dispatch(closeAdd())}
                onOk={(values,pagination)=>dispatch(sendAddSection(values,pagination))}
              />
    }
  }

  renderEditLabelModal(){
    const {dispatch,displayingEditLabel,labelTabel,intCheck} = this.props
    if(displayingEditLabel){
      return  <AddLabelModal
                labelTabel={labelTabel}
                onSendDelLabel={(values)=>this.delLabel(values)}
                onCancel={()=>dispatch(closeEditLabel())}
                onSave={(values,cb)=>dispatch(saveLabel(values,cb))}
                onRefersh={(pagination,cb)=>dispatch(getData_label(pagination,cb))}
                onChangePosLabel = {(id1,id2)=>this.changePosLabel(id1,id2)}
                onSaveInput={(value)=>dispatch(saveInput(value))}
                intCheck = {intCheck}
              />
    }
  }

  changePosLabel(id1,id2){
    const {dispatch} = this.props
    dispatch(setFilter_label("id1",id1))
    dispatch(setFilter_label("id2",id2))
    dispatch(getData_label())
  }

  delLabel(values){
    const {dispatch} = this.props
    Modal.confirm({
      title: '确认删除',
      content: <div>
        确定要删除标签？
      </div>,
      onOk:()=>dispatch(sendDelLabel({id:values}))
    })
  }

  renderFilterBar(){
    const {dispatch, labelSection} = this.props
    const getProps = (field, searchNow) => {
      return {
      value: labelSection.filter[field],
      onChange: val => {
        dispatch(setFilter(field, _.isString(val) ? val : val.target.value))
        searchNow && this.handleSearch()
      }
    }}
    return (
      <div>
      <LabelCard inline className="searchbar" label="筛选条件">
        <div className="filters-ctn">
          <label>
            <Tooltip title="请输入标签名称">
              <Input ref="t" placeholder="搜索标签名称" style={{width:'200px'}} {...getProps('name')} onPressEnter={this.handleSearch.bind(this)} />
            </Tooltip>
          </label>
          <Button type="primary" onClick={this.handleSearch.bind(this)}>搜索</Button>
        </div>
      </LabelCard>
      <br/>
      <Button type="primary" onClick={()=>dispatch(showAdd())}>
        <Icon type='jia1'/> 添加标签分类
      </Button>&nbsp;&nbsp;&nbsp;&nbsp;
      <Button type="primary" onClick={()=>this.multiDel()}>
        <Icon type='trash'/> 删除标签
      </Button>
    </div>
    )
  }

  renderTable(){
    const {dispatch,labelSection} = this.props
    const columns = [{
      title: '标签分类ID',
      dataIndex: 'id',
      width: '10%',
      render(text, rec){
        return rec.id
      }
    },{
      title: '标签分类名称',
      dataIndex: 'name',
      width: '10%',
      render(text, rec){
        return rec.name
      }
    },{
      title: '分类标识',
      dataIndex: 'classification',
      width: '10%',
      render(text, rec){
        return rec.classification
      }
    },{
      title: '分类描述',
      dataIndex: 'description',
      width: '20%',
      render(text, rec){
        return rec.description
      }
    },{
      title: '创建人',
      dataIndex: 'creator',
      width: '10%',
      render(text, rec){
        return rec.creator
      }
    },{
      title: '创建时间',
      dataIndex: 'createTime',
      width: '20%',
      render(text, rec){
        return rec.createTime
      }
    },{
      title: '排序',
      width: '10%',
      render: this.renderOrderCol.bind(this)
    },{
      title: '操作',
      width: '10%',
      render: this.renderOptCol.bind(this)
    }
    ];

    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys:selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        const ids = _.pluck(selectedRows, 'id')
        dispatch(resetSelected())
        dispatch(selectedlist("id",ids))
        this.setState({ selectedRowKeys:selectedRowKeys });
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
        const ids = _.pluck(selectedRows, 'id')
        dispatch(resetSelected())
        dispatch(selectedlist("id",ids))
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
        const ids = _.pluck(selectedRows, 'id')
        dispatch(resetSelected())
        dispatch(selectedlist("id",ids))
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',
      }),
    };
    return (
      <Table columns={columns}
        rowSelection={rowSelection}
        dataSource={labelSection.list}
        // pagination={{
        //   current: labelSection.pagination.current,
        //   total: labelSection.pagination.total,
        //   defaultPageSize: 10,
        //   showSizeChanger: true,
        //   pageSizeOptions: ['10', '20', '30', '40'],
        //   showQuickJumper: true
        // }}
        pagination={false}
        loading={labelSection.loading}
        onChange={this.handleTableChange.bind(this)}
      />
    );
  }

  renderOrderCol(text, rec, i){
    const {labelSection} = this.props

    const upBtn = <Tooltip title="向上">
      <Button size="small"
        onClick={()=>this.changePosUp(rec.id)}
        disabled={i==0?true:false}
        >
        <Icon type="shang"/>
      </Button>
    </Tooltip>

    const downBtn = <Tooltip title="向下">
      <Button size="small"
        onClick={()=>this.changePosDown(rec.id)}
        disabled={i==labelSection.list.length-1?true:false}
        >
        <Icon type="xia"/>
      </Button>
    </Tooltip>

    return (
      <span>
        {upBtn}&nbsp;{downBtn}
      </span>
    )
  }

  changePosUp(id1){
    const {dispatch,labelSection} = this.props
    let id2=null
    labelSection.list.map((item,index)=>{
      if(item.id==id1){
        if(index!=0){
          id2=labelSection.list[index-1].id;
        }
      }
    })
    if(id2!=null){
      // dispatch(clear())
      dispatch(setFilter("id1",id1))
      dispatch(setFilter("id2",id2))
      dispatch(getData())
    }else{
      message.warn("找不到上一条")
    }
  }

  changePosDown(id1){
    const {dispatch,labelSection} = this.props
    let id2=null
    labelSection.list.map((item,index)=>{
      if(item.id==id1){
        if(index+1<labelSection.list.length){
          id2=labelSection.list[index+1].id;
        }
      }
    })
    if(id2!=null){
      // dispatch(clear())
      dispatch(setFilter("id1",id1))
      dispatch(setFilter("id2",id2))
      dispatch(getData())
    }else{
      message.warn("找不到下一条")
    }
  }

  renderOptCol(text, rec){
    const {dispatch,labelSection} = this.props

    const editBtn = <Tooltip title="编辑">
      <Button size="small"
        onClick={()=>{
          dispatch(clear_label())
          resetFilter_label()
          dispatch(setFilter_label("groupId",rec.id))
          dispatch(getData_label())
          dispatch(showEditLabel())}
        }
        >
        <Icon type="pencilsquareo"/>
      </Button>
    </Tooltip>

    const delBtn = <Tooltip title="删除">
      <Button size="small"
        onClick={()=>this.del(rec)}
        >
        <Icon type="trasho"/>
      </Button>
    </Tooltip>

    return (
      <span>
        {editBtn}&nbsp;{delBtn}
      </span>
    )
  }

  del(rec){
    const {dispatch,labelSection} = this.props
    Modal.confirm({
      title: '确认删除',
      content: <div>
        确定要删除标签分类 <b>{rec.id}</b> 吗？
      </div>,
      onOk:()=>dispatch(sendDelSection({id:rec.id},labelSection.pagination))
    })
  }

  multiDel(){
    const {dispatch,labelSection} = this.props
    Modal.confirm({
      title: '确认删除',
      content: <div>
        确定要删除这些标签分类吗？
      </div>,
      onOk:()=>{
        dispatch(sendDelSection({id:labelSection.selected.id},labelSection.pagination))
        this.refresh()
      }
    })
  }

  state={
      selectedRowKeys: []
  }

  refresh(){
    this.setState({
        selectedRowKeys: []
    });
  }

  handleTableChange(pagination){
    const {dispatch} = this.props
    dispatch(getData(pagination))
  }

  handleSearch(){
    const {dispatch} = this.props
    this.props.dispatch(getData())
  }

  componentDidMount() {
    const {dispatch} = this.props
    dispatch(clear())
    dispatch(getData())
  }
}

export default connect(function(state) {
  return _.clone(state.customertag)
})(CustomerTag);
