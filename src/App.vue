<template>
  <div id="app">
<!--    <div v-if="isOnloading">Loading......</div>-->
    <el-container >
      <el-container>
<!--         <sidebar :student-info="studentInfo" :count-tm="answerStatus" />-->
        <el-main>
          <!-- 题目部分 -->
          <div id="chose">
            <div class="question-container">
              <!-- part1_选择题 -->
              <xzt :questions="questions.xzt" v-if="questions.xzt && questions.xzt.length" />
              <!-- part2_填空题 -->
              <tkt :all-questions="questions.tkt" v-if="questions.tkt && questions.tkt.length" />
              <!-- 涂画题 部分 -->
              <template  v-if="questions.tht">
                <tht :items="questions.tht.items" :tuxing-path="questions.tht.tuxingpath" :another="questions.tht.another"/>
              </template>
              <!-- 画图题 部分 -->
              <template v-if="questions.htt && questions.htt.length">
                <div v-for="htt in questions.htt" :key="htt">
                  <htt :message="htt" />
                </div>
              </template>

              <!-- htt_tuo 部分 -->
              <template v-if="questions.htt_tuo && questions.htt_tuo.length">
                <div v-for="htt_tuo in questions.htt_tuo" :key="htt_tuo">
                  <htt_tuo :message="htt_tuo" />
                </div>
              </template>

              <!-- lxt 部分 -->
              <template v-if="questions.lxt && questions.lxt.length">
                <div v-for="lxt in questions.lxt" :key="lxt">
                  <lxt :message="lxt" />
                </div>
              </template>

              <!-- sst 部分 -->
              <template v-if="questions.sst && questions.sst.length">
                <div v-for="sst in questions.sst" :key="sst">
                  <sst :item="sst" />
                </div>
              </template>

              <!-- qst 部分 -->
              <template v-if="questions.qst && questions.qst.length">
                <div v-for="qst in questions.qst" :key="qst">
                  <qst :message="qst" />
                </div>
              </template>

              <el-button type="primary" @click="willSubmit" id="Submit" size="large">提交答案</el-button>

            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>

    <el-dialog v-model="dialogTableVisible" title="答题统计结果:" width="800">
      <span>整体对了{{ countTm.rightCnt }}题,正确率: <el-progress :percentage="countTm.allP" /></span>
      <span v-if="questions.xzt && questions.xzt.length">选择题对了{{ countTm.xzt.right }}题,正确率: <el-progress
          :percentage="countTm.xzt.percentage" /></span>
      <span v-if="questions.tkt && questions.tkt.length">填空题对了{{ countTm.tkt.right }}题,正确率: <el-progress
          :percentage="countTm.tkt.percentage" /></span>
      <span v-if="questions.lxt && questions.lxt.length">连线题对了{{ countTm.lxt.right }}题,正确率: <el-progress
          :percentage="countTm.lxt.percentage" /></span>
      <span v-if="questions.htt && questions.htt.length">画图题对了{{ countTm.htt.right }}题,正确率: <el-progress
          :percentage="countTm.htt.percentage" /></span>
      <span v-if="questions.htt_tuo && questions.htt_tuo.length">画图题对了{{ countTm.htt_tuo.right }}题,正确率: <el-progress
          :percentage="countTm.htt_tuo.percentage" /></span>
      <span v-if="questions.tht">涂画题对了{{ countTm.tht.right }}题,正确率: <el-progress
          :percentage="countTm.tht.percentage" /></span>
      <span v-if="questions.sst && questions.sst.length">数数题对了{{ countTm.sst.right }}题,正确率: <el-progress
          :percentage="countTm.sst.percentage" /></span>
      <span v-if="questions.qst && questions.qst.length">画圈题对了{{ countTm.qst.right }}题,正确率: <el-progress
          :percentage="countTm.qst.percentage" /></span>

    </el-dialog>


  </div>
</template>

