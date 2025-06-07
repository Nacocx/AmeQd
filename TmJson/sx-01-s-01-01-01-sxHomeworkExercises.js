const home={
  "xzt": [
    {
      "id": 1,
      "title": "下面哪幅图与其他三张不同?",
      "options": [
        { "value": "A", "img": `${basePath}/xzt1_A.png` },
        { "value": "B", "img": `${basePath}/xzt1_B.png` },
        { "value": "C", "img": `${basePath}/xzt1_C.png` },
        { "value": "D", "img": `${basePath}/xzt1_D.png` }
      ],
      "userAnswer": "",
      "answer": "C"
    },
    {
      "id": 2,
      "title": "一个小猴吃一个香蕉，要选哪一堆呢?",   
      "img": `${basePath}/xzt2_timu.png`,
      "options": [
        { "value": "A", "img": `${basePath}/xzt2_A.png` },
        { "value": "B", "img": `${basePath}/xzt2_B.png` },
        { "value": "C", "img": `${basePath}/xzt2_C.png` }
      ],
      "userAnswer": "",
      "answer": "B"
    },
    {
      "id": 3,
      "title": "选择数量为 “5” 的动物。",

      "options": [
        { "value": "A", "img": `${basePath}/xzt3_A.png` },
        { "value": "B", "img": `${basePath}/xzt3_B.png` },
        { "value": "C", "img": `${basePath}/xzt3_C.png` },
        { "value": "D", "img": `${basePath}/xzt3_D.png` }
      ],
      "userAnswer": "",
      "answer": "A"
    }
  ],
      "sst": [
    {
      "id": 1,
      "title": { "image": `${basePath}/sst_1.png`, "count": 5 },
      "tuXingPath": `${basePath}/sst_circle.png`,
      "userAnswer": ""
    },
    {
      "id": 2,
      "title": { "image": `${basePath}/sst_2.png`, "count": 1 },
      "tuXingPath": `${basePath}/sst_circle.png`,
      "userAnswer": ""
    },
    {
      "id": 3,
      "title": { "image": `${basePath}/sst_3.png`, "count": 2 },
      "tuXingPath": `${basePath}/sst_circle.png`,
      "userAnswer": ""
    },
    {
      "id": 4,
      "title": { "image": `${basePath}/sst_4.png`, "count": 4 },
      "tuXingPath": `${basePath}/sst_circle.png`,
      "userAnswer": ""
    },
    {
      "id": 5,
      "title": { "image": `${basePath}/sst_5.png`, "count": 3 },
      "tuXingPath": `${basePath}/sst_circle.png`,
      "userAnswer": ""
    }
  ],

  "lxt_part3": {
    "id": 1,
    "title": "连一连，把个数一样多的连起来。",
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
        "value": "3",
        "ownership": "U",
        "connected": false
      },
      {
        "src":`${basePath}/lxt_u3.png`,
        "value": "1",
        "ownership": "U",
        "connected": false
      },
      {
        "src": `${basePath}/lxt_u4.png`,
        "value": "5",
        "ownership": "U",
        "connected": false
      }
    ],
    "imgD": [
      {
        "src": `${basePath}/lxt_d1.png`,
        "value": "3",
        "ownership": "D",
        "connected": false
      },
      {
        "src": `${basePath}/lxt_d2.png`,
        "value": "2",
        "ownership": "D",
        "connected": false
      },
      {
        "src": `${basePath}/lxt_d3.png`,
        "value": "5",
        "ownership": "D",
        "connected": false
      },
      {
        "src": `${basePath}/lxt_d4.png`,
        "value": "1",
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
  
  "tht": {
    "items": [
      {
        "rightItem": `${basePath}/tht_rightItem1.png`,
        "cnt": 2,
        "flag": [false, false, false, false, false],
        "changed":false
      },
      {
        "rightItem": `${basePath}/tht_rightItem2.png`,
        "cnt": 4,
        "flag": [false, false, false, false, false],
        "changed":false
      },
      {
        "rightItem": `${basePath}/tht_rightItem3.png`,
        "cnt": 5,
        "flag": [false, false, false, false, false],
        "changed":false
      }
    ],
    "tuxingpath": [
      { "leftImage":`${basePath}/tht_leftimage.png` },
      { "redCircle": `${basePath}/tht_redCircle.png` },
      { "noneCircle": `${basePath}/tht_noneCircle.png` }
    ]
  },
}
