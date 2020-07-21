import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { saveLabeledData as saveLabledDataAction, submitTag, getUnlabelDoc } from './action'

const TagBlock = styled.pre`
    font-size:${(props) => props.fontSize};
`

export class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fontSize: 18,
            cj_text: ''
        }
    }

    componentDidMount() {
        this.requestUnlabelDoc()
        //
        this.setState({
            requestUnlabelDoc: this.requestUnlabelDoc,
            saveLabeldData: this.saveLabeldData
        })
    }

    static getDerivedStateFromProps(props, state) {
        let { TagReducer = {}, MainReducer = {} } = props.state
        // { dispatch } = props
        // console.log(TagReducer)
        if (state.cj_text !== TagReducer.unlabelDoc) {
            return {
                cj_text: TagReducer.unlabelDoc
            }
        }

        if (MainReducer.currentKeyDown !== state.currentKeyDown) {
            if (MainReducer.currentKeyDown === 's') {
                state.saveLabeldData()
            }
            if (MainReducer.currentKeyDown === 'n') {
                // state.requestUnlabelDoc()
                window.location.reload()
            }
        }

        return {
            currentKeyDown: MainReducer.currentKeyDown
        }
    }

    saveLabeldData = () => {
        // eslint-disable-next-line
        let { dispatch } = this.props,
            { SideMenuReducer = {}, TagReducer = {} } = this.props.state,
            { defendantsTagInfo } = SideMenuReducer,
            { unlabelDocId = '' } = TagReducer
        console.log('save ->', defendantsTagInfo)
        if (unlabelDocId !== '' && Object.keys(defendantsTagInfo).length > 0) {
            dispatch(saveLabledDataAction(unlabelDocId,defendantsTagInfo))
        }
        else{
            console.warn("saveLabeldData error,rule not pass",unlabelDocId,defendantsTagInfo)
        }
    }

    requestUnlabelDoc = () => {
        let { dispatch } = this.props
        dispatch(getUnlabelDoc())
    }

    setFontSize = (newSize) => {
        this.setState({
            fontSize: newSize
        })
    }

    tagWords = (e) => {
        let { dispatch } = this.props
        let selection = window.getSelection();
        let selectWord = selection.toString();
        let tag_start = selection.anchorOffset;
        let tag_end = selection.focusOffset - 1;

        if (selectWord.length === 0) {
            return
        }

        if (tag_end < tag_start) {
            var _tmp = tag_end
            tag_end = tag_start
            tag_start = _tmp
        }

        let selectTag = {
            val: selectWord,
            tag_start,
            tag_end
        }
        console.log(selectTag)
        dispatch(submitTag(selectTag))
        this.cleanSelection()

    }

    cleanSelection = () => {
        if (window.getSelection) {
            if (window.getSelection().empty) {
                // Chrome
                window.getSelection().empty();
            } else if (window.getSelection().removeAllRanges) {
                // Firefox
                window.getSelection().removeAllRanges();
            }
        } else if (document.selection) {
            // IE?
            document.selection.empty();
        }
    }

    render() {
        let { cj_text, fontSize } = this.state
        return (
            <div>
                <div>
                    <label htmlFor="">font-size:{fontSize}&nbsp;&nbsp;</label>
                    <button className="mr-1" onClick={() => { this.setFontSize(fontSize + 1) }}> + </button>
                    <button onClick={() => { this.setFontSize(fontSize - 1) }}> - </button>
                </div>
                <hr />
                <button className="mr-1" onClick={this.saveLabeldData}>儲存(s)</button>
                <button onClick={() => window.location.reload()}>下一篇(n)</button>
                <hr />
                {cj_text === '' ?
                    <small>載入中</small>
                    :
                    <TagBlock
                        fontSize={`${fontSize}px`}
                        onMouseUp={(e) => this.tagWords(e)}
                    >
                        {cj_text}
                    </TagBlock>}
                <hr />
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        state
    }
}

export default connect(mapStateToProps)(index)
