<template>
  <div class="circle-drawing-game" v-for="(item,index) in items" v-show="item.id===currentIndex">
    <div v-if="item.id===currentIndex">
    <h3>
      （知识拓展）接着点出与事物数量相等的
      <span>
        <img alt="Missing Image"  :src="item.tuXingPath" :key="index" style="width: 20px"/>
      </span>
    </h3>

    <div class="item-display">
      <img :src="item.title.image" alt="物品图片" />
      <div class="count">Your Answer: {{ item.userAnswer }}</div>
    </div>

    <div
        class="drawing-area"
        @click="addCircle"
        @touchstart.passive="addCircle"
    >
      <div
          v-for="(circle, index) in circles"
          :key="index"
          class="circle"
          :style="{
          left: circle.x + 'px',
          top: circle.y + 'px',
        }"
      >
        <img :src="item.tuXingPath" style="width: 40%" alt="O" />
      </div>

    </div>

    <div class="controls">
      <el-button-group>
        <el-button @click="lastItem" type="primary" :disabled="isFirstItem">上一个</el-button>
        <el-button @click="resetCircles" type="primary">重新画</el-button>
        <el-button @click="nextItem" type="primary" :disabled="isLastItem">下一个</el-button>
      </el-button-group>
    </div>
    </div>
  </div>
  <hr>
</template>

<script>
//11111111
export default {
  name: 'sst',
  props: {
    items: {
      type: Array,
      required: true,
      default: () => [
        { image: '../images3/icecream.png', count: 5 },
        { image: '../images3/plane.png', count: 4 },
        { image: '../images3/tree.png', count: 3 }
      ]
    },
  },
  data() {
    return {
      //items数组下标
      currentIndex: 1,
      //存储圆圈位置的数组
      circles: [],
      isSubmitted:false,
    }
  },
  //根据currentIndex的变化 实时改变currentItem的值
  computed: {
    isLastItem(){
      return this.currentIndex===this.items.length;
    },
    isFirstItem(){
      return this.currentIndex===1;
    }
  },
  methods: {
    addCircle(event) {
      if(this.circles.length<10)
      {// 处理触摸事件和鼠标事件的兼容性
        const clientX = event.clientX || event.touches[0].clientX;
        const clientY = event.clientY || event.touches[0].clientY;
        //得到绘画区域左上角对客户端视图的相对坐标
        const rect = event.currentTarget.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        //为circle数组中添加相对绘画区域左上角的相对坐标
        this.circles.push({x, y});
        // 给答案赋值
        this.items[this.currentIndex-1].userAnswer=this.circles.length;

      }
    },
    //清空circle数组中关于圆的位置坐标
    resetCircles() {
      this.items[this.currentIndex-1].userAnswer='';
      this.circles = [];
    },
    nextItem() {
          if(!this.isLastItem) {
            this.currentIndex++;
          }
          this.resetCircles();
    },
    lastItem(){
      if(!this.isFirstItem) {
        this.currentIndex--;
      }
    },
  }
}
</script>

<style scoped>
.circle-drawing-game {
  font-family: Arial, sans-serif;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}
.item-display {
  margin: 20px 0;
}
.item-display img {
  width: 100px;
  height: 100px;
  object-fit: contain;
  border: 1px solid #eee;
}
.count {
  font-size: 18px;
  margin-top: 10px;
  font-weight: bold;
}
.drawing-area {
  position: relative;
  width: 100%;
  height: 300px;
  border: 2px dashed #ccc;
  margin: 20px 0;
  cursor: pointer;
}
.circle {
  position: absolute;
  font-size: 50px;
  transform: translate(-50%, -50%);
  user-select: none; /*用户无法选中绘画区域的文本 */
}
.controls {
  margin-top: 20px;
}
button {
  padding: 8px 16px;
  margin: 0 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
