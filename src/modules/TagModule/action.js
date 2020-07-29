import { initApp } from '../action'
const axios = require('axios');

let API_SERVER = ''
if (process.env.NODE_ENV !== 'production') {
    API_SERVER = 'http://127.0.0.1:15004'
}
console.log('API_SERVER:',API_SERVER)

export const getPostionList = ()=>{
    return (dispatch)=>{
        dispatch({
            type:'TAG_GET_POSITION_LIST_START'
        })
        axios.get('https://gist.githubusercontent.com/p208p2002/c4a2094f756eba2fa0f132480bf387dd/raw/7c6438869fefcbc9f1ddba3db9a70d15522aa18d/position_list.txt')
        .then((res)=>{
            // console.log(res.data.split("\n"))
            dispatch({
                type:'TAG_GET_POSITION_LIST_SUCCESS',
                positionList:Array.from(new Set(res.data.split("\n")))
            })
        })
        .catch((res)=>{
            console.log(res)
            dispatch({
                type:'TAG_GET_POSITION_LIST_FAIL'
            })
        })
    }
}

export const getIdentityList = ()=>{
    return (dispatch)=>{
        dispatch({
            type:'TAG_GET_IDENTITY_LIST_START'
        })
        //https://gist.github.com/p208p2002/cbc21d9a3dd270ad95a5b209e62c1cac
        axios.get('https://gist.githubusercontent.com/p208p2002/cbc21d9a3dd270ad95a5b209e62c1cac/raw/0cd26f68a66195b055e4c3dc8f08ed546eacb4dd/identity_list.txt')
        .then((res)=>{
            // console.log(res.data.split("\n"))
            dispatch({
                type:'TAG_GET_IDENTITY_LIST_SUCCESS',
                identitylist:Array.from(new Set(res.data.split("\n")))
            })
        })
        .catch((res)=>{
            console.log(res)
            dispatch({
                type:'TAG_GET_IDENTITY_LIST_FAIL'
            })
        })
    }
}

export const submitTag = (tagWordObject) => {
    return {
        type: 'TAG_CURRENT_SELECT_WORD',
        currentSelectWord: tagWordObject
    }
}

export const delDoc = (doc_id)=>{
    return (dispatch)=>{ 
        axios.get(API_SERVER + '/del/'+doc_id)
        .then(()=>{
            dispatch({
                type:"TAG_DEL_DOC_SCUUESS"
            })
            alert('已撤銷')
            window.location.reload()
        })
        .catch(()=>{
            dispatch({
                type:"TAG_DEL_DOC_FAIL"
            })
        })
     }
}

export const getUnlabelDoc = () => {
    // let unlabelDoc = '福建高等法院金門分院刑事裁定　　　　　 100年度聲字第10號\n聲　請　人\n即　被　告　許丕燕\n上列聲請人即被告因違反毒品危害防制條例罪案件（本院99年度\n上重訴字第2 號違反毒品危害防制條例罪案件），聲請具保停止\n羈押，本院裁定如下：\n主  文\n聲請駁回。'
    return (dispatch) => {
        dispatch(initApp())
        dispatch({ type: "TAG_GET_UNLABEL_DOC_START" })
        axios.get(API_SERVER + "/unlabel_doc")
            .then((res) => {
                let { verdict, content_id = '' } = res.data
                console.log(res.data)
                verdict = JSON.parse(verdict)
                let { judgement } = verdict

                dispatch({
                    type: "TAG_GET_UNLABEL_DOC_SUCCESS",
                    unlabelDocId: content_id,
                    unlabelDoc: judgement,
                })
            })
    }
}

const _changeObjectKey2Api = (oriObjects) => {
    return oriObjects.map((oriObject) => {
        return {
            content: oriObject.val,
            start: oriObject.tag_start,
            end: oriObject.tag_end
        }
    })
}

export const saveLabeledData = (unlabelDocId, defendantsTagInfo) => {
    console.log(unlabelDocId, defendantsTagInfo)
    return (dispatch) => {
        dispatch({ type: "TAG_SAVE_LABELED_DATA_START" })
        let defendantsTagInfoKeys = Object.keys(defendantsTagInfo)

        let api_labeled_data =[]
        defendantsTagInfoKeys.forEach((key) => {
            console.log(defendantsTagInfo[`${key}`])

            // let ACTION_TAGS = ['單位', '職稱', '身份', '法條']
            let units = _changeObjectKey2Api(defendantsTagInfo[`${key}`][`${'單位'}`])
            let positions = _changeObjectKey2Api(defendantsTagInfo[`${key}`][`${'職稱'}`])
            let identities = _changeObjectKey2Api(defendantsTagInfo[`${key}`][`${'身份'}`])
            let laws = _changeObjectKey2Api(defendantsTagInfo[`${key}`][`${'法條'}`])
            
            api_labeled_data.push({
                name:{
                    content: key,
                    start:0,
                    end:0
                },
                units,
                positions,
                identities,
                laws
            })
        })

        let apiObject = {
            doc_id: unlabelDocId,
            labeled_data: api_labeled_data
        }
        console.log(apiObject)

        axios.post(API_SERVER + "/labeled_data",apiObject)
            .then((res)=>{
                console.log(res)
                dispatch({ type: "TAG_SAVE_LABELED_DATA_SUCCESS" })
                alert('已儲存')
            })
            .catch((error)=>{
                console.log(error)
                alert('儲存失敗')
            })
    }
}