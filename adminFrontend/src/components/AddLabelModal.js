import React from 'react'
import _ from 'underscore'
import {Button, Form, Input, Row, Col, Modal, message, Tooltip, Table} from 'antd'
import Icon from 'cpn/Icon'

class AddLabelModal extends React.Component{
  render(){
    return (
      <Modal
        title={'标签管理'}
        visible={true}
        maskClosable={false}
        onCancel={this.props.onCancel}
        style={{top: '50px'}}
        footer={null}
        width="40%"
      >
        {this.renderLabelTabel()}
      </Modal>
    )
  }

  state={
    editting: null,
    formData: {}
  }

  changePosUp(id1){
    const {labelTabel,onChangePosLabel} = this.props
    let id2=null
    labelTabel.list.map((item,index)=>{
      if(item.id==id1){
        if(index!=0){
          id2=labelTabel.list[index-1].id;
        }
      }
    })
    if(id2!=null){
      onChangePosLabel(id1,id2)
    }else{
      message.warn("找不到上一条")
    }
  }

  changePosDown(id1){
    const {labelTabel,onChangePosLabel} = this.props
    let id2=null
    labelTabel.list.map((item,index)=>{
      if(item.id==id1){
        if(index+1<labelTabel.list.length){
          id2=labelTabel.list[index+1].id;
        }
      }
    })
    if(id2!=null){
      onChangePosLabel(id1,id2)
    }else{
      message.warn("找不到下一条")
    }
  }

  inputCheck(value){
    const {onSaveInput} = this.props
    onSaveInput(value.replace(/\D/g,''))
  }

  renderLabelTabel(){
    const {labelTabel,onSendDelLabel,intCheck} = this.props
    let pagination = _.clone(labelTabel.pagination)

    const {editting, formData} = this.state
    let labelList = _.clone(labelTabel.list)
    if(this.state.editting == labelList.length){
      labelList = labelList.concat({})

      pagination.total = parseInt(pagination.total)+1
      pagination.current = pagination.total%pagination.pageSize==0?parseInt(pagination.total/pagination.pageSize):(parseInt(pagination.total/pagination.pageSize)+1)
    }
    const getRender = col => (val, rec, i)=>{
      if(i!=editting) return val
      return <Input
        value={col=="value"&&intCheck!=null?intCheck.value:formData[col]}
        style={{width: '100px'}}
        onChange={e=>{
            if(col=="value"){
              this.inputCheck(e.target.value)
            }
            this.setState({formData: _.extend({}, formData, {[col]: col=="value"?e.target.value.replace(/\D/g,''):e.target.value})})
          }
        }
      />
    }

    const columns = [{
      title: '标签名称',
      dataIndex: 'name',
      width: '10%',
      render: getRender('name')
    },{
      title: '量化值',
      dataIndex: 'value',
      width: '10%',
      render: getRender('value')
    },{
      title: '排序',
      dataIndex: 'col3',
      width: '10%',
      render: (v, r, i) =>{
        const upBtn = <Tooltip title="向上">
          <Button size="small"
            onClick={()=>this.changePosUp(r.id)}
            disabled={i==0?true:false}
            >
            <Icon type="shang"/>
          </Button>
        </Tooltip>
        const downBtn = <Tooltip title="向下">
          <Button size="small"
            onClick={()=>this.changePosDown(r.id)}
            disabled={i==labelTabel.list.length-1?true:false}
            >
            <Icon type="xia"/>
          </Button>
        </Tooltip>

        return (i==editting ?
          <div>
          </div>
          :<span>
            {upBtn}&nbsp;{downBtn}
          </span>
        )
      }
    },{
      title: '操作',
      width: '10%',
      render: (v, r, i) =>{
        const delBtn = <Tooltip title="删除">
          <Button size="small"
            onClick={()=>onSendDelLabel(r.id)}
            >
            <Icon type="trasho"/>
          </Button>
        </Tooltip>

        return (i==editting ?
          <div>
            <Button size="small" onClick={this.save.bind(this)}>保存</Button>
            <Button size="small" onClick={this.cancelEdit.bind(this)}>取消</Button>
          </div>
          :<span>
            {delBtn}
          </span>
        )
      }
    }
    ];

    return (
      <Table columns={columns}
        dataSource={labelList}
        // 展示时带分页时的处理，配合添加的代码
        // pagination={{
        //   current: pagination.current,
        //   total: pagination.total,
        //   defaultPageSize: 10,
        //   showSizeChanger: true,
        //   pageSizeOptions: ['10', '20', '30', '40'],
        //   showQuickJumper: true
        // }}
        pagination = {false}
        loading={labelTabel.loading}
        footer={()=>
          <div>
            <Button onClick={()=>this.edit()}>
              <Icon type="plus"/> 添加标签
            </Button>
          </div>
        }
        onChange={this.handleTableChange.bind(this)}
      />
    );
  }

  handleTableChange(pagination){
    const {onRefersh} = this.props
    onRefersh(pagination)
  }

  save(){
    const {labelTabel,onSave,onRefersh} = this.props
    const param = _.extend({groupId: labelTabel.filter.groupId}, this.state.formData)
    onSave(
      param,
      err => {
        !err && this.setState({editting: null})
        onRefersh(labelTabel.pagination)
      }
    )
  }

  cancelEdit(){
    this.setState({editting: null})
  }

  edit(){
    if(_.isNumber(this.state.editting)){
      return message.warn('请先保存正在编辑的标签')
    }
    const {labelTabel} = this.props

    const {onRefersh} = this.props
    const pagination = labelTabel.pagination
    pagination.current = pagination.total%pagination.pageSize==0?parseInt(pagination.total/pagination.pageSize):(parseInt(pagination.total/pagination.pageSize)+1)
    if(pagination.current==0){
      pagination.current = 1
    }
    onRefersh(labelTabel.pagination,(err)=>{
      const {labelTabel} = this.props
      if(err) return
      this.setState({
        editting: labelTabel.list.length,
        formData: _.clone(labelTabel.list[labelTabel.list.length] || {})
      })
    })
  }

}

export default Form.create()(AddLabelModal)
