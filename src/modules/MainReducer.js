const initialState = {
    currentKeyDown:undefined
}

function Reducer(state = initialState, action) {
    switch (action.type) {
        case 'MAIN_SET_CURRENT_KEY_DOWN':
            return Object.assign({},state,{
                currentKeyDown:action.key
            })
        default:
            return state
    }
}

export default Reducer