<script>
import xzt from "@/components/xzt.vue";
import sidebar from "@/components/sidebar.vue";
import tkt from "@/components/tkt.vue";
import {ElMessage, ElMessageBox} from "element-plus";
import Sst from "@/components/sst.vue";
import Htt from "@/components/htt.vue";
import lxt from "@/components/lxt.vue";
import qst from "@/components/qst.vue";
import Tht from "@/components/tht.vue";
import htt_tuo from "@/components/htt_tuo.vue";
import axios from "axios";

const basePath = import.meta.env.VITE_RES_BASE_PATH;
const baseJsonPath =import.meta.env.VITE_JSON_BASE_PATH;

//实际使用中数据从后端获取
// import logo from "/static/img/T1_tkt_ok/tkt_1.jpeg";   // 必须用 import
// /static2/sx-01-s-01-01-01/img/xx.png

const mockQuestions = {

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


}

const mockStudentInfo = {
  name: "Jack",
  class: "202",
  teacher: "Bob",
};

export default {
  data() {
    return {
      questions: {},
      studentInfo: {},
      boolLists: {},
      countTm: {},
      tmRightCnt: {},
      keys:[],
      dialogTableVisible: false,
      isOnloading:true,
    };
  },
  components: {
    Tht,
    Htt,
    Sst,
    tkt,
    xzt,
    sidebar,
    lxt,
    qst,
    htt_tuo,
  },
  async created() {
    await this.loadInfo();
    if (this.questions) { // 确保数据存在
      await this.calTotalTm();
    }else{
      alert("Network error");
    }
  },
  computed: {
    answerStatus() {
      const answeredInfo = {
        answeredCount: 0,
        totalCount: this.countTm.totalTm || 0,
        percentage: 0
      };

      // 如果没有题目数据，直接返回
      if (!this.questions || answeredInfo.totalCount === 0) {
        return answeredInfo;
      }

      // 计算选择题已作答数
      if (this.questions.xzt && this.questions.xzt.length) {
        const { xzt = []} = this.questions;
        answeredInfo.answeredCount+=[...xzt.filter((e) => e.userAnswer)].length;
      }

      // 计算填空题已作答数
      if (this.questions.tkt) {
        this.questions.tkt.forEach((e, index) => {
          let obj = e.userAnswer;
          let values = Object.values(obj);
          values.forEach(el=>{
            if(el!==""){
              answeredInfo.answeredCount++;
            }
          })
        })
      }

      // 计算涂画题已作答数
      if (this.questions.tht && this.questions.tht.items) {
        answeredInfo.answeredCount +=this.questions.tht.items.filter(e=>e.changed).length;
      }

      // 计算画图题已作答数
      if (this.questions.htt && this.questions.htt.length) {
        let prev = [];
        this.questions.htt.forEach(e=>{
          e.userAnswer.forEach((ans, index) => {
            ans.forEach((e) => {
              if (e !== null && prev[index] == null) {
                answeredInfo.answeredCount++;
                prev[index] = e;
              }
            });
          });
        })
      }

      // 计算连线题已作答数
      if (this.questions.lxt && this.questions.lxt.length) {




      }

      // 计算数数题已作答数
      if (this.questions.sst && this.questions.sst.length) {
        const { sst = [] } = this.questions;
        answeredInfo.answeredCount+=[...sst.filter((e) => e.userAnswer)].length;
      }

      // 计算圈数题已作答数
      if (this.questions.qst && this.questions.qst.length) {
        answeredInfo.answeredCount += this.questions.qst.filter(q => q.changed).length;
      }

      // 计算画图题2已作答数
      if (this.questions.htt_tuo && this.questions.htt_tuo.length) {
        let prev = [];
        this.questions.htt_tuo.forEach(e=>{
          e.userAnswer.forEach((ans, index) => {
              if (ans.length !== 0 && prev[index] == null) {
                answeredInfo.answeredCount++;
                prev[index] = ans;
              }
          });
        })
      }

      // 计算已作答比例
      answeredInfo.percentage = parseFloat((answeredInfo.answeredCount / answeredInfo.totalCount * 100).toFixed(2));

      return answeredInfo;
    }
  },
  methods: {
    /**
     * 计算所有题目的数量
     * @returns {Promise<void>}
     */
    async calTotalTm() {
      const keys = Object.keys(this.questions);
      this.keys=keys;
      // console.log(keys);
      this.countTm.totalTm = 0;


      const typeHandlers = {
        xzt: (questions) => questions.xzt.length,
        sst: (questions) => questions.sst.length,
        tkt: (questions) => questions.tkt.reduce((sum, el) => sum + el.answers.length, 0),
        htt: (questions) => questions.htt.reduce((sum, el) => sum + el.subQuestion.length, 0),
        lxt: (questions) => questions.lxt.reduce((sum, el) => sum + el.imgU.length, 0),
        tht: (questions) => questions.tht.items.length,
        qst: (questions) => questions.qst.length,
        htt_tuo: (questions) => questions.htt_tuo.reduce((sum, el) => sum + el.subQuestion.length, 0)
      };

      keys.forEach(e => {

        if (!this.countTm[e]) {
          this.countTm[e] = { cnt: 0, right: 0, percentage: 0 };
        }

        const handler = typeHandlers[e];
        if (handler) {
          this.countTm[e].cnt = handler(this.questions);
          this.countTm.totalTm += this.countTm[e].cnt;
        }
      });
    },
    /**
     * 获得JSON文件
     * @returns {Promise<void>}
     */
    async loadInfo(){
      this.questions= await this.fetchData(`${baseJsonPath}.json`);

      // this.questions=mockQuestions;
      this.studentInfo=mockStudentInfo;
    },
    /**
     * 获取并处理数据
     * @param url :string
     * @returns {Promise<*|{}|null>}
     */
    async  fetchData(url) {
      try {
        const response = await axios.get(url);
        this.isOnloading=false;
        return this.processPaths(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        return null;
      }
    },

    /**
     * 处理路径占位符
     * @param data
     * @returns {*|{}}
     */
    processPaths(data) {
      const basePath = import.meta.env.VITE_RES_BASE_PATH;

      // 深度遍历对象，只替换VITE_RES_BASE_PATH部分
      const process = (obj) => {
        if (typeof obj === 'string') {
          // 简单替换VITE_RES_BASE_PATH为实际basePath，保留后面的/img/路径
          return obj.replace('VITE_RES_BASE_PATH', basePath);
        }
        if (Array.isArray(obj)) {
          return obj.map(item => process(item));
        }
        if (typeof obj === 'object' && obj !== null) {
          const result = {};
          for (const key in obj) {
            result[key] = process(obj[key]);
          }
          return result;
        }
        return obj;
      };

      return process(data);
    },
    /**
     * 确定是否提交答案
     */
    willSubmit() {
      let remainTm = 0;
      ElMessageBox.confirm(
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
          this.countTm.rightCnt = 0;
          this.countTm.allP = 0.0;
          this.keys.forEach(key => {
            switch (key) {
              case 'xzt':
                this.getXztBoolList();
                break;
              case 'tkt':
                this.getTktBoolList();
                break;
              case 'sst':
                this.getSstBoolList();
                break;
              case 'htt':
                this.getHttBoolList();
                break;
              case 'lxt':
                this.getLxtBoolList();
                break;
              case 'tht':
                this.getThtBoolList();
                break;
              case 'qst':
                this.getQstBoolList(); // 注意函数名是 getQsrBoolList
                break;
              case 'htt_tuo':
                this.getHttTuoBoolList();
                break;
              default:
                console.warn(`未处理 ${key} 类型的函数调用`);
            }
          });
          this.countTm.allP = parseFloat((this.countTm.rightCnt / this.countTm.totalTm * 100).toFixed(2));

          console.log(this.boolLists);
          console.log(this.tmRightCnt);
          console.log(this.countTm);
          console.log(this.questions);
          this.dialogTableVisible = true;

          ElMessage({
            type: "success",
            message: "提交成功!",
          })
        })
      // 取消或报错(e)
      .catch((e) => {
        console.warn("!EVENT:" + e);
        ElMessage({
          type: "info",
          message: "已取消提交",
        })
      });
    },
    /**
     * 获取选择题正确列表
     */
    getXztBoolList() {
      this.countTm.xzt.right = 0;// 初始化选择题正确个数
      this.boolLists.xzt = [];// 初始化选择题正确列表
      this.questions.xzt.forEach((e, index) => {
        if (e.userAnswer === e.answer) {
          this.countTm.xzt.right++;
          this.countTm.rightCnt++;
          this.boolLists.xzt[index] = true;
        } else {
          this.boolLists.xzt[index] = false;//
        }
      });
      this.countTm.xzt.percentage = parseFloat((this.countTm.xzt.right / this.countTm.xzt.cnt * 100).toFixed(2));
    },
    getTktBoolList() {
      this.countTm.tkt.right = 0;
      this.boolLists.tkt = [];
      this.questions.tkt.forEach((e, index) => {
        let obj = e.userAnswer;
        let values = Object.values(obj);
        for (let i = 0; i < e.answers.length; i++) {
          if (values[i] === e.answers[i]) {
            this.countTm.tkt.right++;
            this.countTm.rightCnt++;
            this.boolLists.tkt.push(true);
          } else {
            this.boolLists.tkt.push(false);
          }
        }
      });
      this.countTm.tkt.percentage = parseFloat((this.countTm.tkt.right / this.countTm.tkt.cnt * 100).toFixed(2));
    },
    getSstBoolList() {
      this.countTm.sst.right = 0;
      this.boolLists.sst = [];
      this.questions.sst.forEach(e => {
        if (e.userAnswer === e.title.count) {
          this.countTm.sst.right++;
          this.countTm.rightCnt++;
          this.boolLists.sst.push(true);
        }
        else {
          this.boolLists.sst.push(false);
        }
      });
      this.countTm.sst.percentage = parseFloat((this.countTm.sst.right / this.countTm.sst.cnt * 100).toFixed(2));
    },
    getHttBoolList() {
      this.countTm.htt.right = 0;
      this.boolLists.htt = [];
      this.questions.htt.forEach(e => {
        for (let i = 0; i < e.subQuestion.length; i++) {
          if (e.subQuestion[i].answer === e.userAnswer[i].length) {
            this.countTm.htt.right++;
            this.countTm.rightCnt++;
            this.boolLists.htt.push(true);
          } else {
            this.boolLists.htt.push(false);
          }
        }
      });
      this.countTm.htt.percentage = parseFloat((this.countTm.htt.right / this.countTm.htt.cnt * 100).toFixed(2));
    },
    getLxtBoolList() {
      this.countTm.lxt.right = 0;
      this.boolLists.lxt = [];
      this.questions.lxt.forEach(e => {
        e.result.forEach(el => {

          if (el === true) { this.countTm.lxt.right++; this.countTm.rightCnt++; }
          this.boolLists.lxt.push(el);
        })
      });
      this.countTm.lxt.percentage = parseFloat((this.countTm.lxt.right / this.countTm.lxt.cnt * 100).toFixed(2));
    },
    getThtBoolList() {
      this.countTm.tht.right = 0;
      this.boolLists.tht = [];
      this.questions.tht.items.forEach(e => {
        let cnt = 0; e.flag.forEach(el => {
          if (el) cnt++;
        })
        if (cnt === e.cnt) {
          this.countTm.tht.right++;
          this.countTm.rightCnt++;
          this.boolLists.tht.push(true);
        } else {
          this.boolLists.tht.push(false);
        }
      });
      this.countTm.tht.percentage = parseFloat((this.countTm.tht.right / this.countTm.tht.cnt * 100).toFixed(2));
    },
    getQstBoolList() {
      this.countTm.qst.right = 0;
      this.boolLists.qst = [];
      this.questions.qst.forEach(e => {
        if (e.result === true) {
          this.countTm.qst.right++;
          this.countTm.rightCnt++;
          this.boolLists.qst.push(true);
        } else {
          this.boolLists.qst.push(false);
        }
      });
      this.countTm.qst.percentage = parseFloat((this.countTm.qst.right / this.countTm.qst.cnt * 100).toFixed(2));
    },
    getHttTuoBoolList() {
      this.countTm.htt_tuo.right = 0;
      this.boolLists.htt_tuo = [];
      this.questions.htt_tuo.forEach(a => {
        a.answer.forEach(el => {
          if (el === true) {
            this.countTm.htt_tuo.right++;
            this.countTm.rightCnt++;
            this.boolLists.htt_tuo.push(true);
          } else {
            this.boolLists.htt_tuo.push(false);
          }
        })
      });
      this.countTm.htt_tuo.percentage = parseFloat((this.countTm.htt_tuo.right / this.countTm.htt_tuo.cnt * 100).toFixed(2));
    }

  }
}





