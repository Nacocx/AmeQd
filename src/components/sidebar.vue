<template>
  <el-affix :offset="120">
  <el-aside id="sidebar" width="350px">
    <el-progress
    :percentage="countTm.percentage"
    :stroke-width="15"
    type="circle"
    :status="countTm.percentage === 100 ? 'success' : undefined"
></el-progress>
    <p>
      已作答:{{ countTm.answeredCount }}题 剩余:{{
        countTm.totalTm - countTm.answeredCount
      }}题
    </p>
    <p v-for="(value, key) in studentInfo" :key="key">{{ key }}:{{ value }}</p>

    <!--侧边栏之后可以像学习通一样显示题目作答情况  -->
    <el-button-group>
      <el-button  style="margin-left: 16px" type="primary" @click="drawer = true">
        打开草稿纸
      </el-button>
    </el-button-group>

    <el-drawer v-model="drawer">
      <canvas
          ref="drawCanvas"
          height="700"
          style="border: 1px solid #000; cursor: crosshair"
          width="500"
          @mousedown="startDrawing"
          @mouseleave="stopDrawing"
          @mousemove="draw"
          @mouseup="stopDrawing"
          @touchend="stopDrawing"
          @touchmove="draw"
          @touchstart="startDrawing"
      ></canvas>
      <el-button type="danger" @click="clearCanvas">Clear </el-button>
    </el-drawer>
    <br>
  </el-aside>
  </el-affix>
</template>

<script>
export default {
  name:'Sidebar',
  data() {
    return {
      drawer: false,
      isDrawing: false,
      lastX: 0,
      lastY: 0,
    };
  },
  props: {
    studentInfo: {
      type: Object,
      required: true,
    },
    countTm: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
          .then((_) => {
            done();
          })
          .catch((_) => {});
    },
    getCanvasCoordinates(e) {
      const canvas = this.$refs.drawCanvas;
      const rect = canvas.getBoundingClientRect();

      if (e.type.includes("touch")) {
        const touch = e.touches[0] || e.changedTouches[0];
        return {
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top,
        };
      } else {
        return {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      }
    },

    startDrawing(e) {
      e.preventDefault(); // 阻止默认行为
      this.isDrawing = true;
      const { x, y } = this.getCanvasCoordinates(e);
      [this.lastX, this.lastY] = [x, y];
    },
    draw(e) {
      if (!this.isDrawing) return;
      e.preventDefault();

      const canvas = this.$refs.drawCanvas;
      const ctx = canvas.getContext("2d");
      const { x, y } = this.getCanvasCoordinates(e);

      ctx.beginPath();
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.strokeStyle = "#000";
      ctx.moveTo(this.lastX, this.lastY);
      ctx.lineTo(x, y);
      ctx.stroke();

      [this.lastX, this.lastY] = [x, y];
    },

    // 结束绘制
    stopDrawing() {
      this.isDrawing = false;
    },

    // 清空画布
    clearCanvas() {
      const canvas = this.$refs.drawCanvas;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    },
  },
  mounted() {

  },
};
</script>
<style scoped>
.el-btn{
  width: 50px;
}
</style>