import { initApp } from '../action'
const axios = require('axios');

export const submitTag = (tagWordObject) => {
    return {
        type: 'TAG_CURRENT_SELECT_WORD',
        currentSelectWord: tagWordObject
    }
}

export const getUnlabelDoc = () => {
    // let unlabelDoc = '福建高等法院金門分院刑事裁定　　　　　 100年度聲字第10號\n聲　請　人\n即　被　告　許丕燕\n上列聲請人即被告因違反毒品危害防制條例罪案件（本院99年度\n上重訴字第2 號違反毒品危害防制條例罪案件），聲請具保停止\n羈押，本院裁定如下：\n主  文\n聲請駁回。'
    return (dispatch) => {
        dispatch(initApp())
        dispatch({ type: "TAG_GET_UNLABEL_DOC_START" })
        axios.get("http://140.120.13.242:15004/unlabel_doc")
            .then((res) => {
                let { verdict, content_id = '' } = res.data
                console.log(res.data)
                verdict = JSON.parse(verdict)
                let { content } = verdict

                dispatch({
                    type: "TAG_GET_UNLABEL_DOC_SUCCESS",
                    unlabelDocId: content_id,
                    unlabelDoc: content,
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

        axios.post("http://140.120.13.242:15004/labeled_data",apiObject)
            .then((res)=>{
                console.log(res)
                dispatch({ type: "TAG_SAVE_LABELED_DATA_SUCCESS" })
            })
            .catch((error)=>{
                console.log(error)
            })
    }
}