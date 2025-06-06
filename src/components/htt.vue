<template>
  <div class="htt_main_body">
    <h1>{{ message.title }}:请拖进与图片物品数量一样的:<img :src="message.shape[message.id - 1]" alt="" class="shape">
      <div class="questions">

      </div>
    </h1>

    <!-- 主要问题部分 -->
    <div class="main_body">
      <div class="part" v-for="(e, index) in message.subQuestion" :key="index">
        <div class="up">
          <img :src="e.img" alt="图片加载失败" class="img_style">
        </div>
        <!-- 这里加了data-value属性 匹配那个框 -->
        <div class="down target-area" :data-value="index + 1">
          {{ index }}
        </div>
      </div>
    </div>
    <div class="chose" id="source-area">
      <div @mousedown="mousedown">

        <img :src="message.shape[message.id - 1]" class="shape" :data-value="message.id" alt="图片加载失败">


      </div>
    </div>
    <!-- 添加撤销按钮 -->
    <div class="undo-button">
      <button @click="undo" :disabled="actionHistory.length === 0">撤销</button>
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
    document.addEventListener('mouseup', this.mouseup);
  },

  beforeDestroy() {
    // 清理事件监听
    document.removeEventListener('mousemove', this.mousemove);
    document.removeEventListener('mouseup', this.mouseup);
  },
  methods: {
    mousedown(ee) {
      ee.preventDefault();//加个这个就可以了 不然会有个默认的行为 阻止拖动
      this.message.isDragging = true;
      this.message.startX = ee.clientX - ee.target.offsetLeft;
      this.message.startY = ee.clientY - ee.target.offsetTop;
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
        const x = ee.clientX - this.message.startX;
        const y = ee.clientY - this.message.startY;
        this.message.draggedElement.style.left = x + 'px';
        this.message.draggedElement.style.top = y + 'px';
      }
    },
    mouseup(ee) {
      console.log(this.userAnswer);

      if (this.message.isDragging) {
        this.message.isDragging = false;
        const targetArea = document.querySelectorAll('.target-area');

        targetArea.forEach(e => {
          const rect = e.getBoundingClientRect();
          //判断鼠标是否在目标区域内
          if (ee.clientX >= rect.left && ee.clientX <= rect.right && ee.clientY >= rect.top && ee.clientY <= rect.bottom) {
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
            // console.log(1);

            // 存储用户答案
            this.message.userAnswer[e.dataset.value - 1].push(this.message.draggedElement.dataset.value);
            console.log(this.message.userAnswer);

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