<template>
  <div class="htt_main_body">
    <div class="title">


      <h1>{{ message.title }}请拖进与图片物品数量一样的:<img :src="message.shape[message.id - 1]" alt="" class="shape">
        <div class="questions">

        </div>
      </h1>
      <img :src="message.audio_img" alt="" class="laba" @click="playAudio(0)" @touchend="playAudio(0)">
    </div>


    <!-- 主要问题部分 -->
    <div class="main_body">
      <div class="part" v-for="(e, index) in message.subQuestion" :key="index">
        <div class="up">
          <img :src="e.img" alt="图片加载失败" class="img_style">
        </div>
        <!-- 这里加了data-value属性 匹配那个框 -->
        <div class="down target-area" :data-value="index + 1">
          <!-- {{ index }} -->
        </div>
      </div>
    </div>
    <div class="chose" id="source-area">
      <div @mousedown="mousedown" @touchstart="mousedown">

        <img :src="message.shape[message.id - 1]" class="shape" :data-value="message.id" alt="图片加载失败">


      </div>
    </div>
    <!-- 添加撤销按钮 -->
    <div class="undo-button">
      <button @click="undo" @touchend="undo" :disabled="actionHistory.length === 0">撤销</button>
    </div>
    <br>
  </div>
  <br>
  <hr>
</template>
<script>
export default {
  name: "htt",
  props: {
    message: {}
  },
  data() {
    return {
      answer: [],//是否正确 返回后端的数据
      // 记录操作历史
      actionHistory: [],
      // 初始化 userAnswer
      // userAnswer: this.message.subQuestion.map(() => [])
    };
  },
  mounted() {
    // 初始化拖拽事件监听
    //拖拽事件一开始就监听
    document.addEventListener('mousemove', this.mousemove);
    document.addEventListener('touchmove', this.mousemove);
    document.addEventListener('mouseup', this.mouseup);
    document.addEventListener('touchend', this.mouseup);
  },

  beforeDestroy() {
    // 清理事件监听
    document.addEventListener('mousemove', this.mousemove);
    document.addEventListener('touchmove', this.mousemove);
    document.addEventListener('mouseup', this.mouseup);
    document.addEventListener('touchend', this.mouseup);
  },
  methods: {

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

    mousedown(ee) {
      ee.preventDefault();//加个这个就可以了 不然会有个默认的行为 阻止拖动
      this.message.isDragging = true;
      // 判断是触摸事件还是鼠标事件，分别获取对应的 x 坐标，计算相对于元素左上角的偏移量
      this.message.startX = (ee.touches ? ee.touches[0].clientX : ee.clientX) - ee.target.offsetLeft;
      // 判断是触摸事件还是鼠标事件，分别获取对应的 y 坐标，计算相对于元素左上角的偏移量
      this.message.startY = (ee.touches ? ee.touches[0].clientY : ee.clientY) - ee.target.offsetTop;
      this.message.draggedElement = ee.target.cloneNode(true);
      this.message.draggedElement.style.position = 'absolute';
      this.message.draggedElement.style.zIndex = 100;
      this.message.draggedElement.dataset.value = ee.target.dataset.value;
      // console.log(ee.target);

      document.body.appendChild(this.message.draggedElement);
    },
    // 移动事件处理函数
    mousemove(ee) {
      if (this.message.isDragging) {
        // Determine whether it's a touch event or a mouse event, and get the corresponding x - coordinate
        const x = (ee.touches ? ee.touches[0].clientX : ee.clientX) - this.message.startX;
        // Determine whether it's a touch event or a mouse event, and get the corresponding y - coordinate
        const y = (ee.touches ? ee.touches[0].clientY : ee.clientY) - this.message.startY;
        this.message.draggedElement.style.left = x + 'px';
        this.message.draggedElement.style.top = y + 'px';
      }
    },
    mouseup(ee) {
      // console.log(this.userAnswer);

      if (this.message.isDragging) {
        this.message.isDragging = false;
        const targetArea = document.querySelectorAll('.target-area');

        targetArea.forEach(e => {
          const rect = e.getBoundingClientRect();
          // 判断是触摸事件还是鼠标事件，分别获取对应的 x 和 y 坐标
          const x = ee.touches ? ee.touches[0].clientX : ee.clientX;
          const y = ee.touches ? ee.touches[0].clientY : ee.clientY;
          // 判断鼠标或触摸点是否在目标区域内
          if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
            if (this.message.draggedElement) {
              e.appendChild(this.message.draggedElement);
              // 记录操作历史
              this.actionHistory.push({
                target: e,
                element: this.message.draggedElement,
                index: e.dataset.value - 1,
                value: this.message.draggedElement.dataset.value
              });
            }
            console.log(this.actionHistory);

            // 存储用户答案
            this.message.userAnswer[e.dataset.value - 1].push(this.message.draggedElement.dataset.value);
            // console.log(this.message.userAnswer);

            this.message.draggedElement = null;
            this.message.startX = 0;
            this.message.startY = 0;
          } else {
            if (this.message.draggedElement) {
              this.message.draggedElement.remove();
            }
          }
        });
      }
    },
    yes() {

    },
    // 撤销方法
    undo() {
      if (this.actionHistory.length > 0) {
        const lastAction = this.actionHistory.pop();
        // 从目标区域移除元素
        lastAction.element.remove();
        // 从用户答案中移除对应的值
        const index = this.message.userAnswer[lastAction.index].indexOf(lastAction.value);
        if (index > -1) {
          this.message.userAnswer[lastAction.index].splice(index, 1);
        }
      }
      console.log(this.message.userAnswer);

    }
  }
}
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

