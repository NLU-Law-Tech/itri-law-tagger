const initialState = {
  currentSelectDefendant:undefined,
  defendants:[]
}

function Reducer(state = initialState, action) {
    switch (action.type) {
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