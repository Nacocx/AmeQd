<template>




  <div class="htt_tuo_main">
    <h1>{{ message.title }}</h1>
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
      <div v-for="(e, index) in message.shape" @mousedown="mousedown">
        <!-- 添加 data-value 属性 -->
        <div>
          <!-- 加了data-value属性更好监听是那个图形 -->
          <img :src="e" class="shape" :data-value="index + 1" alt="图片加载失败">
        </div>
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
      userAnswer: this.message.subQuestion.map(() => [])

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
      // 使用传递进来的事件对象
      //ee.target.offsetLeft; 是获取元素相对于父元素的偏移量 如果无父元素则相对于页面的偏移量 这个重要就是要获取元素相对于页面的偏移量
      //否则则还需要监听父元素相对于页面的偏移量 更加麻烦
      //ee.clientX; 是获取鼠标相对于页面的偏移量
      this.message.startX = ee.clientX - ee.target.offsetLeft;//获取元素相对于页面的偏移量 也就是相当于匹配鼠标在元素上的位置
      this.message.startY = ee.clientY - ee.target.offsetTop;
      this.message.draggedElement = ee.target.cloneNode(true);//克隆元素
      this.message.draggedElement.style.position = 'absolute';
      this.message.draggedElement.style.zIndex = 100;
      document.body.appendChild(this.message.draggedElement);
    },
    // 移动事件处理函数
    mousemove(ee) {
      if (this.message.isDragging) {
        // 使用传递进来的事件对象
        const x = ee.clientX - this.message.startX;
        const y = ee.clientY - this.message.startY;
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
          //判断鼠标是否在目标区域内
          if (ee.clientX >= rect.left && ee.clientX <= rect.right && ee.clientY >= rect.top && ee.clientY <= rect.bottom) {
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
        var flag = 0;
        e.forEach((e1, index1) => {

          if (e1 != this.message.subQuestion[index].trueShape) {
            if (flag == 0) {
              this.message.answer.push(0);
              flag = 1;
            }
          }
          else {
            num++;
          }
        })
        if (num == this.message.subQuestion[index].answer && flag == 0) {
          this.message.answer.push(1);
          flag = 1;
        }
        if (flag == 0) {
          this.message.answer.push(0);
          flag = 1;
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
        const index = this.userAnswer[lastAction.index].indexOf(lastAction.value);
        if (index > -1) {
          this.userAnswer[lastAction.index].splice(index, 1);
        }
      }
      console.log(this.userAnswer);

    }
  },

}
</script>
<style scoped>
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