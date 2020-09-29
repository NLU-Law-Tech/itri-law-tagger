import React, { Component } from 'react'
import { connect } from 'react-redux'

export class LocalUpload extends Component {
    constructor(props){
        super(props)
        this.inputOpenFileRef = React.createRef()
    }

    onFileChange = e => { 
        e.preventDefault()
        let { dispatch } = this.props
        const reader = new FileReader()
        const fileName = e.target.files[0].name
        reader.readAsText(e.target.files[0])
        reader.onload = async (e) => { 
          const text = (e.target.result)
          console.log(text)
          dispatch({
            type: "TAG_GET_UNLABEL_DOC_SUCCESS",
            unlabelDocId: fileName,
            unlabelDoc: text,
        })
        };
      }; 

    render() {
        return (
            <div>
                <h3>標註前請詳閱<a target="_blank" rel="noopener noreferrer" href="https://hackmd.io/@cSqKkEHwT9GlCOqtNnxBQA/BJWZiDSlw">使用者指南</a></h3>
                <hr/>
                <p>請上傳欲標記文檔</p>
                <input ref={this.inputOpenFileRef} type="file" accept=".txt" onChange={this.onFileChange }/>
            </div>
        )
    }
}

export default connect()(LocalUpload)
