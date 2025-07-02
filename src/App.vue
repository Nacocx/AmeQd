<template>
  <div id="app">
    <el-container>
      <el-container>
        <sidebar :student-info="studentInfo" :count-tm="answerStatus" v-if="!isInVideo" />
        <el-main>
          <!-- 题目部分 -->
          <div class="question-container">
            <generate-tm :questions="questions"/>
            <el-button type="primary" @click="willSubmit" id="Submit" size="large">提交答案</el-button>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog v-model="dialogTableVisible" title="答题统计结果:" width="800">
      <tm-percentage :count-tm="countTm" :questions="questions"/>
    </el-dialog>
  </div>
</template>

<script>
import xzt from "@/components/xzt.vue";
import sidebar from "@/components/sidebar.vue";
import tkt from "@/components/tkt.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import Sst from "@/components/sst.vue";
import Htt from "@/components/htt.vue";
import lxt from "@/components/lxt.vue";
import qst from "@/components/qst.vue";
import Tht from "@/components/tht.vue";
import htt_tuo from "@/components/htt_tuo.vue";
import pyt from "@/components/pyt.vue";
import lzt from "@/components/lzt.vue";
import axios from "axios";
import GenerateTm from "@/components/generateTm.vue";
import TmPercentage from "@/components/TmPercentage.vue";

const basePath = import.meta.env.VITE_RES_BASE_PATH;
const baseJsonPath = import.meta.env.VITE_JSON_BASE_PATH;

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
      keys: [],
      dialogTableVisible: false,
      isOnloading: true,
      isInVideo: false,
      currentPage: 1,
    };
  },
  components: {
    TmPercentage,
    GenerateTm,
    Tht,
    Htt,
    Sst,
    tkt,
    xzt,
    sidebar,
    lxt,
    qst,
    htt_tuo,
    pyt,
    lzt
  },
  async created() {
    await this.loadInfo();
    if (this.questions) { // 确保数据存在
      console.log(this.questions);

      await this.calTotalTm();
    } else {
      alert("Network error!");
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
        const { xzt = [] } = this.questions;
        answeredInfo.answeredCount += [...xzt.filter((e) => e.userAnswer)].length;
      }

      // 计算填空题已作答数
      if (this.questions.tkt) {
        this.questions.tkt.forEach((e, index) => {
          let obj = e.userAnswer;
          let values = Object.values(obj);
          values.forEach(el => {
            if (el !== "") {
              answeredInfo.answeredCount++;
            }
          })
        })
      }

      // 计算涂画题已作答数
      if (this.questions.tht && this.questions.tht.items) {
        answeredInfo.answeredCount += this.questions.tht.items.filter(e => e.changed).length;
      }

      // 计算画图题已作答数
      if (this.questions.htt && this.questions.htt.length) {
        let prev = [];
        this.questions.htt.forEach(e => {
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
        this.questions.lxt.forEach(e => {
          e.imgU.forEach((img) => {
            if (img.connected)
              answeredInfo.answeredCount++;
          })
        })



      }

      // 计算数数题已作答数
      if (this.questions.sst && this.questions.sst.length) {
        const { sst = [] } = this.questions;
        answeredInfo.answeredCount += [...sst.filter((e) => e.userAnswer)].length;
      }

      // 计算圈数题已作答数
      if (this.questions.qst && this.questions.qst.length) {
        answeredInfo.answeredCount += this.questions.qst.filter(q => q.changed).length;
      }

      // 计算画图题2已作答数
      if (this.questions.htt_tuo && this.questions.htt_tuo.length) {
        let prev = [];
        this.questions.htt_tuo.forEach(e => {
          e.userAnswer.forEach((ans, index) => {
            if (ans.length !== 0 && prev[index] == null) {
              answeredInfo.answeredCount++;
              prev[index] = ans;
            }
          });
        })
      }

      // 计算拼音题已作答数
      if (this.questions.pyt && this.questions.pyt.length) {
        this.questions.pyt.forEach(e => {
          if (e.changed)
            answeredInfo.answeredCount++;
        })
      }
      // 计算连字题已作答数
      if (this.questions.lzt && this.questions.lzt.length) {
        let isAdded=false;
        this.questions.lzt.forEach(e => {
          e.userAnswer.forEach((ans, index) => {
            if(ans!==0&&!isAdded) {
              answeredInfo.answeredCount++;
              isAdded = true;
            }
          })
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
      this.keys = keys;
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
        htt_tuo: (questions) => questions.htt_tuo.reduce((sum, el) => sum + el.subQuestion.length, 0),
        pyt: (questions) =>questions.pyt.length,
        lzt: (questions) =>questions.lzt.length,
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
    async loadInfo() {
      this.questions = await this.fetchData(`${baseJsonPath}.json`);
      if (baseJsonPath.includes("video")) {
        this.isInVideo = true;
      }
      // this.questions=mockQuestions;
      this.studentInfo = mockStudentInfo;
    },
    /**
     * 获取并处理数据
     * @param url :string
     * @returns {Promise<*|{}|null>}
     */
    async fetchData(url) {
      try {
        const response = await axios.get(url);
        this.isOnloading = false;
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
              case 'pyt':
                this.getPytBoolList();
                break;
              case 'lzt':
                this.getLztBoolList();
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
          console.log(this.asd);

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
     * 获取题目正确列表
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
    },
    getPytBoolList() {
      this.countTm.pyt.right = 0;
      this.boolLists.pyt = [];
      this.questions.pyt.forEach(e=>{
        if(e.isRight===true){
          this.countTm.pyt.right++;
          this.countTm.rightCnt++;
          this.boolLists.pyt.push(true);
        }else{
          this.boolLists.pyt.push(false);
        }
      });
      this.countTm.pyt.percentage = parseFloat((this.countTm.pyt.right / this.countTm.pyt.cnt * 100).toFixed(2));
    },
    getLztBoolList() {
      this.countTm.lzt.right = 0;
      this.boolLists.lzt = [];
      this.questions.lzt.forEach(e=>{
        if(e.flag===true){
          this.countTm.lzt.right++;
          this.countTm.rightCnt++;
          this.boolLists.lzt.push(true);
        }else{
          this.boolLists.lzt.push(false);
        }
      });
      this.countTm.lzt.percentage = parseFloat((this.countTm.lzt.right / this.countTm.lzt.cnt * 100).toFixed(2));
    },
    playAudio(index, e) {
      if (e.touches) {
        e.preventDefault();
      }
      var url_now;
      var audio_now;
      var url_id;
      var a2 = document.querySelector(".newAudio");
      console.log("a2", a2);
      if (a2) {
        a2.pause();         // 暂停播放
        a2.currentTime = 0;
      }
      if (index == -1) {
        // url_now = this.allQuestions[0].;
        // url_id = index;
      }
      else {
        url_now = "../static/static2/assets/import.wav";
        url_id = index;
      }
      audio_now = document.createElement('audio');
      audio_now.classList.add("newAudio");
      audio_now.src = url_now;
      document.body.appendChild(audio_now);
      console.log("a2", a2);
      console.log("audio_now", audio_now);
      if (a2) {
        if (a2.src != audio_now.src || this.audio_isPlay == false) {
          a2.remove();
          audio_now.play();
          this.audio_isPlay = true;
        }
        else {
          a2.remove(); this.audio_isPlay = false;
        }
      }
      else {
        audio_now.play();
        this.audio_isPlay = true;
      }
      this.audio_id = url_id;
      this.audioEle = audio_now;
    },

  }
}




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

.laba {
  width: 30px;
  height: 30px;
  cursor: pointer;
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