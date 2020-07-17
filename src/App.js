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
  }

  render() {
    return (
      <div className="container-fluid h-100">
        <div className="row" style={{height:'100%'}}>
          <div className="col-3" style={{height:'100%',overflowX:'hidden',overflowY:'scroll'}}>
          <h3 className='mt-3 text-center'>ITRI Law-Tagger</h3>
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
