// import axios
import { initApp } from '../action'

export const submitTag = (tagWordObject)=>{
    return {
        type: 'TAG_CURRENT_SELECT_WORD',
        currentSelectWord:tagWordObject
    }
}

export const getUnlabelDoc = ()=>{
    let unlabelDoc = '福建高等法院金門分院刑事裁定　　　　　 100年度聲字第10號\n聲　請　人\n即　被　告　許丕燕\n上列聲請人即被告因違反毒品危害防制條例罪案件（本院99年度\n上重訴字第2 號違反毒品危害防制條例罪案件），聲請具保停止\n羈押，本院裁定如下：\n主  文\n聲請駁回。'
    return (dispatch)=>{
        dispatch(initApp())
        dispatch({type:"TAG_GET_UNLABEL_DOC_START"})
        setTimeout(()=>{
            dispatch({type:"TAG_GET_UNLABEL_DOC_SUCCESS",unlabelDoc})
        },1000)
    }
}