const mockQuestions = {
  xzt: [
    {
      id: 1,
      title: "每只小兔吃一个萝卜，选哪一堆正好合适？",
      img: "../static/T1/timu.png", //非必需
      options: [
        { value: "A", img: "../static/T1/A.png" },
        { value: "B", img: "../static/T1/B.png" },
        { value: "C", img: "../static/T1/C.png" },
        //img非必需
      ],
      userAnswer: "",
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
    },
  ],

  sst: [
    {
      id: 1,
      title: { image: "./static/icecream.png", count: 5 },
      tuXingPath: "./static/circle.png",
      userAnswer: "",
    },
    {
      id: 2,
      title: { image: "./static/plane.png", count: 4 },
      tuXingPath: "./static/circle.png",
      userAnswer: "",
    },
    {
      id: 3,
      title: { image: "./static/tree.png", count: 3 },
      tuXingPath: "./static/circle.png",
      userAnswer: "",
    },
  ],

  tkt: [
    {
      id: 1,
      title: [
        "1.认识数字“1”",
        "2.认识数字“2",
        "3.认识数字“3”",
        "4.认识数字“4”",
        "5.认识数字“5”",
      ],
      img: "./static/tkt1.png",
      subQuestions: [
        "（1）一个太阳、一座房子、一棵果树可以用数字TNUM表示，也可以用TNUM个小圆片表示。TSPL（2）看看图中，还有什么可以用数字“1”表示呢TNUM和TNUM都可以用数字“1”表示。",
        "两只鸟、两个人，可以用数字TNUM表示，也可以用TNUM个小圆片表示。",
        "有三朵云，三个苹果，可以用数字TNUM表示，也可以用TNUM个小圆片表示。",
        "有四个萝卜，四朵花，可以用数字TNUM表示，也可以用TNUM个小圆片表示。",
        "有五只鸭子，可以用数字TNUM表示，也可以用TNUM个小圆片表示。",
      ],
      userAnswer: [],
    },
  ],
};
