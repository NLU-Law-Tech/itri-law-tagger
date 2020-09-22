import { initApp } from '../action'
import { setDefendants, updateDefendantsTagInfo } from '../SideMenuModule/action'

const axios = require('axios');

let API_SERVER = ''
if (process.env.NODE_ENV !== 'production') {
    API_SERVER = 'http://140.120.13.242:15004'
}
console.log('API_SERVER:', API_SERVER)

export const getPostionList = () => {
    return (dispatch) => {
        dispatch({
            type: 'TAG_GET_POSITION_LIST_START'
        })
        axios.get('https://gist.githubusercontent.com/p208p2002/c4a2094f756eba2fa0f132480bf387dd/raw/position_list.txt')
            .then((res) => {
                // console.log(res.data.split("\n"))
                dispatch({
                    type: 'TAG_GET_POSITION_LIST_SUCCESS',
                    positionList: Array.from(new Set(res.data.split("\n")))
                })
            })
            .catch((res) => {
                console.log(res)
                dispatch({
                    type: 'TAG_GET_POSITION_LIST_FAIL'
                })
            })
    }
}

export const getIdentityList = () => {
    return (dispatch) => {
        dispatch({
            type: 'TAG_GET_IDENTITY_LIST_START'
        })
        //https://gist.github.com/p208p2002/cbc21d9a3dd270ad95a5b209e62c1cac
        axios.get('https://gist.githubusercontent.com/p208p2002/cbc21d9a3dd270ad95a5b209e62c1cac/raw/identity_list.txt')
            .then((res) => {
                // console.log(res.data.split("\n"))
                dispatch({
                    type: 'TAG_GET_IDENTITY_LIST_SUCCESS',
                    identitylist: Array.from(new Set(res.data.split("\n")))
                })
            })
            .catch((res) => {
                console.log(res)
                dispatch({
                    type: 'TAG_GET_IDENTITY_LIST_FAIL'
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

export const delDoc = (doc_id) => {
    return (dispatch) => {
        axios.get(API_SERVER + '/del/' + doc_id)
            .then(() => {
                dispatch({
                    type: "TAG_DEL_DOC_SCUUESS"
                })
                alert('已撤銷')
                window.location.reload()
            })
            .catch(() => {
                dispatch({
                    type: "TAG_DEL_DOC_FAIL"
                })
            })
    }
}

export const getReLableDoc = () => {
    return (dispatch) => {
        dispatch(initApp())
        dispatch({ type: "TAG_GET_RELABEL_DOC_START" })
        axios.get(API_SERVER + "/relabel_doc")
            .then((res) => {
                let { verdict, content_id = '', labeled_data = [] } = res.data
                console.log(res.data)
                verdict = JSON.parse(verdict)
                let { judgement } = verdict

                dispatch({
                    type: "TAG_GET_RELABEL_DOC_SUCCESS",
                    unlabelDocId: content_id,
                    unlabelDoc: judgement,
                })

                let defendants = []
                labeled_data.forEach((ld) => {
                    let { name } = ld
                    defendants.push(name.content)
                })
                dispatch(setDefendants(defendants))

                let tagInfo = {}
                labeled_data.forEach((ld) => {
                    let { name, identities, laws, positions, units } = ld
                    // val tag_start tag_end
                    identities = identities.map((_id) => {
                        return {
                            val: _id.content,
                            tag_start: _id.start,
                            tag_end: _id.end
                        }
                    })

                    laws = laws.map((_id) => {
                        return {
                            val: _id.content,
                            tag_start: _id.start,
                            tag_end: _id.end
                        }
                    })

                    positions = positions.map((_id) => {
                        return {
                            val: _id.content,
                            tag_start: _id.start,
                            tag_end: _id.end
                        }
                    })

                    units = units.map((_id) => {
                        return {
                            val: _id.content,
                            tag_start: _id.start,
                            tag_end: _id.end
                        }
                    })


                    tagInfo[`${name.content}`] = {}
                    tagInfo[`${name.content}`]["單位"] = units
                    tagInfo[`${name.content}`]["職稱"] = positions
                    tagInfo[`${name.content}`]["身份"] = identities
                    tagInfo[`${name.content}`]["法條"] = laws

                    console.log(tagInfo)

                })
                dispatch(updateDefendantsTagInfo(tagInfo))

            })
            .catch((error) => {
                // console.log(error.response)
                let { response = {} } = error,
                    { status = -1 } = response
                if (status === 403) {
                    alert("無可標記文件")
                }
                else if (status === -1) {
                    alert("伺服器連線失敗")
                }
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
            .catch((error) => {
                // console.log(error.response)
                let { response = {} } = error,
                    { status = -1 } = response
                if (status === 403) {
                    alert("無可標記文件")
                }
                else if (status === -1) {
                    alert("伺服器連線失敗")
                }
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

        let api_labeled_data = []
        defendantsTagInfoKeys.forEach((key) => {
            console.log(defendantsTagInfo[`${key}`])

            // let ACTION_TAGS = ['單位', '職稱', '身份', '法條']
            let units = _changeObjectKey2Api(defendantsTagInfo[`${key}`][`${'單位'}`])
            let positions = _changeObjectKey2Api(defendantsTagInfo[`${key}`][`${'職稱'}`])
            let identities = _changeObjectKey2Api(defendantsTagInfo[`${key}`][`${'身份'}`])
            let laws = _changeObjectKey2Api(defendantsTagInfo[`${key}`][`${'法條'}`])

            api_labeled_data.push({
                name: {
                    content: key,
                    start: 0,
                    end: 0
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

        const parseUrl = require("parse-url")
        if (parseUrl(window.location.href).search === 'relabel=true') {
            axios.post(API_SERVER + "/relabeled_data", apiObject)
                .then((res) => {
                    console.log(res)
                    dispatch({ type: "TAG_SAVE_LABELED_DATA_SUCCESS" })
                    alert('已儲存')
                })
                .catch((error) => {
                    console.log(error)
                    alert('儲存失敗')
                })
        }
        else {
            axios.post(API_SERVER + "/labeled_data", apiObject)
                .then((res) => {
                    console.log(res)
                    dispatch({ type: "TAG_SAVE_LABELED_DATA_SUCCESS" })
                    alert('已儲存')
                })
                .catch((error) => {
                    console.log(error)
                    alert('儲存失敗')
                })

        }

    }
}
