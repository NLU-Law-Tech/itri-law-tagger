import React, { Component } from 'react'
import { connect } from 'react-redux'
export class tagInfo extends Component {
    render() {
        let { state = {} } = this.props,
            { SideMenuReducer = {} } = state,
            { currentSelectDefendant } = SideMenuReducer

        return (
            <div className="card">
                <div className="card-body">
                    <div className="card-title">
                        <b>標註資訊</b><br />
                        <small>當前標註:{currentSelectDefendant}</small>
                    </div>
                    {typeof (currentSelectDefendant) === 'undefined' ? '請先選擇一名被告' :
                        <div className="card-text">
                            <br />
                            <button>單位</button>
                            <button>職稱</button>
                            <button>身份</button>
                            <button>法條</button>
                            <hr />
                            <div>
                                單位
                <ul>
                                    <li>單位1</li>
                                    <li>單位2</li>
                                </ul>
                            </div>
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