/* 样式部分保持不变 */
html,
body {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.htt_main_body .htt_main_part {
  margin: auto;
  width: 1000px;
  height: 750px;
  border: 1px solid black;
  border-radius: 10px;
}

.htt_main_body .main_body {
  margin: auto;
  width: 90%;
  height: 70%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  box-sizing: border-box;
  padding-left: 40px;
  padding-right: 40px;
}

.htt_main_body .htt_header_img {
  width: 100%;
  height: 100%;
}

.htt_main_body .main_body .part {
  width: 120px;
  height: 340px;
  margin-top: 6%;
}

.htt_main_body .main_body .part .up {
  height: 100px;
  align-self: center;
}

.htt_main_body .down {
  width: 140px;
  height: 140px;
  margin-top: 30px;
  border: 2px solid black;
  border-radius: 10px;
}

.htt_main_body .htt_main_part .header {
  text-align: center;
  height: 8%;
  font-size: 50px;
  color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: rgb(94, 211, 73);
}

.htt_main_body .chose {
  box-sizing: border-box;
  border: 2px solid black;
  border-radius: 60px;
  display: flex;
  width: 10%;
  height: 10%;
  margin: auto;
  padding: 5px;
  justify-content: space-around;
  align-items: center;
}

.shape {
  width: 30px;
  height: 30px;
  z-index: 100;
  cursor: pointer;
}

.htt_main_body .shape img {
  width: 20px;
  height: 20px;
}

.htt_main_body .img_style {
  width: 100%;
  height: 100%;

}

.htt_main_body .submit {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #4CAF50;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  overflow: hidden;
}

.htt_main_body .submitDiv {
  text-align: center;
  margin: 10px;
  height: 7%;
}

.htt_main_body .htt_main_part .questions {
  height: 5%;
  text-align: center;
  font-size: 30px;
}

.htt_main_body .questions img {
  height: 20px;
  width: 20px;
  transform: translateY(15px);
}

/* 新增撤销按钮样式 */
.undo-button {
  text-align: center;
  margin-top: 10px;
}

.undo-button button {
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  background-color: #4CAF50;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.undo-button button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>