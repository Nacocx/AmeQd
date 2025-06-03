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

              

               
               
                <!-- TODO: fix lxt and qst bugs -->
              <!-- <div>
                <lxt :message="questions.lxt_part3" v-if="lxtpage === 1" />
                <lxt :message="questions.lxt_tuo3" v-if="lxtpage === 2" />
                <el-button-group size="large">
                  <el-button @click="lxtpage--" type="primary" :disabled="lxtpage === 1">Last</el-button>
                  <el-button @click="lxtpage++" type="primary" :disabled="lxtpage === 2">Next</el-button>
                </el-button-group>
                <hr />
              </div> -->
                <!-- <qst :message="questions.qst"/> -->

              <xzt :questions="questions.xzt" />
              <sst :items="questions.sst" />
              <tht :items="questions.tht.items" :tuxing-path="questions.tht.tuxingpath" />

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
import Tht from "@/components/tht.vue";
import qst from "@/components/qst.vue";
import axios from "axios";
//实际使用中数据从后端获取

const mockQuestions = {
  xzt: [
    {
      id: 1,
      title: "每只小兔吃一个萝卜，选哪一堆正好合适？",
      img: "../static/img/T1_xzt/timu.png", //非必需
      options: [
        { value: "A", img: "./static/img/T1_xzt/A.png" },
        { value: "B", img: "./static/img/T1_xzt/B.png" },
        { value: "C", img: "./static/img/T1_xzt/C.png" },
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
      title: { image: "./static/img/T3_sst/icecream.png", count: 5 },
      tuXingPath: "./static/img/T3_sst/circle.png",
      userAnswer: "",
    },
    {
      id: 2,
      title: { image: "./static/img/T3_sst/plane.png", count: 4 },
      tuXingPath: "./static/img/T3_sst/circle.png",
      userAnswer: "",
    },
    {
      id: 3,
      title: { image: "./static/img/T3_sst/tree.png", count: 3 },
      tuXingPath: "./static/img/T3_sst/circle.png",
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
      img: "./static/img/T1_tkt_ok/tkt_1.jpeg",
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
        img: "./static/img/T2_htt_ok/t1.jpeg",
        answer: 2,
      },
      {
        id: 2,
        img: "./static/img/T2_htt_ok/t2.jpeg",
        answer: 3,
      },
      {
        id: 3,
        img: "./static/img/T2_htt_ok/t3.jpeg",
        answer: 5,
      },
      {
        id: 4,
        img: "./static/img/T2_htt_ok/t4.jpeg",
        answer: 4,
      },
    ],
    shape: [
      "./static/img/T2_htt_ok/jx.png",
      "./static/img/T2_htt_ok/sjx.png",
      "./static/img/T2_htt_ok/yx.png",
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
    title: "part3",
    flag: "t3",
    imgU: [
      {
        src: "./static/img/T3_lxt_ok/l1.png",
        value: "1",
        ownership: "U",
        connected: false,
      },
      {
        src: "./static/img/T3_lxt_ok/l2.png",
        value: "2",
        ownership: "U",
        connected: false,
      },
      {
        src: "./static/img/T3_lxt_ok/l4.png",
        value: "4",
        ownership: "U",
        connected: false,
      },
      {
        src: "./static/img/T3_lxt_ok/l5.png",
        value: "5",
        ownership: "U",
        connected: false,
      },
    ],
    imgD: [
      {
        src: "./static/img/T3_lxt_ok/a1.png",
        value: "1",
        ownership: "D",
        connected: false,
      },
      {
        src: "./static/img/T3_lxt_ok/a2.png",
        value: "2",
        ownership: "D",
        connected: false,
      },
      {
        src: "./static/img/T3_lxt_ok/a4.png",
        value: "4",
        ownership: "D",
        connected: false,
      },
      {
        src: "./static/img/T3_lxt_ok/a5.png",
        value: "5",
        ownership: "D",
        connected: false,
      },
    ],
    // 标记是否正在绘制连线的状态，初始为 false 表示未开始绘制
    isDrawing: false,
    // 记录连线起始选项的对象，初始为 null 表示无起始选项
    startItem: null,
    // 记录连线结束选项的对象，初始为 null 表示无结束选项
    endItem: null,
    // 当前正在绘制的连线对象，包含起点和终点坐标，初始均为 0
    currentLine: { x1: 0, y1: 0, x2: 0, y2: 0 },
    // 存储所有已创建连线的数组，初始为空数组
    connections: [],
    // 画布的 2D 绘图上下文对象，初始为 null，后续在 mounted 钩子中初始化
    ctx: null,
    // 背景画布的 2D 绘图上下文对象，初始为 null，后续在 mounted 钩子中初始化
    backCtx: null,
    // 存储画布相对于视口的位置和尺寸信息的对象，初始为 null
    canvasRect: null,
    // 调试模式开关，设置为 true 时可开启调试功能，如绘制检测区域
    isDebug: true,
    // 存储用户连线答案检查结果的数组，初始为空数组
    result: [],
  },
  lxt_tuo3: {
    id: 2,
    title: "拓展应用3",
    flag: "tuo3",
    imgU: [
      {
        src: "./static/img/Tuo3_lxt_ok/tuo_l2.jpg",
        value: "2",
        ownership: "U",
        connected: false,
      },
      {
        src: "./static/img/Tuo3_lxt_ok/tuo_l3.png",
        value: "3",
        ownership: "U",
        connected: false,
      },
      {
        src: "./static/img/Tuo3_lxt_ok/tuo_l4.jpg",
        value: "4",
        ownership: "U",
        connected: false,
      },
      {
        src: "./static/img/Tuo3_lxt_ok/tuo_l5.jpg",
        value: "5",
        ownership: "U",
        connected: false,
      },
    ],
    imgD: [
      {
        src: "./static/img/Tuo3_lxt_ok/tuo_a2.png",
        value: "2",
        ownership: "D",
        connected: false,
      },
      {
        src: "./static/img/Tuo3_lxt_ok/tuo_a3.png",
        value: "3",
        ownership: "D",
        connected: false,
      },
      {
        src: "./static/img/Tuo3_lxt_ok/tuo_a4.png",
        value: "4",
        ownership: "D",
        connected: false,
      },
      {
        src: "./static/img/Tuo3_lxt_ok/tuo_a5.png",
        value: "5",
        ownership: "D",
        connected: false,
      },
    ],
    // 标记是否正在绘制连线的状态，初始为 false 表示未开始绘制
    isDrawing: false,
    // 记录连线起始选项的对象，初始为 null 表示无起始选项
    startItem: null,
    // 记录连线结束选项的对象，初始为 null 表示无结束选项
    endItem: null,
    // 当前正在绘制的连线对象，包含起点和终点坐标，初始均为 0
    currentLine: { x1: 0, y1: 0, x2: 0, y2: 0 },
    // 存储所有已创建连线的数组，初始为空数组
    connections: [],
    // 画布的 2D 绘图上下文对象，初始为 null，后续在 mounted 钩子中初始化
    ctx: null,
    // 背景画布的 2D 绘图上下文对象，初始为 null，后续在 mounted 钩子中初始化
    backCtx: null,
    // 存储画布相对于视口的位置和尺寸信息的对象，初始为 null
    canvasRect: null,
    // 调试模式开关，设置为 true 时可开启调试功能，如绘制检测区域
    isDebug: true,
    // 存储用户连线答案检查结果的数组，初始为空数组
    result: [],
  },

  tht: {
    items: [
      {
        rightItem: "./static/img/tht/rightItem1.png",
        cnt: 2,
        flag: [false, false, false, false, false],
        "changed":false
      },
      {
        rightItem: "./static/img/tht/rightItem2.png",
        cnt: 1,
        flag: [false, false, false, false, false],
        "changed":false
      },
      {
        rightItem: "./static/img/tht/rightItem3.png",
        cnt: 3,
        flag: [false, false, false, false, false],
        "changed":false
      },
    ],
    tuxingpath: [
      { leftImage: "./static/img/tht/left.png" },
      { redCircle: "./static/img/tht/redCircle.png" },
      { noneCircle: "./static/img/tht/noneCircle.png" },
    ],
  },
  qst:{
    title: "对照上面图片根据左边的图形数量圈出右边的数量",
    example: {
    t_img: "./static/img/Tuo2_qst_ok/t1.png",//样例题目
    a_img: "./static/img/Tuo2_qst_ok/a1.png",//样例答案
    },
    question: {
    t_img: "./static/img/Tuo2_qst_ok/t2.png",//题目
    n_img: "./static/img/Tuo2_qst_ok/n2.png",//单个形状
    num: 8,//有多少个单个形状
    tureNum: 5
    },
    ctx: "",
    shapeXY: [],//所有点的中心坐标
    allXY: [],
    result: [],
    useAnswer: [],
    userNum: 0,
    flag: 1,
    img:"./static/img/Tuo2_qst_ok/jian.png",
  }
};

const mockStudentInfo = {
  name: "Jack",
  class: "202",
  teacher: "Bob",
};

const mockCorAnswers = {
  xzt: ["B", "D", "C"],
  sst: [],
  htt: [],
};

export default {
  data() {
    return {
      questions: mockQuestions,
      studentInfo: mockStudentInfo,
      corAnswers: mockCorAnswers,
      loading: false,
      error: null,
      boolLists: {
        xzt: [],
        tkt: [],
        sst: [],
        htt: [],
        tht: [],
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
    qst
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




      const percentage = totalTm
        ? Math.round((answeredCount / totalTm) * 100)
        : 0;

      return { totalTm, percentage, answeredCount };
    },
  },
  created() {
    this.fetchTmData(); //从后端获得题目数据
  },
  mounted() {
    document.addEventListener("contextmenu", this.preventContextMenu);
  },
  methods: {
    async fetchTmData() {
  this.loading = true;
  this.error = null;
  try {
    const response = await axios.post("./TmJson/sx-01-s-01-01-01-sxClassroomExercisesAn.json");
    this.questions = response.data; // 注意：axios 返回的数据在 response.data 中
  } catch (error) {
    // 如果连接服务器失败
    console.error("获取数据失败:", error);
    this.error = error;

    // 使用mock数据作为回退
    this.questions = mockQuestions;
    this.studentInfo = mockStudentInfo;
    this.corAnswers = mockCorAnswers;
  } finally {
    this.loading = false;
  }
},
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
      const xztAns = [];
      this.questions.xzt.forEach((e, index) => {
        xztAns.push(e.userAnswer);
        this.boolLists.xzt[index] = e.userAnswer === e.answer ? true : false;
      });




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
      const thtBoolList=[];
      this.questions.tht.items.forEach(e=>{
        let cntTrue=0;
        e.flag.forEach(ef=>{
          if(ef===true){
            cntTrue++;
          }
        })
          thtBoolList.push(cntTrue===e.cnt?true:false);
      });
      this.boolLists.tht=thtBoolList;




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
      const httAns = [];
      this.questions.htt.userAnswer.forEach((e, index) => {
        let num = 0;
        let flag = false;
        e.forEach((e1, index1) => {
          if (e1 != this.questions.htt.id) {
            if (flag == false) {
              httAns.push(false);
              flag = true;
            }
          } else {
            num++;
          }
        });
        if (num == this.questions.htt.subQuestion[index].answer && flag == 0) {
          httAns.push(true);
          flag = true;
        }
        if (flag == false) {
          httAns.push(false);
          flag = true;
        }
      });

      this.boolLists.htt = httAns;
      //调试用
      console.log(this.boolLists);

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
