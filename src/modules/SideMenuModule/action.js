export const setCurrentSelectDefendant = (defendant)=>{
    return{
        type:'SIDE_MENU_SET_CURRENT_SELECT_DEFENDANT',
        defendant
    }
}

export const setDefendants = (defendants)=>{
    return{
        type:'SIDE_MENU_SET_DEFENDANTS',
        defendants
    }
}

export const updateDefendantsTagInfo = (defendantsTagInfo)=>{
    return{
        type:"SIDE_MENU_UPDATE_DEFENDANTS_TAG_INFO",
        defendantsTagInfo
    }
}