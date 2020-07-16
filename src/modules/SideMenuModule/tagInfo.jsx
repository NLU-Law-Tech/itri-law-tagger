import React, { Component } from 'react'
import { connect } from 'react-redux'

let ACTION_TAGS = ['單位', '職稱', '身份', '法條']

export class tagInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tagAction: ACTION_TAGS[0]
        }
    }

    setTagAction = (tagAction) => {
        this.setState({
            tagAction
        })
    }

    render() {
        let { tagAction } = this.state
        let { state = {} } = this.props,
            { SideMenuReducer = {} } = state,
            { currentSelectDefendant = "@@@" } = SideMenuReducer

        return (
            <div className="card">
                <div className="card-body">
                    <div className="card-title">
                        <b>標註資訊</b>
                        <br />
                        <small>標註被告:{currentSelectDefendant}</small>
                        <br />
                        <small>標註動作:{tagAction}</small>
                    </div>
                    {typeof (currentSelectDefendant) === 'undefined' ? '請先選擇一名被告' :
                        <div className="card-text">
                            {ACTION_TAGS.map((actionTag, index) => {
                                return <button key={index} className={`m-1 btn btn-sm btn-secondary ${tagAction === actionTag ? 'active' : ''}`} onClick={() => this.setTagAction(actionTag)}>{actionTag}</button>
                            })}
                            <hr />
                            {ACTION_TAGS.map((actionTag, index) => {
                                return (
                                    <div key={index} className={`${tagAction === actionTag?'bg-light font-weight-bold':''}`}>
                                        {actionTag}
                                        <ul>
                                            <li><button>單位1</button></li>
                                        </ul>
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        state
    }
}

export default connect(mapStateToProps)(tagInfo)
