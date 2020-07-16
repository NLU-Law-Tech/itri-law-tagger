const initialState = {
    currentSelectWord:{}
}

function Reducer(state = initialState, action) {
    switch (action.type) {
      case 'TAG_CURRENT_SELECT_WORD':
          return Object.assign({},state,{
            currentSelectWord:action.currentSelectWord
          })
      default:
        return state
    }
}
  
export default Reducer