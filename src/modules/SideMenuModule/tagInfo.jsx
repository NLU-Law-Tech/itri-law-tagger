import React, { Component } from 'react'
import { connect } from 'react-redux'

let ACTION_TAGS = ['單位', '職稱', '身份', '法條']

export class tagInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentSelectWord: undefined,
            defendants: [],
            defendantsTagInfo: {},
            tagAction: ACTION_TAGS[0]
        }
    }

    static getDerivedStateFromProps(props, state) {
        let { SideMenuReducer = {}, TagReducer } = props.state,
            { defendants = [], currentSelectDefendant } = SideMenuReducer,
            { currentSelectWord } = TagReducer

        // console.log(defendants,state.defendants)
        if (typeof (currentSelectDefendant) !== 'undefined') {
            if (JSON.stringify(defendants) !== JSON.stringify(state.defendants)) {
                return { defendants }
            }
            if (JSON.stringify(currentSelectWord) !== JSON.stringify(state.currentSelectWord)) {
                // 檢查字典中是否已有初值，若無則新增
                let defendantsTagInfo = state.defendantsTagInfo
                for (let i = 0; i < defendants.length; i++) {
                    let defendant = defendants[i]
                    // console.log(defendant)
                    if (defendant in defendantsTagInfo !== true) {
                        defendantsTagInfo[`${defendant}`] = {}
                        ACTION_TAGS.forEach((ACTION_TAG) => {
                            defendantsTagInfo[`${defendant}`][`${ACTION_TAG}`] = []
                        })
                    }
                }

                // 檢查字典中是否有應該被刪除的
                for (let i = 0; i < Object.keys(defendantsTagInfo).length; i++) {
                    let key = Object.keys(defendantsTagInfo)[i]
                    console.log(key)
                    if (!defendants.includes(key)) {
                        delete defendantsTagInfo[`${key}`]
                    }
                }

                // 設定選擇的標記
                console.log(currentSelectWord, state.currentSelectWord)
                console.log("SET", state.tagAction, currentSelectDefendant, currentSelectWord)
                defendantsTagInfo[`${currentSelectDefendant}`][`${state.tagAction}`].push(currentSelectWord)


                console.log(defendantsTagInfo)
                return { ...defendantsTagInfo }
            }
        }

        return { currentSelectWord }
    }

    setTagAction = (tagAction) => {
        this.setState({
            tagAction
        })
    }

    render() {
        let { tagAction, defendantsTagInfo } = this.state
        let { state = {} } = this.props,
            { SideMenuReducer = {} } = state,
            { currentSelectDefendant } = SideMenuReducer

        console.log(this.props)
        let objectReady = Object.keys(defendantsTagInfo).length === 0 ? false : true
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
                                    <div key={index} className={`${tagAction === actionTag ? 'bg-light font-weight-bold' : ''}`}>
                                        {actionTag}

                                        <ul>
                                            {objectReady ?
                                                defendantsTagInfo[`${currentSelectDefendant}`][`${actionTag}`].map((option) => {
                                                    return <li><button>{option.val}</button></li>
                                                })
                                                : ''}                                            
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
