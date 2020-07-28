const initialState = {
  currentSelectWord: {},
  unlabelDoc: '',
  unlabelDocId: '',
  identitylist:[]
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
        unlabelDocId:action.unlabelDocId,
        unlabelDoc:action.unlabelDoc
      })
    
    case "TAG_GET_IDENTITY_LIST_SUCCESS":
      return Object.assign({},state,{
        identitylist:action.identitylist
      })
      
    default:
      return state
  }
}

export default Reducer