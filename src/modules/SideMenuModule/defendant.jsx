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
            currentKeyDown: undefined,
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
        let{ dispatch } = this.props
        let { isAddingNewDefendant } = this.state
        this.setState({
            isAddingNewDefendant: !isAddingNewDefendant,
            isDelingDefendant: false
        })
        dispatch(setCurrentSelectDefendant(undefined))
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

        // hot key
        if(nextProps.state.MainReducer.currentKeyDown !== this.state.currentKeyDown){
            this.setState({
                currentKeyDown:nextProps.state.MainReducer.currentKeyDown
            })
            let key = nextProps.state.MainReducer.currentKeyDown
            if(key === 'a'){
                this.addingNewDefendant()
            }
            else if(key === 'd'){
                this.delingDefendant()
            }
            else if(!isNaN(parseInt(key))){
                try {
                    let selectDefendant = this.state.selectNewDefendants[parseInt(key)-1]
                    this.setSelectDefendant(selectDefendant)
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }

    render() {
        let { isAddingNewDefendant, isDelingDefendant, selectNewDefendants } = this.state
        let { SideMenuReducer={} } = this.props.state,
        {  currentSelectDefendant } = SideMenuReducer
        return (
            <div className="card">
                <div className="card-body">
                    <div className="card-title"><b>被告</b></div>
                    <div className="card-text">
                        <button onClick={this.addingNewDefendant}>新增被告(a)</button>
                        <button onClick={this.delingDefendant}>刪除被告(d)</button>
                        <br/>
                        {isAddingNewDefendant ? '拖曳選擇' : undefined}
                        {isDelingDefendant ? '點選刪除' : undefined}
                        <br />
                        <hr />
                        {selectNewDefendants.map((selectNewDefendant,index) => {
                            return (
                                <div key={selectNewDefendant}>
                                    {isDelingDefendant ?
                                        <button key={'del'} className="btn btn-sm btn-danger m-1" onClick={() => this.delDefendant(selectNewDefendant)}>{`${selectNewDefendant}(${index+1})`}</button>
                                        :
                                        <button key={'set'} className={`btn btn-sm btn-info m-1 ${currentSelectDefendant===selectNewDefendant?'active':''}`} onClick={() => this.setSelectDefendant(selectNewDefendant)}>{`${selectNewDefendant}(${index+1})`}</button>
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
