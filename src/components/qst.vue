<!-- 圈图形中物品数量的题目 -->
<template>
  <div class="qst_mian_body" id="qst">
    <header>
      <div class="title">


        <h1> {{ message.title }}</h1>
        <img :src="message.audio_img" alt="" class="laba" @click="playAudio(0,$event)" @touchend="playAudio(0,$event)">
      </div>

      <div>

      </div>

    </header>

    <div class="main_body">
      <div class="left">
        <div class="example">
          <img :src="message.example.t_img" alt="" class="img1">
          <img :src="message.img" alt="" class="img1">
          <img :src="message.example.a_img" alt="" class="img1">
        </div>
      </div>
      <div class="right">
        <img :src="message.question.t_img" alt="" class="img1">
        <div class="right_r">
          <div class="options">
            <div class="qst_option" ref="optionElements" v-for="e in message.question.num">
              <img :src="message.question.n_img" alt="">
            </div>
          </div>
        </div>
        <canvas width="350" height="250" id="c1" ref="canvas" class="qst" @mousedown="mouseDown" @touchstart="mouseDown"
          @mouseup="mouseUp" @touchend="mouseUp"></canvas>
      </div>
    </div>
  </div>
  <hr>

</template>

<script>

export default {
  name: "qst",
  data() {
    return {

    }
  },
  props: {
    message: {
      required: true,
    }
  },
  mounted() {
    try {
      // 获取画布上下文
      this.message.ctx = this.$refs.canvas.getContext("2d");
      // console.log("this.message.ctx=", this.ctx);
      if (!this.message.ctx) {
        throw new Error('无法获取画布 2D 上下文');
      }
      // 添加 mouseup 事件监听器
      document.addEventListener('mouseup', this.mouseUp);
      document.addEventListener('touchend', this.mouseUp);

      // 获取画布和 .right 容器元素
      const canvas = this.$refs.canvas;
      const rightContainer = canvas.parentElement;

      // 计算画布相对于 .right 容器的左侧偏移量
      const canvasOffsetLeft = canvas.offsetLeft;

      // 获取所有 .option 元素
      const optionElements = this.$refs.optionElements;
      if (optionElements.length === 0) {
        console.warn('未找到 .qst_option 元素');
      }

      // 遍历 .option 元素，计算并存储每个形状的中心坐标
      optionElements.forEach(e => {
        const centerX = e.offsetLeft + 30 - canvasOffsetLeft;
        const centerY = e.offsetTop + 30;
        this.message.shapeXY.push({ x: centerX, y: centerY });
      });

      // 打印存储的中心坐标，可在调试完成后移除
      // console.log('形状中心坐标:', this.message.shapeXY);
    } catch (error) {
      console.error('mounted 钩子函数出错:', error);
    }
  },
  methods: {

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
        url_now = this.message.audios[index];
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


    mouseDown(e) {
      this.message.flag = 1
      // 获取画布元素
      const canvas = this.$refs.canvas;
      // console.log("canvas=", canvas);
      // console.log("this.message.ctx=", this.ctx);
      this.message.ctx = this.$refs.canvas.getContext("2d");


      // 获取画布相对于视口的位置
      const rect = canvas.getBoundingClientRect();
      // 判断是触摸事件还是鼠标事件，分别获取对应的 x 坐标
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      // 判断是触摸事件还是鼠标事件，分别获取对应的 y 坐标
      const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;

      document.addEventListener('mousemove', this.mouseMove);
      document.addEventListener('touchmove', this.mouseMove, { passive: false });
      this.message.ctx.beginPath();
      // 使用计算后的相对坐标
      this.message.ctx.moveTo(x, y);
      // console.log("x=", x, "y=", y);
    },
    mouseMove(e) {
      e.preventDefault();
      // console.log("123");
      const canvas = this.$refs.canvas;
      // 获取画布相对于视口的位置
      const rect = canvas.getBoundingClientRect();
      // 计算鼠标在画布内的相对坐标
      // 判断是触摸事件还是鼠标事件，分别获取对应的 x 坐标
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      // 判断是触摸事件还是鼠标事件，分别获取对应的 y 坐标
      const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;

      this.message.ctx.lineTo(x, y); // 直线
      this.message.ctx.stroke();
    },
    mouseUp() {
      if (this.message.flag) {
        //this.message.ctx.closePath();
        document.removeEventListener('mousemove', this.mouseMove);
        document.removeEventListener('touchmove', this.mouseMove, { passive: false });
        // console.log(this.shapeXY);
        // console.log("this.message.ctx=", this.ctx);
        this.message.shapeXY.forEach(e => {
          this.message.useAnswer.push({ ist: this.message.ctx.isPointInPath(e.x, e.y), x: e.x, y: e.y })
          this.message.userNum += this.message.ctx.isPointInPath(e.x, e.y);
        })
        console.log(this.useAnswer);
        // console.log("this.message.userNum=", this.userNum);

        this.message.flag = 0;
        this.message.changed = true;
        if (this.message.userNum == this.message.question.tureNum) {
          this.message.result = true;  //圈图题就返回一个值就行 1 对 0 错
          // console.log("你对了！");
        } else {
          // console.log("你错了！");
        }
        // console.log(this.message.userNum);

      }
      else {
        document.removeEventListener('mousemove', this.mouseMove);
        document.removeEventListener('touchmove', this.mouseMove, { passive: false });
      }
      // console.log(this.message.shapeXY);
    }

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

.qst_mian_body {

  width: 850px;
  height: 600px;
  /* border: 1px solid black; */
  margin: auto;
  text-align: center;
  margin-top: 20px;
}

.qst_mian_body .main_body {
  width: 700px;
  margin: auto;
}

.qst_mian_body .img1 {
  width: 200px;
  margin: auto;
}

.qst_mian_body .example {
  width: 700px;
  height: 250px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
}

.qst_mian_body .options {
  margin: auto auto;
  width: 242px;
  display: flex;
  flex-wrap: wrap;
  /* background-color: bisque; */
}

.qst_mian_body .right_r {
  width: 350px;
  /* background-color: antiquewhite; */
  border: 1px solid black;
  height: 250px;

  display: flex;
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
}

.qst_mian_body .right {
  height: 250px;
  margin-top: 30px;
  width: 700px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  position: relative;
}

.qst_mian_body .qst_option img {
  width: 60px;
  height: 60px;
}

.qst_mian_body canvas {
  position: absolute;
  /* 设置绝对定位 */
  top: 0;
  right: 0;
  width: 350px;
  /* 去掉单位 px，直接使用数值 */
  height: 250px;
  /* 与 .right_r 高度一致 */
}
</style>