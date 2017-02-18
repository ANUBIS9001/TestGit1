import './EditProductModal.less'
import React from 'react'
import _ from 'underscore'
import {Button, Form, Input, Row, Col, Modal, message, Tooltip, Collapse, Radio, Upload, Icon} from 'antd'
const Panel = Collapse.Panel
const FormItem = Form.Item
const RadioGroup = Radio.Group
import Editor from 'cpn/Editor'
import AreaChooser from 'cpn/AreaChooser'

class EditProductModal extends React.Component{
  state = {
    tagIds: [],
    channels: [],
    areas: [],
    allowTry: '1'
  }
  render(){
    const {data, onOk, onCancel} = this.props
    return <Modal className="xk-modal-edit-product"
      visible={true}
      title={data ? '编辑产品' : '添加产品'}
      width="70%"
      onCancel={onCancel}
      onOk={()=>{
        const {tagIds, channels, areas} = this.state
        let channelsForSave = channels.filter(c => c.checked).map(c => {
          return c.ranges.map(r => _.extend({}, _.omit(c, 'ranges', 'edittingRange'), r, {priceDescription: c.priceDescription}))
        })
        channelsForSave = _.flatten(channelsForSave)
        this.props.form.validateFields((err, value) => {
          if(!err){
            onOk(_.extend({}, data, {
              tagIds,
              channels:channelsForSave,
              areas,
              status: data ? data.status : 1,
              productIntro: this.refs.introEditor.getDeltaJson()
            }, value))
          }
        })
      }}
    ><Form>
      <Collapse defaultActiveKey="1">
        <Panel header="产品基本信息" key="1">
          {this.renderBaseForm()}
        </Panel>
        <Panel header="渠道信息" key="2">
          {this.renderChanner()}
        </Panel>
        <Panel header="销售对象" key="3">
          {this.renderTagBox()}
        </Panel>
        <Panel header="销售地区" key="4">
          {this.renderAreaBox()}
        </Panel>
      </Collapse>
    </Form></Modal>
  }

