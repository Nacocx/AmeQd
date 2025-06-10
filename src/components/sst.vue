<template>
  <div class="circle-drawing-game">
    <h1>接着点出与事物数量相等的<span>
        <img alt="Missing Image" :src="item.tuXingPath"  style="width: 20px" />
      </span>
    </h1>

    <div class="item-display">
      <div class="left_img">
      <img :src="item.title.image" alt="物品图片" />
      </div>
      <div class="right_body">
      <div class="count">Your Answer: {{ item.userAnswer }}</div>
      <div class="drawing-area" @click="addCircle" @touchstart.passive="addCircle">
      <div v-for="(circle, index) in circles" :key="index" class="circle" :style="{
        left: circle.x + 'px',
        top: circle.y + 'px',
      }">
        <img :src="item.tuXingPath" style="width: 50px ;height: 50px;" alt="O" />
      </div>

      </div>
      
      </div>
    </div>
    <el-button @click="resetCircles" type="primary" class="btn">重新画</el-button>
  </div>
  <!-- <hr> -->
</template>

<script>
//11111111
export default {
  name: 'sst',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      //存储圆圈位置的数组
      circles: [],
      isSubmitted: false,
    }
  },
  //根据currentIndex的变化 实时改变currentItem的值
  computed: {

  },
  methods: {
    addCircle(event) {
      if (this.circles.length < 10) {// 处理触摸事件和鼠标事件的兼容性
        const clientX = event.clientX || event.touches[0].clientX;
        const clientY = event.clientY || event.touches[0].clientY;
        //得到绘画区域左上角对客户端视图的相对坐标
        const rect = event.currentTarget.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        //为circle数组中添加相对绘画区域左上角的相对坐标
        this.circles.push({ x, y });
        // 给答案赋值
        this.item.userAnswer = this.circles.length;

      }
    },
    //清空circle数组中关于圆的位置坐标
    resetCircles() {
      this.item.userAnswer = '';
      this.circles = [];
    },
  }
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
.circle-drawing-game {
  /* background-color: #4caf50; */
  font-family: Arial, sans-serif;
  max-width:890px;
  height: 320px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  position: relative;
}


 .circle-drawing-game .item-display {
  margin: 10px 0;
  display: flex;
  /* background-color: #4caf50; */

}
.circle-drawing-game .left_img{
  width: 350px;
  height: 250px;
  /* background-color: #ccc; */
  /* text-align: center; */
  display: flex;
  align-items: center;
  justify-content: center;
}
.circle-drawing-game .left_img img{
  margin-top: 30px;

}
.circle-drawing-game .item-display img {
  width: 200px;
  height: 200px;
  object-fit: contain;
  /* border: 1px solid #eee; */
}
.circle-drawing-game .right_body{
width: 550px;
height: 250px;
}
.circle-drawing-game .count {
  font-size: 18px;
  margin-top: 10px;
  font-weight: bold;
}

.circle-drawing-game .drawing-area {
  position: relative;
  width: 100%;
  height: 200px;
  border: 2px dashed #ccc;
  margin: 10px 0;
  cursor: pointer;
}

.circle-drawing-game .circle {
  position: absolute;
  font-size: 50px;
  transform: translate(-50%, -50%);
  user-select: none;
  /*用户无法选中绘画区域的文本 */
}

.circle-drawing-game .controls {
  margin-top: 20px;
}

.circle-drawing-game button {
  padding: 8px 16px;
  margin: 0 10px;
  background-color: #4caf50;
  
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.circle-drawing-game button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
.btn{
 position: absolute;
 right: 275px;
 transform: translateX(50%);
}
</style>
