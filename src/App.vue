

<template>
  <div id="app">
    <el-header>
      <img src="./assets/logo.png" width="50px" height="50px" alt="Logo Missing!">
      <span style="margin-left: 15px; font-size: 18px;">熊猫沉浸</span>
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
              <!-- 选择题模板 -->
              <xzt :questions="questions.xzt" />
              <tkt :all-questions="questions.tkt" />
              <sst :items="questions.sst" />
              <htt :message="questions.htt" />
              <el-button-group>
                <el-button type="default" @click="pageSub" :icon="ArrowLeft" size="large" :disabled="currentPage===1">Last Part</el-button>
                <el-button type="primary" @click="willSubmit" id="Submit" size="large">提交答案</el-button>
                <el-button type="default" @click="pageAdd" size="large" :disabled="currentPage===4">Next Part<el-icon class="el-icon--right"><ArrowRight /></el-icon></el-button>
              </el-button-group>


            </div>
          </div>
        </el-main>
      </el-container>


    </el-container>

  </div>

</template>

<script>
import xzt from '@/components/xzt.vue'
import sidebar from "@/components/sidebar.vue";
import tkt from "@/components/tkt.vue";
import {ArrowLeft, ArrowRight} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import Sst from "@/components/sst.vue";
import Htt from "@/components/htt.vue";




//实际使用中数据从后端获取
const mockQuestions={
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
      userAnswer: [
        {
          type: 'complex',
          sections: [
            { answers: ['', ''] }, // 第一部分
            { answers: ['', ''] }  // 第二部分
          ]
        },
        {
          type: 'simple',
          answers: ['', '']
        },{
          type: 'simple',
          answers: ['', '']
        },{
          type: 'simple',
          answers: ['', '']
        },{
          type: 'simple',
          answers: ['', '']
        },
      ],
    },{
      id: 2,
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
      userAnswer: [
        {
          type: 'complex',
          sections: [
            { answers: ['', ''] }, // 第一部分
            { answers: ['', ''] }  // 第二部分
          ]
        },
        {
          type: 'simple',
          answers: ['', '']
        },{
          type: 'simple',
          answers: ['', '']
        },{
          type: 'simple',
          answers: ['', '']
        },{
          type: 'simple',
          answers: ['', '']
        },
      ],
    },
  ],

  htt:{
    id: 1,//1对应矩形 2对应三角形 3对应圆形
    title: "画图题",
    subQuestion: [
      {
        id: 1,
        img: "./img/t1.png",
        answer: 2,
      },
      {
        id: 2,
        img: "./img/t2.png",
        answer: 3,
      },
      {
        id: 3,
        img: "./img/t3.png",
        answer: 5,
      },
      {
        id: 4,
        img: "./img/t4.png",
        answer: 4,
      },
    ],
    shape: ["./img/jx.png", "./img/sjx.png", "./img/yx.png"],//有那些形状图形可以选择
    trueShape: 1,
    userAnswer: [
      [],
      [],
      [],
      [],
    ],
    isDragging: false,//是否正在拖拽
    startX: 0,//相对于鼠标的偏移量
    startY: 0,
    draggedElement: null,//正在拖拽的元素

  },

};

const mockStudentInfo = {
  name: "Jack",
  class: "202",
  teacher: "Bob",
};

const mockCorAnswers = [
  {
    questionId: 1,
    answer: "B",
  },
  {
    questionId: 2,
    answer: "D",
  },
  {
    questionId: 3,
    answer: "C",
  },
];



