export const mockQuestions = {
  "sst": [
    {
      "id": 1,
      "title": { "image": `${basePath}/icecream_28.png`, "count": 5 },
      "tuXingPath": `${basePath}/circle_2.png`,
      "userAnswer": ""
    },
    {
      "id": 2,
      "title": { "image": `${basePath}/plane_21.png`, "count": 4 },
      "tuXingPath": `${basePath}/circle_2.png`,
      "userAnswer": ""
    },
    {
      "id": 3,
      "title": { "image": `${basePath}/tree_13.png`, "count": 3 },
      "tuXingPath": `${basePath}/circle_2.png`,
      "userAnswer": ""
    }
  ],

  "tkt": [
    {
      "id": 1,
      "title_main": "",
      "title": [
        "1.认识数字\"1\"",
        "2.认识数字\"2",
        "3.认识数字\"3\"",
        "4.认识数字\"4\"",
        "5.认识数字\"5\""
      ],
      "img": `${basePath}/tkt_1_90.jpeg`,
      "subQuestions": [
        "（1）一个太阳、一座房子、一棵果树可以用数字TNUM表示，也可以用TNUM个小圆片表示。TSPL（2）看看图中，还有什么可以用数字\"1\"表示呢TNUM和TNUM都可以用数字\"1\"表示。",
        "两只鸟、两个人，可以用数字TNUM表示，也可以用TNUM个小圆片表示。",
        "有三朵云，三个苹果，可以用数字TNUM表示，也可以用TNUM个小圆片表示。",
        "有四个萝卜，四朵花，可以用数字TNUM表示，也可以用TNUM个小圆片表示。",
        "有五只鸭子，可以用数字TNUM表示，也可以用TNUM个小圆片表示。"
      ],
      "userAnswer": {},
      "answers": ["1", "1", "小船", "小狗", "2", "2", "3", "3", "4", "4", "5", "5"],
    }
  ],

  "htt": [{
    "id": 2,
    "title": "",
    "subQuestion": [
      {
        "id": 1,
        "img": `${basePath}/t1_9.jpeg`,
        "answer": 2
      },
      {
        "id": 2,
        "img": `${basePath}/t2_9.jpeg`,
        "answer": 3
      },
      {
        "id": 3,
        "img": `${basePath}/t3_10.jpeg`,
        "answer": 5
      },
      {
        "id": 4,
        "img": `${basePath}/t4_9.jpeg`,
        "answer": 4
      }
    ],
    "shape": [
      `${basePath}/jx_6.png`,
      `${basePath}/sjx_17.png`,
      `${basePath}/yx_15.png`
    ],
    "trueShape": 1,
    "userAnswer": [[], [], [], []],
    "isDragging": false,
    "startX": 0,
    "startY": 0,
    "draggedElement": null
  }],

  "lxt": [
    {
      "id": 1,
      "title": "请连接和图片中物品数量一致的圆的图片",
      "flag": "t3",
      "changed": false,
      "result": [],
      "imgU": [
        {
          "src": `${basePath}/l5_36.png`,
          "value": "5",
          "ownership": "U",
          "connected": false
        },
        {
          "src": `${basePath}/l1_30.png`,
          "value": "1",
          "ownership": "U",
          "connected": false
        },
        {
          "src": `${basePath}/l2_8.png`,
          "value": "2",
          "ownership": "U",
          "connected": false
        },
        {
          "src": `${basePath}/l4_32.png`,
          "value": "4",
          "ownership": "U",
          "connected": false
        }
      ],
      "imgD": [
        {
          "src": `${basePath}/a2_13.png`,
          "value": "2",
          "ownership": "D",
          "connected": false
        },
        {
          "src": `${basePath}/a1_18.png`,
          "value": "1",
          "ownership": "D",
          "connected": false
        },
        {
          "src": `${basePath}/a5_18.png`,
          "value": "5",
          "ownership": "D",
          "connected": false
        },
        {
          "src": `${basePath}/a4_14.png`,
          "value": "4",
          "ownership": "D",
          "connected": false
        }
      ]
    },
    {
      "id": 2,
      "title": "请连接对应物品数量的数字",
      "flag": "tuo3",
      "changed": false,
      "result": [],
      "imgU": [
        {
          "src": `${basePath}/tuo_l2_23.png`,
          "value": "2",
          "ownership": "U",
          "connected": false
        },
        {
          "src": `${basePath}/tuo_l5_30.png`,
          "value": "5",
          "ownership": "U",
          "connected": false
        },
        {
          "src": `${basePath}/tuo_l4_19.png`,
          "value": "4",
          "ownership": "U",
          "connected": false
        },
        {
          "src": `${basePath}/tuo_l3_13.png`,
          "value": "3",
          "ownership": "U",
          "connected": false
        }
      ],
      "imgD": [
        {
          "src": `${basePath}/tuo_a4.png`,
          "value": "4",
          "ownership": "D",
          "connected": false
        },
        {
          "src": `${basePath}/tuo_a5.png`,
          "value": "5",
          "ownership": "D",
          "connected": false
        },
        {
          "src": `${basePath}/tuo_a3.png`,
          "value": "3",
          "ownership": "D",
          "connected": false
        },
        {
          "src": `${basePath}/tuo_a2.png`,
          "value": "2",
          "ownership": "D",
          "connected": false
        }
      ]
    }],

  "tht": {
    "items": [
      {
        "rightItem": `${basePath}/rightItem1_3.png`,
        "cnt": 2,
        "flag": [false, false, false, false, false],
        "changed": false
      },
      {
        "rightItem": `${basePath}/rightItem2_2.png`,
        "cnt": 1,
        "flag": [false, false, false, false, false],
        "changed": false
      },
      {
        "rightItem": `${basePath}/rightItem3_2.png`,
        "cnt": 3,
        "flag": [false, false, false, false, false],
        "changed": false
      }
    ],
    "tuxingpath": [
      { "leftImage": `${basePath}/left_11.png` },
      { "redCircle": `${basePath}/redCircle_2.png` },
      { "noneCircle": `${basePath}/noneCircle_2.png` }
    ]
  },

  "qst": [{
    "title": "拓展应用2：对照上面图片根据左边的图形数量圈出右边的数量",
    "example": {
      "t_img": `${basePath}/t1_23.png`,
      "a_img": `${basePath}/a1_48.png`
    },
    "question": {
      "t_img": `${basePath}/t2_45.png`,
      "n_img": `${basePath}/n2_16.png`,
      "num": 8,
      "tureNum": 5
    },
    "img": `${basePath}/jian_10.png`,
    "result": false,
    "changed": false
  }],

  "htt_tuo": [{
    "id": [1, 2, 3],
    "title": "根据数字提示，把缺少的图形拖进来",
    "subQuestion": [
      {
        "id": 1,
        "img": `${basePath}/t1.png`,
        "answer": 4,
        "trueShape": 1
      },
      {
        "id": 2,
        "img": `${basePath}/t2.png`,
        "answer": 3,
        "trueShape": 2
      },
      {
        "id": 3,
        "img": `${basePath}/t3.png`,
        "answer": 1,
        "trueShape": 3
      }
    ],
    "shape": [
      `${basePath}/jx.png`,
      `${basePath}/sjx_10.png`,
      `${basePath}/yuan.png`
    ],
    "userAnswer": [[], [], []],
    "isDragging": false,
    "startX": 0,
    "startY": 0,
    "draggedElement": null,
    "answer": []
  }],
}