// export default {
//   data() {
//     return {
//       questions: mockQuestions,
//       studentInfo: mockStudentInfo,
//       dialogTableVisible: false,
//       boolLists: {
//         xzt: [],
//         tkt: [],
//         sst: [],
//         htt: [],
//         tht: [],
//         qst: [false],
//         lxt_part3: [false],
//         lxt_tuo3: [false]
//       },
//       finalJson: {},
//     };
//   },
//   components: {
//     Tht,
//     Htt,
//     Sst,
//     tkt,
//     xzt,
//     sidebar,
//     circleDrawing: Sst,
//     lxt,
//     qst,
//     htt_tuo

//   },
//   computed: {
//     //计算总题目数
//     countTm() {
//       // TIPS: this.questions || {}：如果 this.questions 是 undefined 或 null，就返回空对象 {}，防止报错。
//       // { xzt = [], sst = [] }：从 this.questions 里取出 xzt 和 sst，如果它们不存在，就默认赋值为空数组 []。
//       const { xzt = [], sst = [] } = this.questions || {};
//       let totalTm = xzt.length + sst.length;

//       let answeredCount = [
//         ...xzt.filter((e) => e.userAnswer), // 筛选出 xzt 里已答的题目
//         ...sst.filter((e) => e.userAnswer), // 筛选出 sst 里已答的题目
//       ].length;

