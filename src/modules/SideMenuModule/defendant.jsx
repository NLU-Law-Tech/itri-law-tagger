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
            isDelingDefendant: false,
            _props: {}
        }
    }

    delingDefendant = () => {
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

    setSelectDefendant = (defendant) => {
        let { dispatch } = this.props
        dispatch(setCurrentSelectDefendant(defendant))
    }

    static getDerivedStateFromProps(props, state) {
        let { dispatch } = props
        let { isAddingNewDefendant, currentSelectWord: stateCurrentSelectWord, selectNewDefendants } = state
        let { TagReducer = {} } = props.state
        // call by state
        if (props === state._props) {
            return {
                _props: props
            }
        }
        // call by props
        else {
            if (isAddingNewDefendant === true) {
                if (JSON.stringify(TagReducer.currentSelectWord) !== JSON.stringify(stateCurrentSelectWord)) {
                    if (!selectNewDefendants.includes(TagReducer.currentSelectWord.val)) {
                        selectNewDefendants.push(TagReducer.currentSelectWord.val)
                        dispatch(setDefendants(selectNewDefendants))
                        console.log(selectNewDefendants)
                        return {
                            isAddingNewDefendant: false,
                            selectNewDefendants: [...selectNewDefendants],
                            currentSelectWord: TagReducer.currentSelectWord
                        }
                    }
                }
            }

            return {
                isAddingNewDefendant: false,
                currentSelectWord: TagReducer.currentSelectWord,
                _props: props
            }

        }
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
                                <div key={selectNewDefendant}>
                                    {isDelingDefendant ?
                                        <button key={'del'} className="btn btn-sm btn-danger m-1" onClick={() => this.delDefendant(selectNewDefendant)}>{selectNewDefendant}</button>
                                        :
                                        <button key={'set'} className="btn btn-sm btn-info m-1" onClick={() => this.setSelectDefendant(selectNewDefendant)}>{selectNewDefendant}</button>
                                    }
                                    <br />
                                </div>
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
