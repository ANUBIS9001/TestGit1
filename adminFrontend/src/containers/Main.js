import './Main.less'
import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router'
import { Menu} from 'antd';
import Header from './Header'
const SubMenu = Menu.SubMenu;
import {fetchProfile} from 'act/main'

class Main extends React.Component{
  render(){
    return (
      <div className="xk-main-wrapper">
        <Header/>
        <div className="main-body">
          <div className="main-sidebar">
            {this.renderMenu()}
          </div>
          <div className="main-content">
            <div className="inner">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderMenu(){
    function makeMenu(item){
      if(item.moduleType=='mod'){
        return (
          <SubMenu key={item.moduleId} title={item.moduleName}>
            {item.children.map(makeMenu)}
          </SubMenu>
        )
      }else{
        return (
          <Menu.Item key={item.moduleDefine.toLowerCase()}>
            <Link to={'/'+item.moduleDefine.toLowerCase()}>{item.moduleName}</Link>
          </Menu.Item>
        )
      }
    }
    const menuComp = this.props.menu.map(makeMenu)
    return <Menu theme="dark" mode="inline" selectedKeys={[this.props.selectedMenuKey]}>{menuComp}</Menu>
  }

  componentDidMount(){
    this.props.dispatch(fetchProfile())
  }
}

export default connect(function mapStateToProps(state) {
  return {
    menu: state.main.menu,
    selectedMenuKey: state.main.selectedMenuKey
  }
})(Main);
