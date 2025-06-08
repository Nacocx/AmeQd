<template>
  <section class="question-container">
    <div
        v-for="(questionGroup) in allQuestions"
        :key="'group-' + questionGroup.id"
        :id="'part-' + questionGroup.id"
        class="question-part"
    >
    
      <!-- <h1 class="question-title">当前第 {{ questionGroup.id }} 题</h1> -->
      <!-- <h1>当前第 {{ questionGroup.id }} 题</h1> -->
      <h1>{{questionGroup.title_main}}</h1>
      <div v-if="questionGroup.img" class="question-image">
        <img :src="questionGroup.img" :alt="'第' + questionGroup.id + '题图片'">
      </div>

      <div class="question-content">
        <div
            v-for="(title, titleIndex) in questionGroup.title"
            :key="'title-' + titleIndex"
            class="question-item"
        >
          <h2 class="question-subtitle">{{ title }}</h2>

          <!-- 简单问题渲染 -->
          <template v-if="questionGroup.userAnswer[titleIndex].type === 'simple'">
            <span v-for="(part, partIndex) in splitQuestion(questionGroup.subQuestions[titleIndex])" :key="'part-' + partIndex">
              {{ part }}
              <el-input
                  v-if="partIndex !== splitQuestion(questionGroup.subQuestions[titleIndex]).length - 1"
                  style="width: 100px;"
                  v-model="questionGroup.userAnswer[titleIndex].answers[partIndex]"
              ></el-input>
            </span>
          </template>

          <!-- 复杂问题渲染 -->
          <template v-else>
            <div
                v-for="(section, sectionIndex) in questionGroup.userAnswer[titleIndex].sections"
                :key="'section-' + sectionIndex"
                class="question-section"
            >
              <span v-for="(part, partIndex) in splitQuestion(getSectionText(questionGroup.subQuestions[titleIndex], sectionIndex))"
                    :key="'section-part-' + partIndex">
                {{ part }}
                <el-input
                    v-if="partIndex !== splitQuestion(getSectionText(questionGroup.subQuestions[titleIndex], sectionIndex)).length - 1"
                    style="width: 100px;"
                    v-model="questionGroup.userAnswer[titleIndex].sections[sectionIndex].answers[partIndex]"
                ></el-input>
              </span>
            </div>
          </template>

        </div>
      </div>
    </div>
  </section>
  <br>
<!--  如果填空题只有一个，就没必要显示翻页按钮-->
  <!-- <el-button-group>
    <el-button type="primary" @click="pageSub" :disabled="currentPage===1">上一题</el-button>
    <el-button type="primary" @click="pageAdd" :disabled="currentPage===allQuestions.length">下一题</el-button>
  </el-button-group> -->
  <br>
  <hr/>

</template>


<script>
export default {
  name:"tkt",
  data(){
    return{// 所有问题
      // currentPage:1, //当前页面
      // tkt_nowPos: 1, // 当前问题的索引
      results: [], // 存储每个问题的结果

    }
  },
  props:{
    allQuestions:{
      type:Array,
      required:true,
    }
  },
  computed: {
    // 扁平化用户答案数组
    flattenedUserAnswers() {
      return this.processAnswers('userAnswer');
    },
    // 扁平化标准答案数组
    flattenedCorrectAnswers() {
      return this.processAnswers('answers');
    }
  },
  methods: {
    // 统一处理答案数组
    processAnswers(answerType) {
      const result = [];
      
      this.allQuestions.forEach(questionGroup => {
        questionGroup.title.forEach((_, titleIndex) => {
          const answers = questionGroup[answerType][titleIndex];
          const subQText = questionGroup.subQuestions[titleIndex];
          
          if (answers.type === 'simple') {
            // 简单类型直接添加答案
            result.push(...answers.answers);
          } else {
            // 复杂类型合并所有section的答案
            answers.sections.forEach(section => {
              result.push(...section.answers);
            });
          }
        });
      });
      
      return result;
    },
    splitQuestion(text) {
      return text.split('TNUM');
    },

    // 获取复杂问题的特定部分文本
    getSectionText(text, sectionIndex) {
      return text.split('TSPL')[sectionIndex];
    },




// pageAdd(){
    //   if(this.currentPage<this.allQuestions.length) {
    //     this.currentPage++;
    //     document.documentElement.scrollTop = 0;
    //   }
    // },
    // pageSub(){
    //   if(this.currentPage>1) {
    //     this.currentPage--;
    //     document.documentElement.scrollTop = 0;
    //   }
    // },
    // 验证是否所有问题都已回答
    // validateAnswers() {
    //   return this.allQuestions[this.currentPage - 1].userAnswer.every(answer => {
    //     if (answer.type === 'simple') {
    //       return answer.answers.every(item => item.trim() !== '');
    //     } else {
    //       return answer.sections.every(section =>
    //           section.answers.every(item => item.trim() !== '')
    //       );
    //     }
    //   });
    // },
    /**
     * 触发提交答案的确认操作
     * 弹出确认对话框，询问用户是否确定提交答案
     * 根据用户的选择执行相应操作
     */
    // tkt_willSubmit() {
    //   // 调用 Element UI 的 confirm 方法弹出确认对话框
    //   this.$confirm("你确定要提交答案吗?", "提示", {
    //     confirmButtonText: "确定", // 确认按钮显示的文本
    //     cancelButtonText: "取消", // 取消按钮显示的文本
    //     type: "warning", // 对话框类型为警告，会显示对应的图标
    //   })
    //       // 当用户点击确认按钮时执行
    //       .then(() => {
    //         // 调用 Element UI 的 message 方法显示提交成功的提示信息
    //         this.$message({
    //           type: "success", // 提示信息类型为成功，显示绿色提示框
    //           message: "提交成功!", // 提示框显示的内容
    //         });
    //         // 调用 tkt_submit 方法进行答案提交操作
    //         this.tkt_submit();
    //       })
    //       // 当用户点击取消按钮时执行
    //       .catch(() => {
    //         // 调用 Element UI 的 message 方法显示已取消提交的提示信息
    //         this.$message({
    //           type: "info", // 提示信息类型为信息，显示蓝色提示框
    //           message: "已取消提交", // 提示框显示的内容
    //         });
    //       });
    // },
    /**
     * 执行答案提交操作，对比用户答案和正确答案，并存储对比结果
     * 后续会将结果返回给后端
     */
    // tkt_submit() {
    //   // 清空之前存储的答题结果数组，确保每次提交都是新的结果
    //   this.results = [];
    //
    //   // 遍历所有问题
    //   this.allQuestions.forEach((question) => {
    //     // 遍历当前问题的所有答案组
    //     question.answers.forEach((answerGroup, j) => {
    //       // 遍历当前答案组的所有答案项
    //       answerGroup.forEach((answer, k) => {
    //         // 判断当前答案项是否为数组
    //         if (Array.isArray(answer)) {
    //           // 若答案项为数组，遍历数组中的每个答案
    //           answer.forEach((answer0, i) => {
    //             // 对比用户答案和正确答案，将比较结果（布尔值）添加到 results 数组中
    //             this.results.push(question.userAnswers[j][k][i] === question.answers[j][k][i]);
    //           });
    //         } else {
    //           // 若答案项不是数组，直接对比用户答案和正确答案，并将结果添加到 results 数组中
    //           this.results.push(question.userAnswers[j][k] === question.answers[j][k]);
    //         }
    //       });
    //     });
    //   });
    //
    //   // 以下代码用于后续将结果返回给后端，目前仅作日志输出
    //   // 打印所有问题的正确答案
    //   console.log("答案：", this.allQuestions.map(q => q.answers));
    //   // 打印所有问题的用户答案
    //   console.log("用户答案: ", this.allQuestions.map(q => q.userAnswers));
    //   // 打印答案对比结果
    //   console.log("结果: ", this.results);
    // },
    //上一题内容
    // tkt_preQuestion() {
    //   // 切换到上一个问题
    //   if (this.tkt_nowPos > 1) {
    //     this.tkt_nowPos--;
    //   } else {
    //   }
    // },
    // tkt_nextQuestion() {
    //   // 切换到下一个问题
    //   if (this.tkt_nowPos < 2) {
    //     this.tkt_nowPos++;
    //   } else {
    //
    //   }
    // },

  },

}
</script>

