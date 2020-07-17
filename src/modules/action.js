export const initApp = ()=>{
    return {
        type:"INIT_APP"
    }
}
export const setCurrentKeyDown = (key)=>{
    return{
        type:'MAIN_SET_CURRENT_KEY_DOWN',
        key
    }
}