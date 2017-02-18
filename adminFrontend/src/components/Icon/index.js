/**
 * 字体图标组件
 * 字体来源于http://iconfont.cn/
 * 所有字体可在iconfont.cn自己定制，下载字体包后，把所有文件拷贝到该目录，覆盖原来的文件，
 * 将iconfont.css中的@font-face改为：
     @font-face {
       font-family: "iconfont";
       src: url('iconfont.woff') format('woff');
     }
 * 在.iconfont中添加：
     font-size:1.25em;
     line-height: 1em;
 */

import './iconfont.css'
import React from 'react'

export default class Icon extends React.Component {
  static defaultProps = {
    className: '',
    style: {}
  };
  render() {
    const { type, className, style } = this.props;
    return (
      <i className={`${className} iconfont icon-${type}`.trim()} style={style} />
    );
  }
}
