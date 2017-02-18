require('./LabelCard.less')
import React from 'react';

export default class LabelCard extends React.Component {
  render() {
    let className = this.props.className || ''
    className = 'xk-cpn-label-card ' + className
    return (
      <div className={className}>
        <div className="xk-cpn-label-card-inner">{this.props.children}</div>
        <i>{this.props.label}</i>
      </div>
    )
  }
}
