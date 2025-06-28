const home={
   "lxt_part3": {
    "id": 1,
    "title": "数一数，连一连。",
    "flag": "t3",
    "imgU": [
      {
        "src": `${basePath}/lxt_u1.png`,
        "value": "2",
        "ownership": "U",
        "connected": false
      },
      {
        "src":`${basePath}/lxt_u2.png`,
        "value": "6",
        "ownership": "U",
        "connected": false
      },
      {
        "src":`${basePath}/lxt_u3.png`,
        "value": "4",
        "ownership": "U",
        "connected": false
      },
      {
        "src": `${basePath}/lxt_u4.png`,
        "value": "8",
        "ownership": "U",
        "connected": false
      }
    ],
    "imgD": [
      {
        "src": `${basePath}/lxt_d1.png`,
        "value": "6",
        "ownership": "D",
        "connected": false
      },
      {
        "src": `${basePath}/lxt_d2.png`,
        "value": "4",
        "ownership": "D",
        "connected": false
      },
      {
        "src": `${basePath}/lxt_d3.png`,
        "value": "8",
        "ownership": "D",
        "connected": false
      },
      {
        "src": `${basePath}/lxt_d4.png`,
        "value": "2",
        "ownership": "D",
        "connected": false
      }
    ],
    "isDrawing": false,
    "startItem": null,
    "endItem": null,
    "currentLine": { "x1": 0, "y1": 0, "x2": 0, "y2": 0 },
    "connections": [],
    "ctx": null,
    "backCtx": null,
    "canvasRect": null,
    "isDebug": true,
    "result": []
  },

    "sst": [
    {
      "id": 1,
      "title": { "image":`${basePath}/sst.png`, "count": 10 },
      "tuXingPath": `${basePath}/qingwa.png`,
      "userAnswer": ""
    },
    {
      "id": 2,
      "title": { "image": `${basePath}/sst.png`, "count": 9 },
      "tuXingPath": `${basePath}/heye.png`,
      "userAnswer": ""
    },
  ],

    "tkt": [
        {
            "id": 1,
            "title_main": "小动物排队去参加运动会。",
            "title": [
                "1.第一小题",
                "2.第二小题",
                "3.第三小题"
            ],
            "img": `${basePath}/tkt.png`,
            "subQuestions": [
                "（1）一共有TNUM只动物去参加运动会。",
                "（2）猴子排第一，大象排第TNUM，小兔排第TNUM。",
                "（3）从右边开始向左边数，小狗排第TNUM",
            ],
            "userAnswer": [
                {
                    "type": "simple",
                    "answers": [""]
                },
                {
                    "type": "simple",
                    "answers": ["",""]
                },
                {
                    "type": "simple",
                    "answers": [""]
                }
            ],
            "answers": [
                ["7"],
                ["3","7"],
                ['6']
            ]
        },
    ],

       "xzt": [
    {
      "id": 1,
      "title": "看图选数",
      "img": `${basePath}/xzt1.png`,
      "options": [
        { "value": "A", "label": "3" },
        { "value": "B", "label": "4" },
        { "value": "C", "label": "5" },
      ],
      "userAnswer": "",
      "answer": "C"
    },

     {
      "id": 2,
      "title": "看图选数",
      "img": `${basePath}/xzt2.png`,
      "options": [
        { "value": "A", "label": "2" },
        { "value": "B", "label": "3" },
        { "value": "C", "label": "4" },
      ],
      "userAnswer": "",
      "answer": "C"
    },

     {
      "id": 3,
      "title": "看图选数",
      "img": `${basePath}/xzt3.png`,
      "options": [
        { "value": "A", "label": "5" },
        { "value": "B", "label": "6" },
        { "value": "C", "label": "7" },
      ],
      "userAnswer": "",
      "answer": "B"
    },
  ],

}