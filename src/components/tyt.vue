<template>
  <div id="start">

    <span>
      <span id="title">{{question.title}}</span>
      <img :src="question.audio_img" alt="" class="laba"
           @click="playAudio(0,$event)"
           @touchend="playAudio(0,$event)"/></span>
    <span id="btn">
      <el-button @click="undo()" v-if="!canBeUndo" disabled type="info">撤销当前操作(Undo)</el-button>
      <el-button @click="undo()" v-if="canBeUndo" type="danger">撤销当前操作(Undo)</el-button>
    </span>

  </div>

  <div id="outside">
    <div id="answerContainer">
        <span v-for="tone in historyStack" :key="tone">{{toneMarks[tone]}}</span>
    </div>
  </div>
  <div class="tone-selector-tyt">
    <el-button-group v-for="tone in 4" :key="tone" class="tone-option">
      <el-button @click="pushTone(tone)"> {{ toneMarks[tone] }} ({{ tone }}声)</el-button>
    </el-button-group>
  </div>
  <hr/>
  <br>
</template>
<script>
export default {
  name: 'tyt',
  props: {
    question: {
      type: Object,
      required: true,
    }
  },
    data(){
    return {
      audio_isPlay: false,
      audio_id: -1,
      audioEle: "",
      historyStack:[],
      toneMarks: {
        0: '',
        1: '¯',
        2: '´',
        3: 'ˇ',
        4: '`'
      },
    }
    },
  computed: {
    canBeUndo(){
      return this.historyStack.length > 0
    }
  },
  methods:{
    pushTone(tone){
      this.historyStack.push(tone);
      console.log(tone)
      this.question.changed=true;
      this.question.isRight = !!this.isRight();
    },
    undo(){
      if(this.historyStack.length > 0)
        this.historyStack.pop();
      if(this.historyStack.length===0)
        this.question.changed=false;
      this.question.isRight = !!this.isRight();
    },
    isRight(){
      return this.historyStack.length === this.question.answerList.length &&
          this.historyStack.every((val, i) =>
              this.question.answerList[i] === 0 || val === this.question.answerList[i]
          );
    },
    playAudio(index,e) {
      if(e.touches){
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
        url_now = this.question.audio_title;
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

  },
};
</script>
<style>
#answerContainer{
  height: 50px;
  min-width: 200px;
  border-radius: 5px;
  border: 1px dashed #ccc;
  font-size: 50px;
}
#outside{
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
#start {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#title{
  font-size: 25px;
  font-weight: bold;
  margin-right: 10px;

}
.tone-selector-tyt{
  margin-bottom: 20px;
  margin-top: 20px;
}
.laba {
  width: 30px;
  height: 30px;
  cursor: pointer;
}
</style>