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

        // 被告變動
        let defendantsTagInfo = state.defendantsTagInfo
        if (defendants !== state.defendants) {
            // 檢查字典中是否已有初值，若無則新增
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
                // console.log(key)
                if (!defendants.includes(key)) {
                    delete defendantsTagInfo[`${key}`]
                }
            }
        }

        // 新選擇資訊進入
        if (typeof (currentSelectDefendant) !== 'undefined' && currentSelectWord !== state.currentSelectWord) {
            defendantsTagInfo[`${currentSelectDefendant}`][`${state.tagAction}`].push(currentSelectWord)
        }

        return {
            defendants: [...defendants],
            currentSelectWord,
            defendantsTagInfo,
            _props: props
        }
    }

    setTagAction = (tagAction) => {
        this.setState({
            tagAction
        })
    }

    delActionTagElement = (defendant, actionTag, val) => {
        let { defendantsTagInfo } = this.state
        defendantsTagInfo = defendantsTagInfo[`${defendant}`][`${actionTag}`].filter((option) => {
            return option.val !== val
        })
        this.setState({
            defendantsTagInfo
        })
    }

    render() {
        let { tagAction, defendantsTagInfo } = this.state
        let { state = {} } = this.props,
            { SideMenuReducer = {} } = state,
            { currentSelectDefendant } = SideMenuReducer

        return (
            <div className="card">
                {typeof (currentSelectDefendant) === 'undefined' ?
                    <div className="card-body">
                        <div className="card-title">
                            <b>請先選擇一名被告</b>
                        </div>
                    </div>
                    :
                    <div className="card-body">
                        <div className="card-title">
                            <b>標註資訊</b>
                            <br />
                            <small>標註被告:{currentSelectDefendant}</small>
                            <br />
                            <small>標註動作:{tagAction}</small>
                        </div>
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
                                            {defendantsTagInfo[`${currentSelectDefendant}`][`${actionTag}`].map((option, index) => {
                                                return <li key={index} onClick={() => this.delActionTagElement(currentSelectDefendant, actionTag, option.val)}><button>{option.val}</button></li>
                                            })}
                                        </ul>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
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
