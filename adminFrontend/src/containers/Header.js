require('./Header.less')
import React from 'react'
import { connect } from 'react-redux'
import { Popconfirm, Icon, Breadcrumb } from 'antd'
import {logout} from 'act/login'

class Header extends React.Component{
  render(){
    const {sellerId} = this.props
    return (
      <div className="xk-main-header">
        <div className="left-title">管理系统</div>
        <div className="title-content">
          <Breadcrumb>
            {this.props.path.map((item, i) =>
              <Breadcrumb.Item key={i}>
                {item}
              </Breadcrumb.Item>
            )}
          </Breadcrumb>
          <div className="head-tools">
            {this.props.sellerName}
            &emsp;
            <Popconfirm
              placement="bottomRight"
              title="确定退出登录吗？"
              onConfirm={()=>this.props.dispatch(logout())}
            >
                <a><Icon type="logout"/></a>
            </Popconfirm>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(function mapStateToProps(state) {
  return {
    sellerId: state.main.profile.sellerId,
    sellerName: state.main.profile.sellerName,
    path: state.main.path,
  }
})(Header);
