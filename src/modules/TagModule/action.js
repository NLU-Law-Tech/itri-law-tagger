export const submitTag = (tagWordObject)=>{
    return {
        type: 'TAG_CURRENT_SELECT_WORD',
        currentSelectWord:tagWordObject
    }
}