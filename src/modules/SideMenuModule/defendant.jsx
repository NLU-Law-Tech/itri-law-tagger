import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setCurrentSelectDefendant, setDefendants } from './action'

export class defendant extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isAddingNewDefendant: false,
            currentSelectWord: {},
            selectNewDefendants: [],
            isDelingDefendant: false
        }
    }

    delingDefendant = ()=>{
        let { isDelingDefendant } = this.state
        this.setState({
            isDelingDefendant: !isDelingDefendant,
            isAddingNewDefendant: false
        })
    }

    addingNewDefendant = () => {
        let { isAddingNewDefendant } = this.state
        this.setState({
            isAddingNewDefendant: !isAddingNewDefendant,
            isDelingDefendant: false
        })
    }

    delDefendant = (selectNewDefendant) => {
        let { dispatch } = this.props
        let { selectNewDefendants } = this.state
        selectNewDefendants = selectNewDefendants.filter((defendant) => {
            return defendant !== selectNewDefendant
        })
        this.setState({
            selectNewDefendants
        })
        dispatch(setCurrentSelectDefendant(undefined))
        dispatch(setDefendants(selectNewDefendants))
    }

    setSelectDefendant = (defendant)=>{
        let { dispatch } = this.props
        dispatch(setCurrentSelectDefendant(defendant))
    }


    static getDerivedStateFromProps(props, state) {
        let { dispatch } = props
        let { isAddingNewDefendant, currentSelectWord: stateCurrentSelectWord, selectNewDefendants } = state
        let { TagReducer = {} } = props.state,
            { currentSelectWord: tagCurrentSelectWord } = TagReducer

        if (isAddingNewDefendant === true) {
            if (tagCurrentSelectWord !== stateCurrentSelectWord) {
                selectNewDefendants.push(tagCurrentSelectWord.val)
                dispatch(setDefendants(selectNewDefendants))
                return Object.assign(state, {
                    isAddingNewDefendant: false,
                    selectNewDefendants,
                    currentSelectWord: tagCurrentSelectWord
                })
            }
        }

        return Object.assign(state, {
            currentSelectWord: tagCurrentSelectWord
        })
    }

    render() {
        let { isAddingNewDefendant, isDelingDefendant, selectNewDefendants } = this.state
        // { val:currentSelectWordVal } = currentSelectWord
        // console.log(currentSelectWordVal)
        return (
            <div className="card">
                <div className="card-body">
                    <div className="card-title"><b>被告</b></div>
                    <div className="card-text">
                        <button onClick={this.addingNewDefendant}>新增被告(A)</button>
                        <button onClick={this.delingDefendant}>刪除被告</button>
                        {isAddingNewDefendant ? '拖曳選擇' : undefined}
                        {isDelingDefendant ? '點選刪除' : undefined}
                        <br />
                        <hr />
                        {selectNewDefendants.map((selectNewDefendant) => {
                            return (
                                <React.Fragment key={selectNewDefendant}>
                                    {isDelingDefendant?
                                    <button className="btn btn-sm btn-danger m-1" onClick={()=>this.delDefendant(selectNewDefendant)}>{selectNewDefendant}</button>
                                    :
                                    <button className="btn btn-sm btn-info m-1" onClick={()=>this.setSelectDefendant(selectNewDefendant)}>{selectNewDefendant}</button>
                                    }
                                    <br />
                                </React.Fragment>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

let mapStateToPtops = (state) => {
    return {
        state
    }
}

export default connect(mapStateToPtops)(defendant)
