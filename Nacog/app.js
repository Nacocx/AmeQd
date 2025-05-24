const app = new Vue({
  data() {
    return {
      questions: mockQuestions,
      img: "sxc.jpg",
      studentInfo: mockStudentInfo,
    };
  },
  components: { xzt, sidebar },
  computed: {
    totalTm() {
      return this.questions.length;
    },
    percentage() {
      return this.questions.length > 0
        ? Math.round((this.answeredCount / this.questions.length) * 100)
        : 0;
    },
    answeredCount() {
      let cnt = 0;
      this.questions.forEach((e) => {
        if (e.selected) {
          cnt++;
        }
      });
      return cnt;
    },
  },
  created() {},
  methods: {
    willSubmit() {
      this.$confirm("你确定要提交答案吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "提交成功!",
          });
          this.submitAnswers();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消提交",
          });
        });
    },
    submitAnswers() {
      // 收集用户选择的答案
      const answers = this.questions.map((q) => ({
        questionId: q.id,
        answer: q.selected,
      }));

      console.log("用户答案:", answers);
      this.checkAnswers(answers);
    },
    checkAnswers(answers) {
      //实际使用中从后端获取
      const corAnswers = [
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
      var boolList = [];
      for (let i = 0; i < answers.length; i++) {
        boolList.push(
          answers[i].answer === corAnswers[i].answer &&
            answers[i].questionId === corAnswers[i].questionId
        );
      }
      console.log(boolList);
    },
  },
}).$mount("#app");