//       // 获得填空题里的题目
//       this.questions.tkt.forEach((question) => {
//         question.userAnswer.forEach((answer) => {
//           // 如果是简单题
//           if (answer.type === "simple") {
//             totalTm += answer.answers.length;
//             answeredCount += answer.answers.filter(
//               (a) => a.trim() !== ""
//             ).length;
//           }
//           // 如果是复杂题(含有次级题目)
//           else {
//             answer.sections.forEach((section) => {
//               totalTm += section.answers.length;
//               answeredCount += section.answers.filter(
//                 (a) => a.trim() !== ""
//               ).length;
//             });
//           }
//         });
//       });

//       // 获得画图题答案
//       totalTm += this.questions.htt.userAnswer.length;

//       // 防止多次计算
//       let prev = [];
//       this.questions.htt.userAnswer.forEach((ans, index) => {

//         ans.forEach((e) => {
//           if (e !== null && prev[index] == null) {
//             answeredCount++;
//             prev[index] = e;
//           }
//         });
//       });

//       // 获得画图题答案
//       totalTm += this.questions.htt_tuo.userAnswer.length;
//       // 防止多次计算
//       let prev2 = [];
//       this.questions.htt_tuo.userAnswer.forEach((ans, index) => {

//         ans.forEach((e) => {
//           if (e !== null && prev2[index] == null) {
//             answeredCount++;
//             prev2[index] = e;

