const initialState = {
  currentSelectWord: {},
  unlabelDoc: ''
}

function Reducer(state = initialState, action) {
  switch (action.type) {
    case "INIT_APP":
        return Object.assign({},initialState)

    case 'TAG_CURRENT_SELECT_WORD':

      return Object.assign({}, state, {
        currentSelectWord: action.currentSelectWord
      })

    case "TAG_GET_UNLABEL_DOC_SUCCESS":
      return Object.assign({}, state, {
        unlabelDoc:action.unlabelDoc
      })
      
    default:
      return state
  }
}

export default Reducer