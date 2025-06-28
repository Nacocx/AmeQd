<template id="xzt">
  <div class="xzt_main">

    <div class="title">
      <div>
        <h1>选择题部分</h1>
      </div>
      <div>
        <img :src="questions[0].audio_img" alt="" class="laba" @click="playAudio(0)" @touchend="playAudio(0)">
      </div>

    </div>

    <div class="xzt_question-item" v-for="(question, index) in questions" :key="question.id">

      <div class="title">
        <div>
          <h2>第{{ index + 1 }}题: {{ question.title }}</h2>
        </div>
        <div>
          <img :src="question.audio_img" alt="" class="laba" @click="playAudio(0)" @touchend="playAudio(0)">
        </div>

      </div>


      <br>
      <img v-if="question.img" v-bind:src="question.img" class="tmImg" alt="Image Missing!" />
      <br>
      <div class="options">
        <el-radio-group v-model="question.userAnswer">
          <el-radio v-for="option in question.options" :key="option.value" :value="option.value"
            :name="'question_' + question.id">
            <!-- 若有img，就渲染img，若无就渲染label -->
            <img v-if="option.img" :src="option.img" alt="Image Missing!" />
            <span v-else style="font-size: 20px">{{ option.value }}:{{ option.label }}</span>
          </el-radio>
        </el-radio-group>
      </div>
      <br>
    </div>
    <br>
    <hr />
  </div>
</template>

<script>
export default {
  name: 'Xzt',
  props: {
    questions: {
      type: Array,
      required: true,
    },
  }, methods: {
    playAudio(index) {
      var url_now;
      var audio_now;
      var url_id;
      var a2 = document.querySelectorAll(".newAudio");
      console.log("a2", a2);
      if (a2) {
        a2.forEach(e => {
          e.pause();         // 暂停播放
          e.currentTime = 0;
          e.remove();
        })
      }
      if (index == -1) {
        // url_now = this.allQuestions[0].;
        // url_id = index;
      }
      else {
        url_now = this.message.audios[index];
        url_id = index;
      }
      audio_now = document.createElement('audio');
      audio_now.classList.add("newAudio");
      audio_now.src = url_now;
      document.body.appendChild(audio_now);
      audio_now.play();
      this.audio_isPlay = true;
      this.audio_id = url_id;
      this.audioEle = audio_now;
    },

  }

};

</script>
<style scoped>
.title {
  /* background-color: #4CAF50; */
  text-align: center;
  display: flex;
  /* 使用 flex 布局 */
  align-items: center;
  /* 垂直居中对齐 */
  justify-content: center;
  gap: 10px;
}

.title h2 {
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

.xzt_main {
  /* text-align: center; */
}

.el-radio__inner {
  transform: scale(1.22);
}

.xzt_question-item {
  display: block !important;
  text-align: left;
  margin-bottom: 30px;
  /* 题目间增加间距 */
}


/* 全局限制图片 */
.xzt_question-item img {
  /* background-color: #117f7d; */
  max-width: 100%;

  max-height: 200px;
  object-fit: contain;
  display: block;
  margin: 5px auto;
}



/* 选项图片额外限制 */
.options img {
  max-height: 150px !important;
}
</style>