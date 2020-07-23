import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { saveLabeledData as saveLabledDataAction, submitTag, getUnlabelDoc } from './action'

const TagBlockFront = styled.pre`
    z-index:1;
    position: absolute;
    top:0px;
    background-color:rgba(0,0,0,0);
    font-size:${(props) => props.fontSize};
`

const TagBlockRear = styled.pre`
    z-index:-1;
    position: absolute;
    top:0px;
    font-size:${(props) => props.fontSize};
    & > mark{
        z-index:-1;
        padding: 0px;
        background-color: yellow;
    }
`

export class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fontSize: 18,
            cj_text: '',
            cj_text_hl: '',
            hightLightCJText: () => { }
        }
    }

    componentDidMount() {
        this.requestUnlabelDoc()
        //
        this.setState({
            requestUnlabelDoc: this.requestUnlabelDoc,
            saveLabeldData: this.saveLabeldData,
            getNextDoc: this.getNextDoc,
            hightLightCJText: this.hightLightCJText
        })
    }

    getNextDoc = () => {
        setTimeout(() => {
            window.location.reload()
        }, 500)
    }

    static getDerivedStateFromProps(props, state) {
        let { TagReducer = {}, MainReducer = {}, SideMenuReducer = {} } = props.state,
            { currentSelectDefendant = '' } = SideMenuReducer
        // { dispatch } = props
        // console.log(TagReducer)
        if (state.cj_text !== TagReducer.unlabelDoc) {
            return {
                // cj_text_hl: state.hightLightCJText(TagReducer.unlabelDoc),
                cj_text: TagReducer.unlabelDoc
            }
        }

        if (MainReducer.currentKeyDown !== state.currentKeyDown) {
            if (MainReducer.currentKeyDown === 's') {
                state.saveLabeldData()
            }
            if (MainReducer.currentKeyDown === 'n') {
                state.getNextDoc()
                // window.location.reload()
            }
        }

        return {
            currentKeyDown: MainReducer.currentKeyDown,
            cj_text_hl: state.hightLightCJText(state.cj_text, [currentSelectDefendant]),
        }
    }

    hightLightCJText = (cj_text, hlList = []) => {
        // console.log(cj_text)
        hlList.forEach((hlText) => {
            if (hlText !== '') {
                let re = new RegExp(hlText, "g");
                cj_text = cj_text.replace(re, `<mark>${hlText}</mark>`)
            }
        })
        return cj_text
    }

    saveLabeldData = () => {
        // eslint-disable-next-line
        let { dispatch } = this.props,
            { SideMenuReducer = {}, TagReducer = {} } = this.props.state,
            { defendantsTagInfo } = SideMenuReducer,
            { unlabelDocId = '' } = TagReducer
        console.log('save ->', defendantsTagInfo)
        if (unlabelDocId !== '' && Object.keys(defendantsTagInfo).length > 0) {
            dispatch(saveLabledDataAction(unlabelDocId, defendantsTagInfo))
        }
        else {
            alert("saveLabeldData error,rule not pass")
            console.warn("saveLabeldData error,rule not pass", unlabelDocId, defendantsTagInfo)
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
        let { cj_text, cj_text_hl, fontSize } = this.state
        // console.log(cj_text_hl)
        return (
            <div>
                <div>
                    <label htmlFor="">font-size:{fontSize}&nbsp;&nbsp;</label>
                    <button className="mr-1" onClick={() => { this.setFontSize(fontSize + 1) }}> + </button>
                    <button onClick={() => { this.setFontSize(fontSize - 1) }}> - </button>
                </div>
                <hr />
                <button className="mr-1" onClick={this.saveLabeldData}>儲存(s)</button>
                <button onClick={this.getNextDoc}>下一篇(n)</button>
                <hr />
                {cj_text === '' ?
                    <small>載入中</small>
                    :
                    <div style={{ position: 'relative' }}>
                        <TagBlockFront
                            fontSize={`${fontSize}px`}
                            onMouseUp={(e) => this.tagWords(e)}
                        >
                            {cj_text}
                        </TagBlockFront>
                        <TagBlockRear
                            fontSize={`${fontSize}px`}
                            onMouseUp={(e) => this.tagWords(e)}
                            dangerouslySetInnerHTML={{
                                __html: cj_text_hl
                            }}
                        />
                    </div>
                }
                <hr />
            </div >
        )
    }
}

let mapStateToProps = (state) => {
    return {
        state
    }
}

export default connect(mapStateToProps)(index)
