import React, { Component } from 'react'
import SideMenuModule from './modules/SideMenuModule'
import TagModule from './modules/TagModule'

export class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <SideMenuModule />
          </div>
          <div className="col">
            <h3>itri law tagger</h3>
            <TagModule />
          </div>
        </div>
      </div>
    )
  }
}

export default App
