import React, { Component } from 'react'
import styled from 'styled-components'


const TagBlock = styled.pre`
    font-size:${(props) => props.fontSize};
`

export class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fontSize: 18,
            // eslint-disable-next-line
            cj_text: '福建高等法院金門分院刑事裁定　　　　　 100年度聲字第10號\n\
聲　請　人\n\
即　被　告　許丕燕\n\
上列聲請人即被告因違反毒品危害防制條例罪案件（本院99年度\n\
上重訴字第2 號違反毒品危害防制條例罪案件），聲請具保停止\n\
羈押，本院裁定如下：\n\
主  文\n\
聲請駁回。'
        }
    }

    setFontSize = (newSize) => {
        this.setState({
            fontSize: newSize
        })
    }

    tagWords = (e) => {
        let selection = window.getSelection();
        let selectWord = selection.toString();
        let tag_start = selection.anchorOffset;
        let tag_end = selection.focusOffset - 1;
        let selectTag = {
            val:selectWord,
            tag_start,
            tag_end
        }
        console.log(selectTag)
    }

    render() {
        let { cj_text, fontSize } = this.state
        return (
            <div>
                <div>
                    <label htmlFor="">font-size:{fontSize}&nbsp;&nbsp;</label>
                    <button onClick={() => { this.setFontSize(fontSize + 1) }}>+</button>
                    <button onClick={() => { this.setFontSize(fontSize - 1) }}>-</button>
                </div>
                <hr />
                <button>下一篇(雙擊)</button>
                <button>儲存</button>
                <hr />
                <TagBlock
                    fontSize={`${fontSize}px`}
                    onMouseUp={(e) => this.tagWords(e)}
                >
                    {cj_text}
                </TagBlock>
                <hr />
            </div>
        )
    }
}

export default index