export default {
  data() {
    return {
      questions: mockQuestions,
      studentInfo: mockStudentInfo,
      corAnswers: mockCorAnswers,
      currentPage:1 ,


    };
  },
  components: {Htt, Sst, ArrowRight, tkt, xzt, sidebar ,circleDrawing: Sst},
  computed: {
    ArrowLeft() {
      return ArrowLeft
    },
    countTm() {
      // TIPS: this.questions || {}：如果 this.questions 是 undefined 或 null，就返回空对象 {}，防止报错。
      // { xzt = [], sst = [] }：从 this.questions 里取出 xzt 和 sst，如果它们不存在，就默认赋值为空数组 []。
      const { xzt = [], sst = [] } = this.questions || {};
      let totalTm = xzt.length + sst.length;

      let answeredCount = [
        ...xzt.filter(e => e.userAnswer),// 筛选出 xzt 里已答的题目
        ...sst.filter(e => e.userAnswer),// 筛选出 sst 里已答的题目
      ].length;

      // 获得填空题里的题目
      this.questions.tkt.forEach(question => {
        question.userAnswer.forEach(answer => {
          // 如果是简单题
          if (answer.type === 'simple') {
            totalTm += answer.answers.length;
            answeredCount += answer.answers.filter(a => a.trim() !== '').length;
          }
          // 如果是复杂题(含有次级题目)
          else {
            answer.sections.forEach(section => {
              totalTm += section.answers.length;
              answeredCount += section.answers.filter(a => a.trim() !== '').length;
            });
          }
        });
      });

      // 获得画图题答案
      totalTm+=this.questions.htt.userAnswer.length;
      this.questions.htt.userAnswer.forEach(ans=>{
        ans.forEach(e=>{
          if(e!==null)
            answeredCount++;
        })
      })

      const percentage = totalTm ? Math.round((answeredCount / totalTm) * 100) : 0;

      return { totalTm, percentage, answeredCount };
    },
  },
  created() {},
  mounted() {
    document.addEventListener('contextmenu', this.preventContextMenu);
    },
  methods: {
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
            this.submitAnswers();
            this.$message({
              type: "success",
              message: "提交成功!",
            });
          })
          //取消或报错(e)
          .catch((e) => {
            // console.log(e)
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
            type: answer.type // 题目类型（'simple'或'complex'）
          };

          // 处理简单题型
          if (answer.type === 'simple') {
            // 使用扩展运算符创建answers数组的浅拷贝
            // 避免直接引用原数组，防止意外修改原始数据
            formattedAnswer.answers = [...answer.answers];
          }
          // 处理复杂题型
          else {
            // 初始化复杂题型的answers数组
            formattedAnswer.answers = [];

            // 第三层遍历：遍历复杂题型的各个部分(sections)
            answer.sections.forEach(section => {
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

      // 获得选择题答案
      const xztAns=[];
       this.questions.xzt.forEach(e=>{
         xztAns.push(e.userAnswer);
      })
      // 获得填空题答案
      const tktAns=this.getFormattedAnswers();
      // 获得数数题答案
      const sstAns=[];
      this.questions.sst.forEach(e=>{
        sstAns.push( e.userAnswer);
      })

      // console.log(tktAns);
      // console.log(sstAns);
      // console.log(xztAns);
      // this.checkAnswers(xztAns);
      const httAns=[];
      this.questions.htt.userAnswer.forEach(ans=>{
        httAns.push(ans)
      })
      const finalAns={
        xzt:xztAns,
        sst:sstAns,
        tkt:tktAns,
        htt:httAns,
      };
      console.log(finalAns);
    },

    // checkAnswers(answers) {
    //
    //   let boolList = [];
    //   for (let i = 0; i < answers.length; i++) {
    //     boolList.push(
    //         answers[i].answer === this.corAnswers[i].answer
    //         // && answers[i].questionId === this.corAnswers[i].questionId
    //     );
    //   }
    //   console.log(boolList);
    // },

    pageAdd(){
      if(this.currentPage<5) {
        this.currentPage++;
        document.documentElement.scrollTop = 0;
      }
    },
    pageSub(){
      if(this.currentPage>1) {
        this.currentPage--;
        document.documentElement.scrollTop = 0;
      }
    },
    // 禁用右键菜单
    preventContextMenu(e) {
      ElMessage('为了更好的体验，右键已被禁用')
      e.preventDefault();
    }
  },
  beforeDestroy() {
    document.removeEventListener('contextmenu', this.preventContextMenu);
  },



}

</script>

<!-- 更改选择题前框的大小-->

<style>
.el-radio__inner {
  width: 30px;
  height: 30px;
}

*{
  user-select: none;
}
.el-aside {
  background-color: white;
  color: #333;
  text-align: center;
  height: 500px;
  line-height: 35px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 8px;
  position: fixed;
  width: 350px;
}

.el-main {
  color: #333;
  text-align: center;
  border: 1px white solid;
  max-width: 1000px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 8px;
  margin: auto;
}


.el-progress-bar {
  width: 75%;
  margin-top: 30px;
}

#app{
  padding-top: 60px;
}

.el-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px !important;
  /* 固定高度 */
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  align-items: center;
  padding: 0 20px;
}
</style>