# ITRI LAW-TAGGER
法律AI訓練、測試資料，答案標註系統

[使用者指南](https://hackmd.io/WeJJaoqrTKWH7d0HF5PRNQ)

### Backend
[seanbbear/itri_web_backend](https://github.com/seanbbear/itri_web_backend)
## Feature
- 拖移標記
- 關鍵字高亮
- 快捷鍵操作
- 完整標記資訊

## Demo
![](https://raw.githubusercontent.com/p208p2002/itri-law-tagger/master/demo.gif)
## Ouput Example
```
{
    "林家珍": {
        "單位": [],
        "職稱": [
            {
                "val": "約僱人員",
                "tag_start": 305,
                "tag_end": 308
            }
        ],
        "身份": [
            {
                "val": "公務員",
                "tag_start": 488,
                "tag_end": 490
            }
        ],
        "法條": []
    }
}
```