//           }
//         });
//       });

//       // 获得涂画题
//       totalTm += this.questions.tht.items.length;
//       let prevth = []
//       this.questions.tht.items.forEach((e, index) => {
//         if (e.changed === true && !prevth[index]) {

//           prevth.push(true);
//           answeredCount++;
//         }
//       })

//       // 获得圈数题
//       totalTm += 1;
//       if (this.questions.qst.changed) {
//         answeredCount++;
//       }
//       //获得连线题
//       totalTm += 2;
//       if (this.questions.lxt_part3.changed) {
//         answeredCount++;
//       }
//       if (this.questions.lxt_tuo3.changed) {
//         answeredCount++;
//       }

//       const percentage = totalTm
//         ? Math.round((answeredCount / totalTm) * 100)
//         : 0;
//       totalTm;
//       return { totalTm, percentage, answeredCount };
//     },
//   },
//   created() {
//     // this.fetchTmData(); //从后端获得题目数据
//   },
//   mounted() {
//     document.addEventListener("contextmenu", this.preventContextMenu);
//   },
//   methods: {


//     // 计算总体情况
//     calcTotal() {
//       this.submitAnswers();
//       const showBoolLists = this.boolLists;
//       let httRcnt = 0;
//       let lxtRcnt = 0;
//       let tktRcnt = 0;
//       let thtRcnt = 0;
//       let sstRcnt = 0;
//       let xztRcnt = 0;
//       let qstRcnt = 0;
//       let httAll = showBoolLists.htt.concat(showBoolLists.htt_tuo);
//       let lxtAll = showBoolLists.lxt_part3.concat(showBoolLists.lxt_tuo3);
//       httAll.forEach(e => {
//         if (e === true) {
//           httRcnt++;
//         }
//       });
//       lxtAll.forEach(e => {
//         if (e === true) {
//           lxtRcnt++;
//         }
//       });
//       showBoolLists.sst.forEach(e => {
//         if (e === true) {
//           sstRcnt++;
//         }
//       });
//       showBoolLists.tht.forEach(e => {
//         if (e === true) {
//           thtRcnt++;
//         }
//       });
//       showBoolLists.tkt.forEach(e => {
//         if (e === true) {
//           tktRcnt++;
//         }
//       });
//       showBoolLists.xzt.forEach(e => {
//         if (e === true) {
//           xztRcnt++;
//         }
//       });
//       showBoolLists.qst.forEach(e => {
//         if (e === true) {
//           qstRcnt++;
//         }
//       });

