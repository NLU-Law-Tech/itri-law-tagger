// import { setDefendants } from './SideMenuModule/action'
export const initApp = ()=>{
    return (dispatch)=>{
        // dispatch(setDefendants([]))
        dispatch({type:"INIT_APP"})
        // window.location.reload()
    }
}
export const setCurrentKeyDown = (key)=>{
    return{
        type:'MAIN_SET_CURRENT_KEY_DOWN',
        key
    }
}