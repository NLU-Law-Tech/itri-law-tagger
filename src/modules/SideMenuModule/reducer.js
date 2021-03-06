const initialState = {
  currentSelectDefendant:undefined,
  defendants:[],
  defendantsTagInfo:{}
}

function Reducer(state = initialState, action) {
    switch (action.type) {
      case "INIT_APP":
        return Object.assign({},initialState)
      
      case "SIDE_MENU_UPDATE_DEFENDANTS_TAG_INFO":
        return Object.assign({},state,{
          defendantsTagInfo:action.defendantsTagInfo
        })

      case 'SIDE_MENU_SET_DEFENDANTS':
        return Object.assign({},state,{
          defendants:action.defendants
        })

      case 'SIDE_MENU_SET_CURRENT_SELECT_DEFENDANT':
        return Object.assign({},state,{
          currentSelectDefendant:action.defendant
        })

      default:
        return state
    }
}
  
export default Reducer