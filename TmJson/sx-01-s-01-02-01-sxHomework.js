const home = {
  sst: [
    {
      id: 1,
      title: { image: `${basePath}/sst1.png`, count: 4 },
      tuXingPath: `${basePath}/sst_circle.png`,
      userAnswer: "",
    },
    {
      id: 2,
      title: { image: `${basePath}/sst2.png`, count: 3 },
      tuXingPath: `${basePath}/sst_circle.png`,
      userAnswer: "",
    },
    {
      id: 3,
      title: { image: `${basePath}/sst3.png`, count: 1 },
      tuXingPath: `${basePath}/sst_circle.png`,
      userAnswer: "",
    },
    {
      id: 4,
      title: { image: `${basePath}/sst4.png`, count: 2 },
      tuXingPath: `${basePath}/sst_circle.png`,
      userAnswer: "",
    },
    {
      id: 5,
      title: { image: `${basePath}/sst5.png`, count: 5 },
      tuXingPath: `${basePath}/sst_circle.png`,
      userAnswer: "",
    },
  ],

  tkt: [
    {
      id: 1,
      title_main: "",
      title: [
        '按顺序给车厢写数字',
      ],
      img: `${basePath}/kacheSum.png`,
      subQuestions: [
        '（1）1.TNUM 2.TNUM 3.TNUM  ;TSPL（2）1.TNUM 2.TNUM 3.TNUM  ;',
      ],
      userAnswer: [
        {
          type: "complex",
          sections: [{ answers: ["", "", ""] }, { answers: ["", "", ""] }],
        },
      ],
      answers: [
        [
          ["2", "4", "5"],
          ["5", "4", "2"],
        ],
      ],
    },{
      id: 2,
      title_main: "",
      title: [
        '数一数，每种水果有几个?',
      ],
      img: `${basePath}/sstk.png`,
      subQuestions: [
        'TNUM个桃子，TNUM个苹果，TNUM个草莓',
      ],
      userAnswer: [
        {
          type: "simple",
          "answers": ["", ""]
        },
      ],
      answers: [
        ["2","4","5"]
      ],
    },{
      id: 3,
      title_main: "",
      title: [
        '小动物赛跑',
      ],
      img: `${basePath}/tkt2.png`,
      subQuestions: [
        '（1）蝴蝶是第TNUM个，它的前面是TNUM．TSPL（2）TNUM是第3个，TNUM是第5个，小猴的后面是TNUM．',
      ],
      userAnswer: [
        {
          type: "complex",
          sections: [{ answers: ["", ""] }, { answers: ["", "", ""] }],
        },
      ],
      answers: [
        [
          ["2", "小狗"],
          ["小猴", "狐狸", "小鸡"],
        ],
      ],
    },{
      id: 2,
      title_main: "",
      title: [
        '悦悦排队买汉堡，这一队共5人，从后往前数，悦悦排第3，悦悦前面有几个人？',
      ],
      img: ``,
      subQuestions: [
        'TNUM',
      ],
      userAnswer: [
        {
          type: "simple",
          "answers": [""]
        },
      ],
      answers: [
        ["2"]
      ],
    },
  ],
  "htt": {
    "id": 2,
    "title": "△不等于4,那么用几个三角形？",
    "subQuestion": [
      {
        "id": 1,
        "img": `${basePath}/htt1.png`,
        "answer": 4
      },
    ],
    "shape": [
      `${basePath}/sjx_17.png`,
    ],
    "trueShape": 1,
    "userAnswer": [[], [], [], []],
    "isDragging": false,
    "startX": 0,
    "startY": 0,
    "draggedElement": null
  },
};
