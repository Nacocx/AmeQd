<template>
  <section class="question-container">
    <div v-for="(questionGroup) in allQuestions" :key="'group-' + questionGroup.id" class="question-part">

      <div class="title2">

        <div>
          <h1 v-if="questionGroup.title_main">{{ questionGroup.title_main }}</h1>
        </div>

        <div>
          <!-- {{ jia() }} -->
          <img :src="allQuestions[0].audio_img" alt="" class="laba" @click="playAudio(-1)" @touchend="playAudio(-1)">
        </div>
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
        url_now = this.allQuestions[0].audio_title;
        url_id = index;
      }
      else {
        url_now = this.allQuestions[0].audios[index];
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
.title2 {
  /* background-color: #4CAF50; */
  text-align: center;
  display: flex;
  /* 使用 flex 布局 */
  align-items: center;
  /* 垂直居中对齐 */
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.title {
  /* background-color: #4CAF50; */
  /* text-align: center; */
  display: flex;
  /* 使用 flex 布局 */
  /* align-items: center; */
  /* 垂直居中对齐 */
  /* justify-content: center; */
  gap: 10px;
  margin-bottom: 20px;
}

.title h1 {
  margin: 0;
  /* 移除 h1 默认的外边距 */
  padding: 0;
}

.laba_div {
  width: 30px;
  height: 30px;
}

.laba {
  width: 30px;
  height: 30px;
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