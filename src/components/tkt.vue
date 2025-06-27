<template>
  <section class="question-container">
    <div v-for="(questionGroup) in allQuestions" :key="'group-' + questionGroup.id" class="question-part">

      <div>
        <h1 v-if="questionGroup.title_main">{{ questionGroup.title_main }}</h1>
        <!-- <img :src="allQuestions[0].audio_img" alt="" class="laba" @click="playAudio(0)" @touchend="playAudio()"> -->
      </div>

      <div v-if="questionGroup.img" class="question-image">
        <img :src="questionGroup.img" :alt="'第' + questionGroup.id + '题图片'">
      </div>
      <div class="question-content">
        <div v-for="(title, titleIndex) in questionGroup.title" :key="'title-' + titleIndex" class="question-item">

          <div class="title">
            <div>
              <h2 class="question-subtitle">{{ title }}</h2>
            </div>
            <!-- <div>
              <img :src="allQuestions[0].audio_img" alt="" class="laba" @click="playAudio(0)" @touchend="playAudio(0)">
            </div> -->

          </div>
          <div v-for="(subPart, subIndex) in splitByTSPL(questionGroup.subQuestions[titleIndex])"
            :key="'sub-' + subIndex">

            <div class="title">
              <div>
                <span v-for="(segment, segmentIndex) in splitByTNUM(subPart)" :key="'segment-' + segmentIndex">

                  <template v-if="segment !== 'TNUM'">{{ segment }}</template>
                  <el-input v-else v-model="questionGroup.userAnswer[`${titleIndex}-${subIndex}-${segmentIndex}`]"
                    style="width: 60px;" />

                </span>
              </div>
              <div>
                <!-- {{ jia() }} -->
                <img :src="allQuestions[0].audio_img" alt="" class="laba" @click="playAudio(titleIndex)"
                  @touchend="playAudio(titleIndex)">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr>
  </section>
</template>

<script>
export default {
  name: "tkt",
  data() {
    return {
      num: "0",
    }
  },
  props: {
    allQuestions: {
      type: Array,
      required: true,
    }
  },
  methods: {
    jia() {
      this.num++;
      console.log(this.num);

    },

    playAudio(index) {
      console.log(index);

      var url_now;
      var audio_now;
      var url_id;
      if (this.audio_isPlay) {
        if (index == this.audio_id) {
          // console.log("zai");
          // 停止播放并重置到开始位置
          this.audioEle.pause();         // 暂停播放
          this.audioEle.currentTime = 0; // 重置播放位置到 0 秒

          this.audioEle = "";
          this.audio_isPlay = false;
          return;
        }
        else {
          this.audioEle.pause();         // 暂停播放
          this.audioEle.currentTime = 0;
          this.audioEle = "";
        }
      }
      url_now = this.allQuestions[0].audios[index];
      url_id = index;
      audio_now = document.createElement('audio');
      audio_now.src = url_now;
      audio_now.play();
      this.audio_isPlay = true;
      this.audio_id = url_id;
      this.audioEle = audio_now;


    },



    splitByTSPL(text) {
      // console.log(this.allQuestions);
      // console.log("??", this.allQuestions[0].audio_img);


      return text.split('TSPL');
    },
    splitByTNUM(text) {
      // 保留 TNUM 用于判断，但渲染时隐藏
      return text.split(/(TNUM)/g);
    }
  }, watch: {
    allQuestions: {
      immediate: true,
      deep: true,
      handler(newVal) {
        newVal.forEach(questionGroup => {
          if (!questionGroup.userAnswer) {
            questionGroup.userAnswer = {};
          }

          questionGroup.title.forEach((_, titleIndex) => {
            const subParts = this.splitByTSPL(questionGroup.subQuestions[titleIndex]);
            subParts.forEach((subPart, subIndex) => {
              const segments = this.splitByTNUM(subPart);
              segments.forEach((segment, segmentIndex) => {
                if (segment === 'TNUM') {
                  const key = `${titleIndex}-${subIndex}-${segmentIndex}`;
                  if (!questionGroup.userAnswer[key]) {
                    questionGroup.userAnswer[key] = '';
                  }
                }
              });
            });
          });
        });
      }
    }
  }
}
</script>

<style scoped>
.title {

  display: flex;
  /* 使用 flex 布局 */

  gap: 10px;
}


.laba {
  width: 30px;
  height: 30px;
  margin: -2px;
  cursor: pointer;
}

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