//       this.finalJson = {
//         "httR": httRcnt,
//         "httP": parseFloat((httAll?.length ? (httRcnt / httAll.length * 100) : 0).toFixed(2)),

//         "lxtR": lxtRcnt,
//         "lxtP": parseFloat((lxtAll?.length ? (lxtRcnt / lxtAll.length * 100) : 0).toFixed(2)),

//         "tktR": tktRcnt,
//         "tktP": parseFloat((showBoolLists.tkt?.length ? (tktRcnt / showBoolLists.tkt.length * 100) : 0).toFixed(2)),

//         "thtR": thtRcnt,
//         "thtP": parseFloat((showBoolLists.tht?.length ? (thtRcnt / showBoolLists.tht.length * 100) : 0).toFixed(2)),

//         "sstR": sstRcnt,
//         "sstP": parseFloat((showBoolLists.sst?.length ? (sstRcnt / showBoolLists.sst.length * 100) : 0).toFixed(2)),

//         "xztR": xztRcnt,
//         "xztP": parseFloat((showBoolLists.xzt?.length ? (xztRcnt / showBoolLists.xzt.length * 100) : 0).toFixed(2)),

//         "qstR": qstRcnt,
//         "qstP": parseFloat((showBoolLists.qst?.length ? (qstRcnt / showBoolLists.qst.length * 100) : 0).toFixed(2)),

//         "totalR": httRcnt + lxtRcnt + thtRcnt + tktRcnt + sstRcnt + xztRcnt + qstRcnt,
//         "totalP": parseFloat((
//           (httAll?.length +
//             lxtAll?.length +
//             showBoolLists.tht?.length +
//             showBoolLists.tkt?.length +
//             showBoolLists.sst?.length +
//             showBoolLists.xzt?.length +
//             showBoolLists.qst?.length)
//             ? (httRcnt + lxtRcnt + thtRcnt + tktRcnt + sstRcnt + xztRcnt + qstRcnt) /
//             (httAll.length +
//               lxtAll.length +
//               showBoolLists.tht.length +
//               showBoolLists.tkt.length +
//               showBoolLists.sst.length +
//               showBoolLists.xzt.length +
//               showBoolLists.qst.length) * 100
//             : 0
//         ).toFixed(2))
//       };

