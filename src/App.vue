<template>
  <div id="app">
    <el-header>
      <img src="./assets/logo.png" width="50px" height="50px" alt="Logo Missing!" />
      <span style="margin-left: 15px; font-size: 18px">熊猫沉浸</span>
    </el-header>

    <el-container>
      <el-container>
        <!-- 侧边栏模板 -->
        <sidebar :student-info="studentInfo" :count-tm="countTm" />
        <!-- 题目部分 -->
        <el-main>
          <!-- 选择题 -->
          <div id="chose">
            <div class="question-container">
              <!-- part1_填空题 -->
              <tkt :all-questions="questions.tkt" />
              <!-- part2_画图题 -->
              <htt :message="questions.htt" />

              <!-- part3_连线题 -->
              <lxt :message="questions.lxt_part3" />
              <!-- part4_形状题 -->
              <sst :items="questions.sst" v-if="questions.sst" />
              <!-- part5_涂画题 -->
              <tht :items="questions.tht.items" :tuxing-path="questions.tht.tuxingpath" v-if="questions.tht.items" />


              <!-- <div>

                <el-button-group size="large">
                  <el-button @click="lxtpage--" type="primary" :disabled="lxtpage === 1">Last</el-button>
                  <el-button @click="lxtpage++" type="primary" :disabled="lxtpage === 2">Next</el-button>
                </el-button-group>
              </div> -->

              <htt_tuo :message="questions.htt_tuo" />

              <!-- 拓展应用：2 -->
              <qst :message="questions.qst" v-if="questions.qst" />
              <!-- 拓展应用：3 -->
              <lxt :message="questions.lxt_tuo3" />

              <xzt :questions="questions.xzt" v-if="questions.xzt" />






              <el-button-group>
                <!-- <el-button type="default" @click="pageSub" :icon="ArrowLeft" size="large" :disabled="currentPage===1">Last Part</el-button> -->
                <el-button type="primary" @click="willSubmit" id="Submit" size="large">提交答案</el-button>
                <!-- <el-button type="default" @click="pageAdd" size="large" :disabled="currentPage===4">Next Part<el-icon class="el-icon--right"><ArrowRight /></el-icon></el-button> -->
              </el-button-group>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import xzt from "@/components/xzt.vue";
import sidebar from "@/components/sidebar.vue";
import tkt from "@/components/tkt.vue";
import { ArrowLeft, ArrowRight } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import "@/style/app.css";
import Sst from "@/components/sst.vue";
import Htt from "@/components/htt.vue";
import lxt from "@/components/lxt.vue";
import qst from "@/components/qst.vue";
import Tht from "@/components/tht.vue";
import htt_tuo from "@/components/htt_tuo.vue";

