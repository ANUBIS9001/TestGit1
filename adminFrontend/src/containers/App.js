import _ from 'underscore'
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { connect } from 'react-redux'
import {Spin} from 'antd'
import Main from './Main'
import Login from './Login'
import Workbench from './Workbench'
import { Router } from 'react-router'
import {fetchMenu} from 'act/main'
import components from './'

class App extends React.Component{
  render(){
    const {needLogin, menuList} = this.props
    if(needLogin) return <Login/>
    if(menuList && menuList.length){
      const routes = _.pick(components, (c, key)=>
        menuList.find(item =>
          item.moduleDefine &&
          item.moduleDefine.toLowerCase().replace(/-/g,'') == key.toLowerCase()
        )
      )
      return (
        <Router history={this.props.history}>
          <Route path="/" component={Main} key="main">
            <IndexRoute component={Workbench} />
            <Route path="/workbench" component={Workbench}/>
            {_.map(routes, (c, k)=>
              <Route path={k.toLowerCase().replace(/-/g,'')} component={c} key={k}/>
            )}
          </Route>
        </Router>
      )
    }
    return <Spin size="large"><div style={{height: '300px'}} /></Spin>
  }

  componentDidMount(){
    this.props.dispatch(fetchMenu())
  }
}

export default connect(function mapStateToProps(state) {
  return {
    needLogin: state.main.needLogin,
    menuList: state.main.menuList
  }
})(App);
