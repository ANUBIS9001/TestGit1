// import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import './Editor.styl'
import _ from 'underscore'
import Quill from 'quill'
import React from 'react'

export default class Editor extends React.Component{
  render(){
    return <div className="xk-cpn-editor" style={this.props.sstyle || {}}><div ref="placer"/></div>
  }

  componentDidMount(){
    const {initialValue, onChange} = this.props
    const quill = this.quill = new Quill(this.refs.placer, _.omit(this.props, 'initialValue', 'onChange'))
    this.quill.on('text-change', ()=>{
      onChange(quill.getContents())
    })
    quill.setContents(this.stringToDelta(initialValue))
  }

  getDeltaJson(){
    return JSON.stringify(this.quill.getContents())
  }

  stringToDelta(str){
    if(!_.isString(str)) return str
    try{
      str = JSON.parse(str)
    }catch(e){

    }
    return str
  }
}

Editor.defaultProps = {
  onChange: function(){},
  theme: 'snow',
  modules: {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      // ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      // [{ 'direction': 'rtl' }],                         // text direction

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'align': [] }],
      ['image', 'code-block'],

      ['clean']
    ]
  }

}
