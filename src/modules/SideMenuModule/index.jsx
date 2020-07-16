import React, { Component } from 'react'
import Defendant from './defendant'
import TagInfo from './tagInfo'

export class index extends Component {
    render() {
        return (
            <>
                <br/>
                <Defendant/>
                <br />
                <TagInfo/>
            </>
        )
    }
}

export default index
