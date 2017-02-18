import _ from 'underscore'
import React from 'react'
import {connect} from 'react-redux'
import {Button} from 'antd'

class Auth extends React.Component {
  render() {
    let {moduleId, tail, currentPage, children} = this.props
    if(!currentPage) return null
    if(_.isArray(children)) throw new Error('The component "Auth" can only has one child')
    if(!moduleId && tail){
      moduleId = currentPage.moduleId + '-' + tail
    }
    const hasRight = currentPage.children.find(item => item.moduleId == moduleId)
    return hasRight ? children : null
  }
}

Auth = connect(function(state) {
  return {currentPage: state.main.currentPage}
})(Auth);

export class AuthA extends React.Component {
  render(){
    const {moduleId, tail} = this.props
    const props = _.omit(this.props, 'moduleId', 'tail')
    return <Auth moduleId={moduleId} tail={tail}><a {...props}/></Auth>
  }
}

export class AuthButton extends React.Component {
  render(){
    const {moduleId, tail} = this.props
    const props = _.omit(this.props, 'moduleId', 'tail')
    return <Auth moduleId={moduleId} tail={tail}><Button {...props}/></Auth>
  }
}

export default Auth
