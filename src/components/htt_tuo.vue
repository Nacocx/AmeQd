<template>




  <div class="htt_tuo_main">

    <div class="title">


      <h1>{{ message.title }}</h1>
      <img :src="message.audio_img" alt="" class="laba" @click="playAudio(0,$event)" @touchend="playAudio(0,$event)">
    </div>
    <!-- <div class="questions">
      
    </div> -->

    <!-- 主要问题部分 -->
    <div class="main_body">
      <div class="part" v-for="(e, index) in message.subQuestion">
        <div class="up">
          <img :src="e.img" alt="图片加载失败">
        </div>
        <!-- 这里加了data-value属性 匹配那个框 -->
        <div class="down target-area-tuo" :data-value="index + 1">
          <img :src="message.shape[e.trueShape - 1]" class="shape" :data-value="index + 1" alt="图片加载失败">
        </div>
      </div>
    </div>
    <!-- 选择图形部分 -->
    <div class="chose" id="source-area">
      <div v-for="(e, index) in message.shape" @mousedown="mousedown" @touchstart="mousedown">
        <!-- 添加 data-value 属性 -->
        <div>
          <!-- 加了data-value属性更好监听是那个图形 -->
          <img :src="e" class="shape" :data-value="index + 1" alt="图片加载失败">
        </div>
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
  name: "htt_tuo",
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
    document.removeEventListener('mousemove', this.mousemove);
    document.removeEventListener('touchmove', this.mousemove);
    document.removeEventListener('mouseup', this.mouseup);
    document.removeEventListener('touchend', this.mouseup);
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


    mousedown(ee) {
      ee.preventDefault();//加个这个就可以了 不然会有个默认的行为 阻止拖动
      this.message.isDragging = true;
      // 使用传递进来的事件对象
      //ee.target.offsetLeft; 是获取元素相对于父元素的偏移量 如果无父元素则相对于页面的偏移量 这个重要就是要获取元素相对于页面的偏移量
      //否则则还需要监听父元素相对于页面的偏移量 更加麻烦
      //ee.clientX; 是获取鼠标相对于页面的偏移量
      // 判断是触摸事件还是鼠标事件，分别获取对应的 x 坐标，计算相对于元素左上角的偏移量
      this.message.startX = (ee.touches ? ee.touches[0].clientX : ee.clientX) - ee.target.offsetLeft;
      // 判断是触摸事件还是鼠标事件，分别获取对应的 y 坐标，计算相对于元素左上角的偏移量
      this.message.startY = (ee.touches ? ee.touches[0].clientY : ee.clientY) - ee.target.offsetTop;
      this.message.draggedElement = ee.target.cloneNode(true);//克隆元素
      this.message.draggedElement.style.position = 'absolute';
      this.message.draggedElement.style.zIndex = 100;
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
      if (this.message.isDragging) {
        this.message.isDragging = false;
        // 正确获取目标区域元素
        const targetArea = document.querySelectorAll('.target-area-tuo');
        // console.log(targetArea);

        targetArea.forEach(e => {
          // console.log("e", e);

          const rect = e.getBoundingClientRect();
          // Determine whether it's a touch event or a mouse event, and get the corresponding x and y coordinates
          const x = ee.changedTouches ? ee.changedTouches[0].clientX : ee.clientX;
          const y = ee.changedTouches ? ee.changedTouches[0].clientY : ee.clientY;
          if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
            // console.log("e", e);
            if (this.message.draggedElement) {
              e.appendChild(this.message.draggedElement);//将元素添加到目标区域
              // console.log("元素：", this.message.draggedElement);
              // 记录操作历史
              this.actionHistory.push({
                target: e,
                element: this.message.draggedElement,
                index: e.dataset.value - 1,
                value: this.message.draggedElement.dataset.value
              });
            }
            // 
            // 存储用户答案
            this.message.userAnswer[e.dataset.value - 1].push(this.message.draggedElement.dataset.value);
            this.message.draggedElement = null;
            // console.log(this.message.userAnswer);
            this.message.startX = 0;
            this.message.startY = 0;
            // console.log("放了");
          } else {
            if (this.message.draggedElement) {//这个检测是为了防止点击空白处时，this.draggedElement为null，导致报错

              this.message.draggedElement.remove();//没有在目标区域内，移除元素
            }
          }

        })


      }
      this.yes()
      // console.log(this.message.answer);//返回给后端的结果 对应每道题是否正确
    },
    yes() {
      this.message.answer = [];
      // console.log(this.message.userAnswer);


      this.message.userAnswer.forEach((e, index) => {
        // console.log(e);

        var num = 0;
        var flag = false;
        e.forEach((e1, index1) => {

          if (e1 != this.message.subQuestion[index].trueShape) {
            if (flag == false) {
              this.message.answer.push(false);
              flag = true;
            }
          }
          else {
            num++;
          }
        })
        if (num == this.message.subQuestion[index].answer && flag == false) {
          this.message.answer.push(true);
          flag = true;
        }
        if (flag == false) {
          this.message.answer.push(false);
          flag = true;
        }
      })
      // console.log(this.message.answer);//返回给后端的结果 对应每道题是否正确



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
  },

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

html,
body {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.htt_tuo_main .htt_main_part {
  margin: auto;
  width: 1000px;
  height: 750px;
  border: 1px solid black;
  border-radius: 10px;
}

.htt_tuo_main .main_body {
  margin: auto;
  width: 70%;
  height: 400px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}



.htt_tuo_main .htt_header_img {
  width: 100%;
  height: 100%;
}

.htt_tuo_main .main_body .part {
  width: 200px;
  height: 440px;
  margin-top: 6%;
  text-align: center;

}

.htt_tuo_main .main_body .part .up {
  height: 90px;
  width: 90px;
  align-self: center;
  display: inline-block;
}

.htt_tuo_main .main_body .part .up img {
  width: 100%;
  /* height: 100%; */
}

.htt_tuo_main .down {
  display: inline-block;
  width: 150px;
  height: 150px;
  margin-top: 30px;
  border: 2px solid black;
  border-radius: 10px;

}

.htt_tuo_main .htt_main_part .header {
  text-align: center;
  height: 8%;
  font-size: 50px;
  color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: rgb(94, 211, 73);
}

.htt_tuo_main .chose {
  box-sizing: border-box;
  border: 2px solid black;
  border-radius: 60px;
  display: flex;
  width: 30%;
  height: 10%;
  margin: auto;
  padding: 5px;
  justify-content: space-around;
  align-items: center;
}

.shape {
  width: 40px;
  height: 40px;
  z-index: 100;
  cursor: pointer;


}

.shape img {
  width: 40px;
  height: 40px;
}

.htt_tuo_main .img_style {
  width: 100%;

}

.htt_tuo_main .submit {
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

.htt_tuo_main .submitDiv {
  text-align: center;
  margin: 10px;
  height: 7%;
}

.htt_tuo_main .htt_main_part .questions {
  height: 5%;
  text-align: center;
  font-size: 30px;
}



.htt_tuo_main .questions img {
  height: 40px;
  width: 40px;
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