//       console.log(this.finalJson);
//       this.dialogTableVisible = true;
//     },

//     // 确认是否提交答案
//     willSubmit() {
//       let remainTm = this.countTm.totalTm - this.countTm.answeredCount;
//       ElMessageBox.confirm(
//         // 提示内容
//         remainTm !== 0
//           ? `你确定要提交答案吗?你还剩下${remainTm}个题目没写`
//           : `你确定要提交答案吗?`,
//         // 提示标题
//         "提示",
//         {
//           confirmButtonText: "确定",
//           cancelButtonText: "取消",
//           type: "warning",
//         }
//       )
//         // 确定
//         .then(() => {
//           this.calcTotal();
//           ElMessage({
//             type: "success",
//             message: "提交成功!",
//           })
//         })
//       //取消或报错(e)
//       // .catch((e) => {
//       //   console.log("!ERROR:" + e);
//       //   ElMessage({
//       //     type: "info",
//       //     message: "已取消提交",
//       //   })
//       // });
//     },
//     // 获得填空题答案
//     getFormattedAnswers() {
//       // 初始化结果数组，用于存储所有格式化后的答案
//       const results = [];

//       // 第一层遍历：遍历 questions.tkt 数组（可能是不同页/组的题目集合）
//       this.questions.tkt.forEach((tktItem, tktIndex) => {
//         // tktItem: 当前页/组的题目数据对象
//         // tktIndex: 当前页/组的索引（从0开始）

//         // 第二层遍历：遍历当前页/组的所有用户答案(userAnswer)
//         tktItem.userAnswer.forEach((answer, answerIndex) => {
//           // answer: 单个题目的答案数据
//           // answerIndex: 当前题目在userAnswer数组中的索引（从0开始）

//           // 创建基础答案对象结构
//           const formattedAnswer = {
//             questionId: tktIndex + 1, // 题目ID（页码），+1将索引转为1-based
//             subQuestionId: answerIndex + 1, // 子题ID，+1将索引转为1-based
//             type: answer.type, // 题目类型（'simple'或'complex'）
//           };

//           // 处理简单题型
//           if (answer.type === "simple") {
//             // 使用扩展运算符创建answers数组的浅拷贝
//             // 避免直接引用原数组，防止意外修改原始数据
//             formattedAnswer.answers = [...answer.answers];
//           }
//           // 处理复杂题型
//           else {
//             // 初始化复杂题型的answers数组
//             formattedAnswer.answers = [];

//             // 第三层遍历：遍历复杂题型的各个部分(sections)
//             answer.sections.forEach((section) => {
//               // 对每个section的answers数组进行浅拷贝，然后放入结果
//               formattedAnswer.answers.push([...section.answers]);
//               // 注意：这里是二维数组，每个section的answers作为子数组
//             });
//           }

//           // 将格式化后的答案对象加入结果数组
//           results.push(formattedAnswer);
//         });
//       });

//       // 返回最终的结果数组
//       return results;
//     },
//     // 获得答案
//     submitAnswers() {
//       // 获得选择题正确数组
//       if (this.questions.xzt) {
//         const xztAns = [];
//         this.questions.xzt.forEach((e, index) => {
//           xztAns.push(e.userAnswer);
//           this.boolLists.xzt[index] = e.userAnswer === e.answer ? true : false;
//         });
//       }

//       // 遍历每个TKT模块，获得填空题正确数组
//       const tktBoolList = [];
//       this.questions.tkt.forEach(tktItem => {
//         // 遍历模块中的每个题目
//         tktItem.userAnswer.forEach((userAnswer, questionIndex) => {
//           const correctAnswer = tktItem.answers[questionIndex];

