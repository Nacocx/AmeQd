const app = new Vue({
  data() {
    return {
      questions: mockQuestions,
      img: "sxc.jpg",
    };
  },
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

    },
  },
}).$mount("#app");
