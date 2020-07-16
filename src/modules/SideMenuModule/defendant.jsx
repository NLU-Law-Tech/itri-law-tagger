import React, { Component } from 'react'
import { connect } from 'react-redux'

export class defendant extends Component {
    constructor(props){
        super(props)
        this.state = {
            isAddingNewDefendant: false,
            currentSelectWord:{},
            selectNewDefendant:undefined
        }
    }

    addingNewDefendant = ()=>{
        let { isAddingNewDefendant } = this.state
        this.setState({
            isAddingNewDefendant:!isAddingNewDefendant
        })
    }


    static getDerivedStateFromProps(props, state){
        let { isAddingNewDefendant,currentSelectWord:stateCurrentSelectWord } = state
        let { TagReducer={} } = props.state,
        { currentSelectWord:tagCurrentSelectWord } = TagReducer
        
        if(isAddingNewDefendant === true){
            if(tagCurrentSelectWord !== stateCurrentSelectWord){
                return Object.assign({},state,{
                    isAddingNewDefendant:false,
                    selectNewDefendant:tagCurrentSelectWord.val,
                    currentSelectWord:tagCurrentSelectWord
                })
            }
        }

        return Object.assign({},state,{
            currentSelectWord:tagCurrentSelectWord
        })
    }

    render() {
        let { isAddingNewDefendant,selectNewDefendant } = this.state
        // { val:currentSelectWordVal } = currentSelectWord
        // console.log(currentSelectWordVal)
        return (
            <div className="card">
                <div className="card-body">
                    <div className="card-title">被告</div>
                    <div className="card-text">
                        <button onClick={this.addingNewDefendant}>新增被告</button>
                        {isAddingNewDefendant?'拖曳選擇':''}
                        <br/>
                        <hr/>
                        :
                        {selectNewDefendant}

                        <hr />
                        <button>被告A</button>
                        <button>被告B</button>
                        <button>被告C</button>
                    </div>
                </div>
            </div>
        )
    }
}

let mapStateToPtops = (state)=>{
    return {
        state
    }
}

export default connect(mapStateToPtops)(defendant)
