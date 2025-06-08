<template>
  <section class="question-container">
    <div v-for="(questionGroup) in allQuestions" :key="'group-' + questionGroup.id" class="question-part">
      <h1 class="question-title" v-if="questionGroup.title_main">{{ questionGroup.title_main }}</h1>
      <div v-if="questionGroup.img" class="question-image">
        <img :src="questionGroup.img" :alt="'第' + questionGroup.id + '题图片'">
      </div>
      <div class="question-content">
        <div v-for="(title, titleIndex) in questionGroup.title" :key="'title-' + titleIndex" class="question-item">
          <h2 class="question-subtitle">{{ title }}</h2>
          <div v-for="(subPart, subIndex) in splitByTSPL(questionGroup.subQuestions[titleIndex])" :key="'sub-' + subIndex">
            <span v-for="(segment, segmentIndex) in splitByTNUM(subPart)" :key="'segment-' + segmentIndex">
              <template v-if="segment !== 'TNUM'">{{ segment }}</template>
              <el-input
                v-else
                v-model="questionGroup.userAnswer[`${titleIndex}-${subIndex}-${segmentIndex}`]"
                style="width: 60px;"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "tkt",
  data() {
    return {
    }
  },
  props: {
    allQuestions: {
      type: Array,
      required: true,
    }
  },
  methods: {
    splitByTSPL(text) {
      return text.split('TSPL');
    },
    splitByTNUM(text) {
    // 保留 TNUM 用于判断，但渲染时隐藏
    return text.split(/(TNUM)/g);
  }
  }
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
img {
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