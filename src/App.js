import React, { Component } from 'react'
import SideMenuModule from './modules/SideMenuModule'
import TagModule from './modules/TagModule'
import { connect } from 'react-redux'
import { setCurrentKeyDown } from './modules/action'

export class App extends Component {
  componentDidMount(){
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e)=>{
    console.log('KeyDown',e.key)
    let { dispatch } = this.props
    dispatch(setCurrentKeyDown(e.key))
    setTimeout(()=>{
      dispatch(setCurrentKeyDown(undefined))
    },0)
  }

  render() {
    return (
      <div className="container-fluid h-100">
        <div className="row" style={{height:'100%'}}>
          <div className="col-3" style={{height:'100%',overflowX:'hidden',overflowY:'scroll'}}>
          <h3 className='mt-3 mb-3 text-center'>
            ITRI Law-Tagger
            <br/>
            <small style={{fontSize:18}}><a target="_blank" rel="noopener noreferrer" href="https://hackmd.io/@cSqKkEHwT9GlCOqtNnxBQA/BJWZiDSlw">使用者指南</a></small>
            <br/>
            <small style={{fontSize:8}}><b>首次使用請詳閱指南</b></small>
            </h3>
            <SideMenuModule />
          </div>
          <div className="col"  style={{height:'100%',overflowX:'hidden',overflowY:'scroll'}}>
            <br/>
            <TagModule />
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(App)
