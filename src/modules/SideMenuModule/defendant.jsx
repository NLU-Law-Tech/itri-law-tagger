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

    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        let { props, state } = this,
            { dispatch } = props        

        if (state.isAddingNewDefendant === true && (props.state.TagReducer.currentSelectWord !== nextProps.state.TagReducer.currentSelectWord)) {
            state.selectNewDefendants.push(nextProps.state.TagReducer.currentSelectWord.val)
            dispatch(setDefendants(state.selectNewDefendants))
            this.setState({
                isAddingNewDefendant: false,
                selectNewDefendants:state.selectNewDefendants
            })
        }
    }

    render() {
        let { isAddingNewDefendant, isDelingDefendant, selectNewDefendants } = this.state
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