//           if (userAnswer.type === "simple") {
//             // 处理简单题型
//             userAnswer.answers.forEach((userAns, ansIndex) => {
//               // 获取正确答案（支持单值和数组两种格式）
//               const correctValue = Array.isArray(correctAnswer)
//                 ? correctAnswer[ansIndex]
//                 : correctAnswer;

//               // 比较答案（忽略首尾空格）
//               const isCorrect = String(userAns).trim() === String(correctValue).trim();
//               tktBoolList.push(isCorrect);
//             });
//           } else {
//             // 处理复杂题型
//             userAnswer.sections.forEach((section, sectionIndex) => {
//               section.answers.forEach((userAns, ansIndex) => {
//                 // 处理多层嵌套的正确答案结构
//                 let correctValue = correctAnswer;

//                 // 第一层：部分索引
//                 if (Array.isArray(correctAnswer)) {
//                   correctValue = correctAnswer[sectionIndex];

//                   // 第二层：空位索引
//                   if (Array.isArray(correctValue)) {
//                     correctValue = correctValue[ansIndex];
//                   }
//                 }

//                 // 比较答案
//                 const isCorrect = String(userAns).trim() === String(correctValue).trim();
//                 tktBoolList.push(isCorrect);
//               });
//             });
//           }
//         });
//       });
//       this.boolLists.tkt = tktBoolList;

//       // 获得涂画题正确数组
//       const thtBoolList = [];
//       this.questions.tht.items.forEach(e => {
//         let cntTrue = 0;
//         e.flag.forEach(ef => {
//           if (ef === true) {
//             cntTrue++;
//           }
//         })
//         thtBoolList.push(cntTrue === e.cnt ? true : false);
//       });
//       this.boolLists.tht = thtBoolList;

//       // 获得数数题正确数组
//       const sstAns = [];
//       this.questions.sst.forEach((e, index) => {
//         sstAns.push(e.userAnswer);
//         this.boolLists.sst[index] =
//           e.userAnswer == e.title.count ? true : false;
//       });


//       let htt1 = this.questions.htt;
//       let htt2 = this.questions.htt_tuo;

//       this.boolLists.htt = this.getHttBoolList(htt1);
//       this.boolLists.htt_tuo = this.getHttBoolList(htt2);


//       //获得圈数题正确数组
//       if (this.questions.qst.result === true)
//         this.boolLists.qst[0] = true;


//       // 获得连线题正确数组
//       this.boolLists.lxt_part3 = (this.questions.lxt_part3.result);
//       this.boolLists.lxt_tuo3 = (this.questions.lxt_tuo3.result);

//       //调试用
//       console.log(this.questions);
//       console.log(this.boolLists);

//     },
//     // 获得画图题正确列表
//     getHttBoolList(htt) {
//       let httAns = [];
//       htt.userAnswer.forEach((e, index) => {
//         let num = 0;
//         let flag = false;
//         e.forEach((e1, index1) => {
//           if (e1 != ((typeof (htt.id) === "number") ? htt.id : (htt.id[index]))) {
//             if (flag === false) {
//               httAns.push(false);
//               flag = true;
//             }
//           } else {
//             num++;
//           }
//         });
//         if (num == htt.subQuestion[index].answer && flag === false) {
//           httAns.push(true);
//           flag = true;
//         }
//         if (flag === false) {
//           httAns.push(false);
//           flag = true;
//         }
//       });
//       return httAns;
//     },

//     // 禁用右键菜单
//     preventContextMenu(e) {
//       ElMessage("为了更好的体验，右键已被禁用");
//       e.preventDefault();
//     },
//   },
//   beforeDestroy() {
//     document.removeEventListener("contextmenu", this.preventContextMenu);
//   },
// };



</script>
<style>
* {
  user-select: none;
}

.el-aside {
  background-color: white;
  color: #333;
  text-align: center;
  height: 350px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 8px;
  position: fixed;
  background-color: rgba(0, 0, 0, 0);
  width: 200px;
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

#app {
  padding-top: 10px;
}
</style>

<!-- 原本的header   -->
<!-- .el-header {
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
} -->