  renderBaseForm(){
    const data = this.props.data || {}
    const gd = this.props.form.getFieldDecorator
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    }
    return <Form>
      <FormItem {...layout} label="产品名称">
        {gd('productName', {initialValue: data.productName, rules: [{required: true}]})(<Input />)}
      </FormItem>
      <FormItem {...layout} label="产品排序">
        {gd('orderId', {initialValue:data.orderId, rules: [{required: true}]})(<Input />)}
      </FormItem>
      <FormItem {...layout} label="产品类型">
        {gd('productType', {initialValue:data.productType+'', rules: [{required: true}]})(
          <RadioGroup>
            <Radio value="1">服务</Radio>
            <Radio value="2">实体</Radio>
            <Radio value="3">项目</Radio>
          </RadioGroup>
        )}
      </FormItem>
      <FormItem {...layout} label="允许试用">
        {gd('isTry', {initialValue:this.state.allowTry, rules: [{required: true}]})(
          <RadioGroup onChange={(e)=>this.setState({allowTry: e.target.value})}>
            <Radio value="1">是</Radio>
            <Radio value="0">否</Radio>
          </RadioGroup>
        )}
      </FormItem>
      {this.state.allowTry=='1' &&
        <FormItem {...layout} label="试用天数">
          {gd('tryDays', {initialValue:data.tryDays, rules: [{required: true}]})(<Input addonAfter="/30天"/>)}
        </FormItem>
      }
      <FormItem {...layout} label="产品负责人">
        {gd('contacts', {initialValue:data.contacts, rules: [{required: true}]})(<Input />)}
      </FormItem>
      <FormItem {...layout} label="联系方式">
        {gd('contactInfo', {initialValue:data.contactInfo, rules: [{required: true}]})(<Input />)}
      </FormItem>
      <FormItem {...layout} label="产品简介">
        <Editor ref="introEditor" initialValue={data.productIntro}/>
      </FormItem>
      <FormItem {...layout} label="附件">
        {gd('attachs')(
          <Upload {...this.getFileProps()}>
            <Button type="ghost">
              <Icon type="upload" /> 点击上传
            </Button>
          </Upload>
        )}
      </FormItem>
    </Form>
  }

  renderChanner(){
    const {channels} = this.state
    return <div className="channel-section">
      <Row className="header-row">
        <Col span={4} className="col-1">渠道</Col>
        <Col span={14} className="col-2">
          <Row className="line-1"><Col span={24}>提成信息</Col></Row>
          <Row className="line-2">
            <Col span={10}>到款区间</Col>
            <Col span={6}>新签提成比例</Col>
            <Col span={6}>续签提成比例</Col>
          </Row>
        </Col>
        <Col span={6} className="col-3">渠道价格说明</Col>
      </Row>
      {channels.map(c => {
        const getInputProps = (field) => {
          return {
            value: c.edittingRange[field],
            onChange: evt => {
              c.edittingRange[field] = evt.target.value
              this.setState({channels})
            },
            style: {
              // borderColor: c.edittingRange[field] ? '#ddd' : '#f30'
            }
          }
        }
        return <Row className="body-row">
          <Col span={4} className="col-1">
            <input type="checkbox" checked={c.checked} onChange={(evt)=>{
              c.checked = evt.target.checked
              this.setState({channels})
            }}/> {c.channelName}
          </Col>
          <Col span={14} className="col-2">{
            c.ranges.map(r =>
              <Row className="data-row">
                <Col span={10}>&yen;{r.returnBegin} 至 &yen;{r.returnEnd}</Col>
                <Col span={6}>{r.firstRate}%</Col>
                <Col span={6}>{r.afterRate}%</Col>
                <Col span={2} className="col-opt"><a onClick={()=>{
                  c.ranges = c.ranges.filter(item => item!=r)
                  this.setState({channels})
                }} style={{color: '#f30'}}><Icon type="minus-circle-o" /></a></Col>
              </Row>
            )}
            <Row>
              <Col span={4}>
                <Input {...getInputProps('returnBegin')} addonBefore="￥"/>
              </Col>
              <Col span={2} style={{textAlign: 'center'}}>至</Col>
              <Col span={4}>
                <Input {...getInputProps('returnEnd')} addonBefore="￥"/>
              </Col>
              <Col span={6}><Input {...getInputProps('firstRate')} addonAfter="%"/></Col>
              <Col span={6}><Input {...getInputProps('afterRate')} addonAfter="%"/></Col>
              <Col span={2} className="col-opt"><a onClick={()=>{
                const ce = c.edittingRange
                if(!(ce.returnBegin && ce.returnEnd && ce.firstRate && ce.afterRate)){
                  return message.warn('请填写完整的渠道提成信息')
                }
                c.ranges.push(c.edittingRange)
                c.edittingRange = {}
                c.checked = true
                this.setState({channels})
              }}><Icon type="plus-circle-o" /></a></Col>
            </Row>
          </Col>
          <Col span={3} className="col-3">
            <Upload
              multiple={false}
              name='file'
              action='/api/marketing/media/upload-file'
              showUploadList={false}
              onChange={(info)=>{
                if (info.file.status === 'done') {
                  message.success('渠道价格说明文件上传成功');
                  c.priceDescription = info.file.response.data
                  this.setState({channels})
                } else if (info.file.status === 'error') {
                  message.error('渠道价格说明文件上传失败');
                }
              }}
            >
              <Button type="ghost">
                <Icon type="upload" /> 上传
              </Button>
            </Upload>
          </Col>
          <Col span={3} className="col-3">
            {c.priceDescription &&
              <a href={"/api/marketing/media/download?key="+c.priceDescription} target="_blank">
                <Icon type="file" /> 查看文件
              </a>
            }
          </Col>
        </Row>
      })}
    </div>
  }

  renderTagBox(){
    const {tagGroupInUse} = this.props
    const tagIds = this.state.tagIds || []
    return <div className="tags-section">
      {tagGroupInUse.map(group =>
        <Row className="tag-group-row">
          <Col span={6} className="title-col">{group.name}</Col>
          <Col span={18} className="tags-col">
            {group.tags.map(tag =>
              <label>
                <input type="checkbox"
                  checked={!!tagIds.find(t => t == tag.id)}
                  onChange={evt=>{
                    const checked = evt.target.checked
                    const newTags = checked ? tagIds.concat(tag.id) : tagIds.filter(t => t!=tag.id)
                    this.setState({tagIds: newTags})
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
    return <AreaChooser value={this.state.areas} onChange={(data)=>this.setState({'areas': data})}/>
  }

  getFileProps(){
    const props = {
      name: 'file',
      action: '/api/marketing/media/upload-file',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    }
    return props
  }

  componentWillMount(){
    const {channelList, data} = this.props
    let channels = channelList
    let newState = {
      channels: channels.map(c=>_.extend({
        channelId: c.id,
        channelName: c.name,
        edittingRange: {}, ranges: []
      }))
    }
    if(data){
      newState.tagIds = data.tagIds
      newState.areas = data.areas
      newState.channels = channels.map(c=> {
        const ranges = data.channels.filter(dc => dc.channelId == c.id)
        return {
          channelId: c.id,
          channelName: c.name,
          checked: !!ranges.length,
          priceDescription: ranges[0] && ranges[0].priceDescription || '',
          ranges,
          edittingRange: {}
        }
      })
    }
    this.setState(newState)
  }
}

export default Form.create()(EditProductModal)
