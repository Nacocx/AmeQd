const mockQuestions = {
  xzt: [
    {
      id: 1,
      title: "每只小兔吃一个萝卜，选哪一堆正好合适？",
      img: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/timu.png", //非必需
      options: [
        { value: "A", img: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/A.png" },
        { value: "B", img: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/B.png" },
        { value: "C", img: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/C.png" },
        //img非必需
      ],
      userAnswer: "",
      answer: "B",
    },
    {
      id: 2,
      title: "2+2=?",
      options: [
        { value: "A", label: "1" },
        { value: "B", label: "2" },
        { value: "C", label: "3" },
        { value: "D", label: "4" },
      ],
      userAnswer: "",
      answer: "D",
    },
    {
      id: 3,
      title: "2+4=?",
      options: [
        { value: "A", label: "4" },
        { value: "B", label: "5" },
        { value: "C", label: "6" },
        { value: "D", label: "7" },
      ],
      userAnswer: "",
      answer: "C",
    },
  ],

  sst: [
    {
      id: 1,
      title: { image: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/icecream_28.png", count: 5 },
      tuXingPath: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/circle_2.png",
      userAnswer: "",
    },
    {
      id: 2,
      title: { image: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/plane_21.png", count: 4 },
      tuXingPath: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/circle_2.png",
      userAnswer: "",
    },
    {
      id: 3,
      title: { image: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/tree_13.png", count: 3 },
      tuXingPath: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/circle_2.png",
      userAnswer: "",
    },
  ],

  tkt: [
    {
      id: 1,
      title_main: "Part1: 认识数字1、2、3，理解基数含义",
      title: [
        "1.认识数字“1”",
        "2.认识数字“2",
        "3.认识数字“3”",
        "4.认识数字“4”",
        "5.认识数字“5”",
      ],
      img: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/tkt_1_90.jpeg",
      subQuestions: [
        "（1）一个太阳、一座房子、一棵果树可以用数字TNUM表示，也可以用TNUM个小圆片表示。TSPL（2）看看图中，还有什么可以用数字“1”表示呢TNUM和TNUM都可以用数字“1”表示。",
        "两只鸟、两个人，可以用数字TNUM表示，也可以用TNUM个小圆片表示。",
        "有三朵云，三个苹果，可以用数字TNUM表示，也可以用TNUM个小圆片表示。",
        "有四个萝卜，四朵花，可以用数字TNUM表示，也可以用TNUM个小圆片表示。",
        "有五只鸭子，可以用数字TNUM表示，也可以用TNUM个小圆片表示。",
      ],
      userAnswer: [
        {
          type: "complex",
          sections: [
            { answers: ["", ""] }, // 第一部分
            { answers: ["", ""] }, // 第二部分
          ],
        },
        {
          type: "simple",
          answers: ["", ""],
        },
        {
          type: "simple",
          answers: ["", ""],
        },
        {
          type: "simple",
          answers: ["", ""],
        },
        {
          type: "simple",
          answers: ["", ""],
        },
      ],
      answers: [
        [
          ["1", "1"],
          ["小船", "小狗"]
        ],
        ["2", "2"],
        ["3", "3"],
        ["4", "4"],
        ["5", "5"]
      ],
    },
  ],

  htt: {
    id: 2, //1对应矩形 2对应三角形 3对应圆形
    title: "Part2",
    subQuestion: [
      {
        id: 1,
        img: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/t1_9.jpeg",
        answer: 2,
      },
      {
        id: 2,
        img: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/t2_9.jpeg",
        answer: 3,
      },
      {
        id: 3,
        img: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/t3_10.jpeg",
        answer: 5,
      },
      {
        id: 4,
        img: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/t4_9.jpeg",
        answer: 4,
      },
    ],
    shape: [
      "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/jx_6.png",
      "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/sjx_17.png",
      "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/yx_15.png",
    ], //有那些形状图形可以选择
    trueShape: 1,
    userAnswer: [[], [], [], []],
    isDragging: false, //是否正在拖拽
    startX: 0, //相对于鼠标的偏移量
    startY: 0,
    draggedElement: null, //正在拖拽的元素
  },

  lxt_part3: {
    id: 1,
    title: "part3：请连接和图片中物品数量一致的圆的图片",
    flag: "t3",
    changed:false,
    result:[],
    imgU: [
        {
        src: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/l5_36.png",
        value: "5",
        ownership: "U",
        connected: false,
      },
      {
        src: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/l1_30.png",
        value: "1",
        ownership: "U",
        connected: false,
      },
      {
        src: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/l2_8.png",
        value: "2",
        ownership: "U",
        connected: false,
      },
   
    
         {
        src: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/l4_32.png",
        value: "4",
        ownership: "U",
        connected: false,
      },
    ],
    imgD: [
       {
        src: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/a2_13.png",
        value: "2",
        ownership: "D",
        connected: false,
      },
      {
        src: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/a1_18.png",
        value: "1",
        ownership: "D",
        connected: false,
      },
     
      {
        src: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/a5_18.png",
        value: "5",
        ownership: "D",
        connected: false,
      },
      {
        src: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/a4_14.png",
        value: "4",
        ownership: "D",
        connected: false,
      },
      
    ],

  },
  lxt_tuo3: {
    id: 2,
    title: "拓展应用3：请连接对应物品数量的数字",
    flag: "tuo3",
    changed:false,
    result:[],
    imgU: [
      {
        src: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/tuo_l2_23.png",
        value: "2",
        ownership: "U",
        connected: false,
      },
          {
        src: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/tuo_l5_30.png",
        value: "5",
        ownership: "U",
        connected: false,
      },
    
      {
        src: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/tuo_l4_19.png",
        value: "4",
        ownership: "U",
        connected: false,
      },
        {
        src: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/tuo_l3_13.png",
        value: "3",
        ownership: "U",
        connected: false,
      },
  
    ],
    imgD: [
           {
        src: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/tuo_a4.png",
        value: "4",
        ownership: "D",
        connected: false,
      },
    
      
      {
        src: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/tuo_a5.png",
        value: "5",
        ownership: "D",
        connected: false,
      },
      {
        src: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/tuo_a3.png",
        value: "3",
        ownership: "D",
        connected: false,
      },
        {
        src: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/tuo_a2.png",
        value: "2",
        ownership: "D",
        connected: false,
      },
 
    ],

  },

  tht: {
    items: [
      {
        rightItem: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/rightItem1_3.png",
        cnt: 2,
        flag: [false, false, false, false, false],

        "changed":false

      },
      {
        rightItem: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/rightItem2_2.png",
        cnt: 1,
        flag: [false, false, false, false, false],

        "changed":false

      },
      {
        rightItem: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/rightItem3_2.png",
        cnt: 3,
        flag: [false, false, false, false, false],

        "changed":false

      },
    ],
    tuxingpath: [
      { leftImage: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/left_11.png" },
      { redCircle: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/redCircle_2.png" },
      { noneCircle:"/static2/sx-01-s-01-01-01-sxClassroomExercises/img/noneCircle_2.png" },
    ],
  },
  qst: {
    title: "拓展应用2：对照上面图片根据左边的图形数量圈出右边的数量",
    example: {
      t_img: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/t1_23.png",//样例题目
      a_img: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/a1_48.png",//样例答案
    },
    question: {
      t_img: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/t2_45.png",//题目
      n_img: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/n2_16.png",//单个形状
      num: 8,//有多少个单个形状
      tureNum: 5
    },

    img: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/jian_10.png",


    result:false,
    changed:false,

  },
  htt_tuo: {
    id:[1,2,3],
    title: "拓展应用1：根据数字提示，把缺少的图形拖进来",
    subQuestion: [
      {
        id: 1,
        img: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/t1.png",
        answer: 4,
        trueShape: 1,
      },
      {
        id: 2,
        img: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/t2.png",
        answer: 3,
        trueShape: 2,
      },
      {
        id: 3,
        img: "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/t3.png",
        answer: 1,
        trueShape: 3,
      },

    ],
    shape: ["/static2/sx-01-s-01-01-01-sxClassroomExercises/img/jx.png", "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/sjx_10.png", "/static2/sx-01-s-01-01-01-sxClassroomExercises/img/yuan.png"],//有那些形状图形可以选择
    // trueShape: 1,
    userAnswer: [
      [],
      [],
      [],
    ],
    isDragging: false,//是否正在拖拽
    startX: 0,//相对于鼠标的偏移量
    startY: 0,
    draggedElement: null,//正在拖拽的元素
    answer: [],//是否正确 返回后端的数据
  },

};