<!-- 圈图形中物品数量的题目 -->
<template>
  <div class="qst_mian_body" id="qst">
    <header>
      <h1> {{ message.title }}</h1>
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
            <div class="qst_option" v-for="e in message.question.num">
              <img :src="message.question.n_img" alt="">
            </div>
          </div>
        </div>
        <canvas width="350" height="250" id="c1" ref="canvas" class="qst" @mousedown="mouseDown"
          @mouseup="mouseUp"></canvas>
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
      ctx: "",
      shapeXY: [],//所有点的中心坐标
      allXY: [],
      useAnswer: [],
      userNum: 0,
      flag: 0,
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
      this.ctx = this.$refs.canvas.getContext("2d");
      // console.log("this.message.ctx=", this.ctx);
      if (!this.ctx) {
        throw new Error('无法获取画布 2D 上下文');
      }
      // 添加 mouseup 事件监听器
      document.addEventListener('mouseup', this.mouseUp);

      // 获取画布和 .right 容器元素
      const canvas = this.$refs.canvas;
      const rightContainer = canvas.parentElement;

      // 计算画布相对于 .right 容器的左侧偏移量
      const canvasOffsetLeft = canvas.offsetLeft;

      // 获取所有 .option 元素
      const optionElements = document.querySelectorAll(".qst_option");
      if (optionElements.length === 0) {
        console.warn('未找到 .qst_option 元素');
      }

      // 遍历 .option 元素，计算并存储每个形状的中心坐标
      optionElements.forEach(e => {
        const centerX = e.offsetLeft + 30 - canvasOffsetLeft;
        const centerY = e.offsetTop + 30;
        this.shapeXY.push({ x: centerX, y: centerY });
      });

      // 打印存储的中心坐标，可在调试完成后移除
      // console.log('形状中心坐标:', this.message.shapeXY);
    } catch (error) {
      console.error('mounted 钩子函数出错:', error);
    }
  },
  methods: {
    mouseDown(e) {
      this.flag = 1
      // 获取画布元素
      const canvas = this.$refs.canvas;
      console.log("canvas=", canvas);
      console.log("this.message.ctx=", this.ctx);
      this.ctx = this.$refs.canvas.getContext("2d");


      // 获取画布相对于视口的位置
      const rect = canvas.getBoundingClientRect();
      // 计算鼠标在画布内的相对坐标
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      document.addEventListener('mousemove', this.mouseMove);
      this.ctx.beginPath();
      // 使用计算后的相对坐标
      this.ctx.moveTo(x, y);
      // console.log("x=", x, "y=", y);
    },
    mouseMove(e) {
      // console.log("123");
      const canvas = this.$refs.canvas;
      // 获取画布相对于视口的位置
      const rect = canvas.getBoundingClientRect();
      // 计算鼠标在画布内的相对坐标
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      this.ctx.lineTo(x, y); // 直线
      this.ctx.stroke();
    },
    mouseUp() {
      if (this.flag) {
        //this.message.ctx.closePath();
        document.removeEventListener('mousemove', this.mouseMove);
        // console.log(this.shapeXY);
        // console.log("this.message.ctx=", this.ctx);
        this.shapeXY.forEach(e => {
          this.useAnswer.push({ ist: this.ctx.isPointInPath(e.x, e.y), x: e.x, y: e.y })
          this.userNum += this.ctx.isPointInPath(e.x, e.y);
        })
        // console.log(this.useAnswer);
        // console.log("this.message.userNum=", this.userNum);

        this.flag = 0;
        this.message.changed=true;
        if (this.userNum == this.message.question.tureNum) {
          this.message.result = true;  //圈图题就返回一个值就行 1 对 0 错
          // console.log("你对了！");
        } else {
          // console.log("你错了！");
        }
      }
      else {
        document.removeEventListener('mousemove', this.mouseMove);
      }




    }

  }
};
</script>
<style>
.qst_mian_body {

  width: 850px;
  height: 620px;
  /* border: 1px solid black; */
  margin: auto;
  text-align: center;
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