import axios from "axios";
//实际使用中数据从后端获取
// import logo from "/static/img/T1_tkt_ok/tkt_1.jpeg";   // 必须用 import
// ../static/img/interact/xx.png
const mockQuestions = {
  xzt: [
    {
      id: 1,
      title: "每只小兔吃一个萝卜，选哪一堆正好合适？",
      img: "../static/img/interact/timu.png", //非必需
      options: [
        { value: "A", img: "../static/img/interact/A.png" },
        { value: "B", img: "../static/img/interact/B.png" },
        { value: "C", img: "../static/img/interact/C.png" },
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
      title: { image: "../static/img/interact/icecream_28.png", count: 5 },
      tuXingPath: "../static/img/interact/circle_2.png",
      userAnswer: "",
    },
    {
      id: 2,
      title: { image: "../static/img/interact/plane_21.png", count: 4 },
      tuXingPath: "../static/img/interact/circle_2.png",
      userAnswer: "",
    },
    {
      id: 3,
      title: { image: "../static/img/interact/tree_13.png", count: 3 },
      tuXingPath: "../static/img/interact/circle_2.png",
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
      img: "../static/img/interact/tkt_1_90.jpeg",
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
        img: "../static/img/interact/t1_9.jpeg",
        answer: 2,
      },
      {
        id: 2,
        img: "../static/img/interact/t2_9.jpeg",
        answer: 3,
      },
      {
        id: 3,
        img: "../static/img/interact/t3_10.jpeg",
        answer: 5,
      },
      {
        id: 4,
        img: "../static/img/interact/t4_9.jpeg",
        answer: 4,
      },
    ],
    shape: [
      "../static/img/interact/jx_6.png",
      "../static/img/interact/sjx_17.png",
      "../static/img/interact/yx_15.png",
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
        src: "../static/img/interact/l1_30.png",
        value: "1",
        ownership: "U",
        connected: false,
      },
      {
        src: "../static/img/interact/l2_8.png",
        value: "2",
        ownership: "U",
        connected: false,
      },
      {
        src: "../static/img/interact/l4_32.png",
        value: "4",
        ownership: "U",
        connected: false,
      },
      {
        src: "../static/img/interact/l5_36.png",
        value: "5",
        ownership: "U",
        connected: false,
      },
    ],
    imgD: [
      {
        src: "../static/img/interact/a1_18.png",
        value: "1",
        ownership: "D",
        connected: false,
      },
      {
        src: "../static/img/interact/a2_13.png",
        value: "2",
        ownership: "D",
        connected: false,
      },
      {
        src: "../static/img/interact/a4_14.png",
        value: "4",
        ownership: "D",
        connected: false,
      },
      {
        src: "../static/img/interact/a5_18.png",
        value: "5",
        ownership: "D",
        connected: false,
      },
    ],

  },
  lxt_tuo3: {
    id: 2,
    title: "拓展应用3：请连接对应物品数量的数字",
    changed:false,
    flag: "tuo3",
    result:[],
    imgU: [
      {
        src: "../static/img/interact/tuo_l2_23.png",
        value: "2",
        ownership: "U",
        connected: false,
      },
      {
        src: "../static/img/interact/tuo_l3_13.png",
        value: "3",
        ownership: "U",
        connected: false,
      },
      {
        src: "../static/img/interact/tuo_l4_19.png",
        value: "4",
        ownership: "U",
        connected: false,
      },
      {
        src: "../static/img/interact/tuo_l5_30.png",
        value: "5",
        ownership: "U",
        connected: false,
      },
    ],
    imgD: [
      {
        src: "../static/img/interact/tuo_a2.png",
        value: "2",
        ownership: "D",
        connected: false,
      },
      {
        src: "../static/img/interact/tuo_a3.png",
        value: "3",
        ownership: "D",
        connected: false,
      },
      {
        src: "../static/img/interact/tuo_a4.png",
        value: "4",
        ownership: "D",
        connected: false,
      },
      {
        src: "../static/img/interact/tuo_a5.png",
        value: "5",
        ownership: "D",
        connected: false,
      },
    ],

  },

  tht: {
    items: [
      {
        rightItem: "../static/img/interact/rightItem1_3.png",
        cnt: 2,
        flag: [false, false, false, false, false],

        "changed":false

      },
      {
        rightItem: "../static/img/interact/rightItem2_2.png",
        cnt: 1,
        flag: [false, false, false, false, false],

        "changed":false

      },
      {
        rightItem: "../static/img/interact/rightItem3_2.png",
        cnt: 3,
        flag: [false, false, false, false, false],

        "changed":false

      },
    ],
    tuxingpath: [
      { leftImage: "../static/img/interact/left_11.png" },
      { redCircle: "../static/img/interact/redCircle_2.png" },
      { noneCircle:"../static/img/interact/noneCircle_2.png" },
    ],
  },
  qst: {
    title: "拓展应用2：对照上面图片根据左边的图形数量圈出右边的数量",
    example: {
      t_img: "../static/img/interact/t1_23.png",//样例题目
      a_img: "../static/img/interact/a1_48.png",//样例答案
    },
    question: {
      t_img: "../static/img/interact/t2_45.png",//题目
      n_img: "../static/img/interact/n2_16.png",//单个形状
      num: 8,//有多少个单个形状
      tureNum: 5
    },

    img: "../static/img/interact/jian_10.png",


    result:false,
    changed:false,

  },
  htt_tuo: {
    id:[1,2,3],
    title: "拓展应用1：根据数字提示，把缺少的图形拖进来",
    subQuestion: [
      {
        id: 1,
        img: "../static/img/interact/t1.png",
        answer: 4,
        trueShape: 1,
      },
      {
        id: 2,
        img: "../static/img/interact/t2.png",
        answer: 3,
        trueShape: 2,
      },
      {
        id: 3,
        img: "../static/img/interact/t3.png",
        answer: 1,
        trueShape: 3,
      },

    ],
    shape: ["../static/img/interact/jx.png", "../static/img/interact/sjx_10.png", "../static/img/interact/yuan.png"],//有那些形状图形可以选择
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

const mockStudentInfo = {
  name: "Jack",
  class: "202",
  teacher: "Bob",
};



export default {
  data() {
    return {
      questions: mockQuestions,
      studentInfo: mockStudentInfo,
      
      loading: false,
      error: null,
      boolLists: {
        xzt: [],
        tkt: [],
        sst: [],
        htt: [],
        tht: [],
        qst: [],
      },
      lxtpage: 1,
    };
  },
  components: {
    Tht,
    Htt,
    Sst,
    ArrowRight,
    tkt,
    xzt,
    sidebar,
    circleDrawing: Sst,
    lxt,
    qst,
    htt_tuo

  },
  computed: {
    ArrowLeft() {
      return ArrowLeft;
    },
    countTm() {
      // TIPS: this.questions || {}：如果 this.questions 是 undefined 或 null，就返回空对象 {}，防止报错。
      // { xzt = [], sst = [] }：从 this.questions 里取出 xzt 和 sst，如果它们不存在，就默认赋值为空数组 []。
      const { xzt = [], sst = [] } = this.questions || {};
      let totalTm = xzt.length + sst.length;

      let answeredCount = [
        ...xzt.filter((e) => e.userAnswer), // 筛选出 xzt 里已答的题目
        ...sst.filter((e) => e.userAnswer), // 筛选出 sst 里已答的题目
      ].length;

      // 获得填空题里的题目
      this.questions.tkt.forEach((question) => {
        question.userAnswer.forEach((answer) => {
          // 如果是简单题
          if (answer.type === "simple") {
            totalTm += answer.answers.length;
            answeredCount += answer.answers.filter(
              (a) => a.trim() !== ""
            ).length;
          }
          // 如果是复杂题(含有次级题目)
          else {
            answer.sections.forEach((section) => {
              totalTm += section.answers.length;
              answeredCount += section.answers.filter(
                (a) => a.trim() !== ""
              ).length;
            });
          }
        });
      });

      // 获得画图题答案
      totalTm += this.questions.htt.userAnswer.length;
      // 防止多次计算
      let prev = [];
      this.questions.htt.userAnswer.forEach((ans, index) => {
        ans.forEach((e) => {
          if (e !== null && prev[index] == null) {
            answeredCount++;
            prev[index] = e;
            // console.log(e+","+prev[index]+","+index);
          }
        });
      });

      // 获得画图题答案
      totalTm += this.questions.htt_tuo.userAnswer.length;
      // 防止多次计算
      let prev2 = [];
      this.questions.htt_tuo.userAnswer.forEach((ans, index) => {
        ans.forEach((e) => {
          if (e !== null && prev2[index] == null) {
            answeredCount++;
            prev2[index] = e;
          }
        });
      });

      // 获得涂画题
      totalTm+=this.questions.tht.items.length;
      let prevth=[]
      this.questions.tht.items.forEach((e,index)=>{
        if(e.changed===true&&!prevth[index])
        {

          prevth.push(true);
          answeredCount++;
        }
      })

      // 获得圈数题
      totalTm+=1;
      if(this.questions.qst.changed)
        {
          answeredCount++;
        }
        //获得连线题
        totalTm+=2;
        if(this.questions.lxt_part3.changed ){
          answeredCount++;
        }
        if(this.questions.lxt_tuo3.changed ){
          answeredCount++;
        }

      const percentage = totalTm
        ? Math.round((answeredCount / totalTm) * 100)
        : 0;
      totalTm;
      return { totalTm, percentage, answeredCount };
    },
  },
  created() {
    // this.fetchTmData(); //从后端获得题目数据
  },
  mounted() {
    document.addEventListener("contextmenu", this.preventContextMenu);
  },
  methods: {
    // async fetchTmData() {

    //   this.loading = true;
    //   this.error = null;
    //   try {
    //     const response = await axios.post("./TmJson/sx-01-s-01-01-01-sxClassroomExercisesAn.json");
    //     this.questions = response.data; // 注意：axios 返回的数据在 response.data 中
    //   } catch (error) {
    //     // 如果连接服务器失败
    //     console.error("获取数据失败:", error);
    //     this.error = error;

    //     // 使用mock数据作为回退
    //     this.questions = mockQuestions;
    //     this.studentInfo = mockStudentInfo;
    //     this.corAnswers = mockCorAnswers;
    //   } finally {
    //     this.loading = false;
    //   }
    // },

    // 确认是否提交答案
    willSubmit() {
      let remainTm = this.countTm.totalTm - this.countTm.answeredCount;
      this.$confirm(
        // 提示内容
        remainTm !== 0
          ? `你确定要提交答案吗?你还剩下${remainTm}个题目没写`
          : `你确定要提交答案吗?`,
        // 提示标题
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        // 确定
        .then(() => {
          console.log(this.questions);

          this.submitAnswers();
          this.$message({
            type: "success",
            message: "提交成功!",
          });
        })
        //取消或报错(e)
        .catch((e) => {
          console.log(e);
          this.$message({
            type: "info",
            message: "已取消提交",
          });
        });
    },
    // 获得填空题答案
    getFormattedAnswers() {
      // 初始化结果数组，用于存储所有格式化后的答案
      const results = [];

      // 第一层遍历：遍历 questions.tkt 数组（可能是不同页/组的题目集合）
      this.questions.tkt.forEach((tktItem, tktIndex) => {
        // tktItem: 当前页/组的题目数据对象
        // tktIndex: 当前页/组的索引（从0开始）

        // 第二层遍历：遍历当前页/组的所有用户答案(userAnswer)
        tktItem.userAnswer.forEach((answer, answerIndex) => {
          // answer: 单个题目的答案数据
          // answerIndex: 当前题目在userAnswer数组中的索引（从0开始）

          // 创建基础答案对象结构
          const formattedAnswer = {
            questionId: tktIndex + 1, // 题目ID（页码），+1将索引转为1-based
            subQuestionId: answerIndex + 1, // 子题ID，+1将索引转为1-based
            type: answer.type, // 题目类型（'simple'或'complex'）
          };

          // 处理简单题型
          if (answer.type === "simple") {
            // 使用扩展运算符创建answers数组的浅拷贝
            // 避免直接引用原数组，防止意外修改原始数据
            formattedAnswer.answers = [...answer.answers];
          }
          // 处理复杂题型
          else {
            // 初始化复杂题型的answers数组
            formattedAnswer.answers = [];

            // 第三层遍历：遍历复杂题型的各个部分(sections)
            answer.sections.forEach((section) => {
              // 对每个section的answers数组进行浅拷贝，然后放入结果
              formattedAnswer.answers.push([...section.answers]);
              // 注意：这里是二维数组，每个section的answers作为子数组
            });
          }

          // 将格式化后的答案对象加入结果数组
          results.push(formattedAnswer);
        });
      });

      // 返回最终的结果数组
      return results;
    },
    submitAnswers() {
      // const xztAns = this.questions.xzt.map((q) => ({
      //   questionId: q.id,
      //   answer: q.userAnswer,
      // }));

      // 获得选择题答案并且判断正误

      if(this.questions.xzt){
      const xztAns = [];
      this.questions.xzt.forEach((e, index) => {
        xztAns.push(e.userAnswer);
        this.boolLists.xzt[index] = e.userAnswer === e.answer ? true : false;
      });}





      // 获得填空题答案
      const tktBoolList = [];
      // 遍历每个TKT模块
      this.questions.tkt.forEach(tktItem => {
        // 遍历模块中的每个题目
        tktItem.userAnswer.forEach((userAnswer, questionIndex) => {
          const correctAnswer = tktItem.answers[questionIndex];

          if (userAnswer.type === "simple") {
            // 处理简单题型
            userAnswer.answers.forEach((userAns, ansIndex) => {
              // 获取正确答案（支持单值和数组两种格式）
              const correctValue = Array.isArray(correctAnswer)
                ? correctAnswer[ansIndex]
                : correctAnswer;

              // 比较答案（忽略首尾空格）
              const isCorrect = String(userAns).trim() === String(correctValue).trim();
              tktBoolList.push(isCorrect);
            });
          } else {
            // 处理复杂题型
            userAnswer.sections.forEach((section, sectionIndex) => {
              section.answers.forEach((userAns, ansIndex) => {
                // 处理多层嵌套的正确答案结构
                let correctValue = correctAnswer;

                // 第一层：部分索引
                if (Array.isArray(correctAnswer)) {
                  correctValue = correctAnswer[sectionIndex];

                  // 第二层：空位索引
                  if (Array.isArray(correctValue)) {
                    correctValue = correctValue[ansIndex];
                  }
                }

                // 比较答案
                const isCorrect = String(userAns).trim() === String(correctValue).trim();
                tktBoolList.push(isCorrect);
              });
            });
          }
        });
      });
      this.boolLists.tkt = tktBoolList;

      // 获得涂画题正确数组
      const thtBoolList = [];
      this.questions.tht.items.forEach(e => {
        let cntTrue = 0;
        e.flag.forEach(ef => {
          if (ef === true) {
            cntTrue++;
          }
        })
        thtBoolList.push(cntTrue === e.cnt ? true : false);
      });
      this.boolLists.tht = thtBoolList;




      // 获得数数题答案
      const sstAns = [];
      this.questions.sst.forEach((e, index) => {
        sstAns.push(e.userAnswer);
        this.boolLists.sst[index] =
          e.userAnswer == e.title.count ? true : false;
      });

      // console.log(tktAns);
      // console.log(sstAns);
      // console.log(xztAns);
      // this.checkAnswers(xztAns);
      let htt1=this.questions.htt;
      let htt2=this.questions.htt_tuo;
      
      this.boolLists.htt = this.getHttBoolList(htt1);
      this.boolLists.htt_tuo =this.getHttBoolList(htt2);


      //获得圈数题答案
      if(this.questions.qst.result===true)
        this.boolLists.qst.push(true);


      // 获得连线题答案
      this.boolLists.lxt_part3=(this.questions.lxt_part3.result);
      this.boolLists.lxt_tuo3=(this.questions.lxt_tuo3.result);

      //调试用
      console.log(this.boolLists);

    },
     getHttBoolList(htt){
        let httAns = [];
        htt.userAnswer.forEach((e, index) => {
        let num = 0;
        let flag = false;
        e.forEach((e1,index1) => {
          if (e1 != ((typeof(htt.id)==="number")?htt.id:(htt.id[index]))) {
            if (flag === false) {
              httAns.push(false);
              flag = true;
            }
          } else {
            num++;
          }
        });
        if (num == htt.subQuestion[index].answer && flag === false) {
          httAns.push(true);
          flag = true;
        }
        if (flag === false) {
          httAns.push(false);
          flag = true;
        }
      });
      return httAns;
      },

    // 禁用右键菜单
    preventContextMenu(e) {
      ElMessage("为了更好的体验，右键已被禁用");
      e.preventDefault();
    },
  },
  beforeDestroy() {
    document.removeEventListener("contextmenu", this.preventContextMenu);
  },
};
</script>