<style scoped>

.question-subtitle {
  font-size: 19px;
}

.question-container {
  text-align: center;

}

.question-content {
  width: 80%;
  display: inline-block;
  text-align: left;

  /* background-color: aqua; */
}

.question-title {
  height: 2%;
}

.question-title {
  height: auto;
  /* 调整高度为自动适应内容 */
  padding: 15px;
  /* 添加内边距 */
  background-color: #4CAF50;
  /* 设置背景颜色 */
  color: white;
  /* 设置文字颜色 */
  font-size: 20px;
  /* 设置文字大小 */
  font-weight: bold;
  /* 设置文字加粗 */
  text-align: center;
  /* 文字居中对齐 */
  border-radius: 8px 8px 0 0;
  /* 设置顶部圆角 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* 添加阴影效果 */
  margin-bottom: 20px;
  /* 添加底部外边距 */
}



/* 图片在盒子大小 */
img {
  width: 60%;
  height: 100%;
  margin: auto;
}
/* 图片盒子位置 */
img{
  width: 100%;
  height: 40%;
  text-align: center;
}

/* 规范所有part的位置 */
.question-part {
  display: block;
  width: 100%;
  height: 98%;
}

</style>



<!--.tkt_main_questions {-->
<!--  height: 100%;-->
<!--  overflow: auto;-->
<!--}-->


<!--.tkt_main_part {-->
<!--position: absolute;-->
<!--top: 50%;-->
<!--left: 50%;-->
<!--width: 60%;-->
<!--height: 90%;-->
<!--transform: translate(-50%, -55%);-->
<!--border: 1px solid black;-->
<!--border-radius: 10px;-->
<!--}-->




<!--.tkt_main_part #part1 .tkt_mainQuestion {-->
<!--  width: 80%;-->
<!--  height: 60%;-->
<!--  margin: auto;-->
<!--  overflow: auto;-->
<!--  /* 当内容超出容器时自动显示滚动条 */-->

<!--}-->

<!--.tkt_main_part #part1 .tkt_mainQuestion input {-->
<!--  padding: 8px 12px;-->
<!--  width: 20px;-->
<!--  height: 10px;-->
<!--  border: 1px solid transparent;-->
<!--  border-bottom: 2px solid #ccc;-->
<!--  border-radius: 4px;-->
<!--  font-size: 20px;-->
<!--  transition: all 0.3s ease;-->
<!--  margin: 0 5px;-->
<!--}-->

<!--.tkt_main_part #part1 .tkt_mainQuestion input:focus {-->
<!--  border-color: #4CAF50;-->
<!--  box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);-->
<!--  outline: none;-->
<!--}-->

<!--.tkt_main_part #part1 .tkt_mainQuestion input:hover {-->
<!--  border-color: #888;-->
<!--}-->

