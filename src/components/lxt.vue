<!-- 连线题 -->

<template>

  <div class="lxt_main_body">
    <!-- <div class="header"></div> -->
    <h1>{{ message.title }}</h1>

    <!-- <div class="questions">请连接和图片中物品数量一致的圆的图片</div> -->


    <div class="content">
      <!-- 上侧选项 -->
      <div class="options upOptions">
        <div v-for="(item, index) in localMessage.imgU" :key="index" class="option"
          :class="{ 'active': item.connected }" @mousedown="onMousedown($event, item)" :data-value="item.value"

          :data-ownership="item.ownership + message.flag">

          <img :src="item.src">
        </div>
      </div>

      <!-- 下侧选项 -->
      <div class="options downOptions">
        <div v-for="(item, index) in localMessage.imgD" :key="index" class="option"
          :class="{ 'active': item.connected }" @mousedown="onMousedown($event, item)" :data-value="item.value"
          :data-ownership="item.ownership + message.flag">
          <img :src="item.src">
        </div>
      </div>

      <!-- 连线画布 -->
      <canvas id="canvas" ref="canvas" :class="message.flag"></canvas>
      <canvas id="backCanvas" :class="message.flag + 'back'" ref="backCanvas"></canvas>
    </div>

    <!-- 按钮移至图片下方 -->
    <div class="buttons">
      <button class="button" @click="resetAllConnections">全部重新画</button>
      <button class="button" @click="resetLastConnection">后退一步</button>
    </div>

    <div class="submitDiv">
      <!-- <button class="submit" @click="checkAnswer">提交</button> -->
    </div>
    <hr>
  </div>

</template>


<script>
export default {
  name: "lxt",
  data() {
    return {
      // 标记是否正在绘制连线的状态，初始为 false 表示未开始绘制
      isDrawing: false,
      // 记录连线起始选项的对象，初始为 null 表示无起始选项
      startItem: null,
      // 记录连线结束选项的对象，初始为 null 表示无结束选项
      endItem: null,
      // 当前正在绘制的连线对象，包含起点和终点坐标，初始均为 0
      currentLine: { x1: 0, y1: 0, x2: 0, y2: 0 },
      // 存储所有已创建连线的数组，初始为空数组
      connections: [],
      // 画布的 2D 绘图上下文对象，初始为 null，后续在 mounted 钩子中初始化
      ctx: null,
      // 背景画布的 2D 绘图上下文对象，初始为 null，后续在 mounted 钩子中初始化
      backCtx: null,
      // 存储画布相对于视口的位置和尺寸信息的对象，初始为 null
      canvasRect: null,
      // 调试模式开关，设置为 true 时可开启调试功能，如绘制检测区域
      isDebug: true,
      // 存储用户连线答案检查结果的数组，初始为空数组
      result: [],
      localMessage: { ...this.message },
    };
  },
  props: {
    message: {
      // type:Array,
      required: true,
    }
  },

  /**
* 组件挂载完成时的生命周期钩子函数
* 初始化画布上下文，设置画布大小，监听窗口大小变化事件，并更新选项位置
*/
  mounted() {
    // 获取画布的 2D 绘图上下文
    this.ctx = this.$refs.canvas.getContext('2d');
    // 获取背景画布的 2D 绘图上下文
    this.backCtx = this.$refs.backCanvas.getContext('2d');
    // 初始化画布大小
    this.resizeCanvas();
    // 监听窗口大小变化事件，窗口大小改变时重新调整画布大小
    window.addEventListener('resize', this.resizeCanvas);
    // 在下一次 DOM 更新循环结束后执行，确保 DOM 已更新，然后更新选项位置
    this.$nextTick(() => this.updateItemPositions());
  },
  methods: {

    /**
     * 调整画布大小以适应父容器
     * 并重新绘制所有已存在的连线
     */
    resizeCanvas() {
      // 获取画布元素
      const canvas = this.$refs.canvas;
      // console.log("canvas", canvas);

      // 获取画布的父元素
      const content = canvas.parentElement;
      // console.log("content", content);
      // 获取画布相对于视口的位置和尺寸信息
      this.canvasRect = canvas.getBoundingClientRect();
      // 设置画布的宽度为父容器的宽度
      canvas.width = content.offsetWidth;
      // 设置画布的高度为父容器的高度
      canvas.height = content.offsetHeight;
      // 设置背景画布的宽度为父容器的宽度
      this.$refs.backCanvas.width = content.offsetWidth;
      // 设置背景画布的高度为父容器的高度
      this.$refs.backCanvas.height = content.offsetHeight;
      // 重新绘制所有已存在的连线
      this.drawConnections();
    },

    /**
     * 更新所有选项的位置信息
     * 计算每个选项的中心坐标和矩形区域信息
     */
    updateItemPositions() {
      // 合并上下两侧的选项数组并遍历
      [...this.localMessage.imgU, ...this.localMessage.imgD].forEach(item => {
        // 根据选项的值和所属区域查找对应的 DOM 元素
        const element = document.querySelector(`[data-value="${item.value}"][data-ownership="${item.ownership}${this.message.flag}"]`);
        // console.log("element", element);

        if (element) {
          // 获取元素相对于视口的位置和尺寸信息
          const rect = element.getBoundingClientRect();
          // console.log(rect);

          // 计算选项的中心 x 坐标
          item.x = rect.left - this.canvasRect.left + rect.width / 2;
          // 计算选项的中心 y 坐标
          item.y = rect.top - this.canvasRect.top + rect.height / 2;
          // 存储选项的矩形区域信息
          item.rect = {//会直接存储到元素 里面相当于直接json 加了一个属性值存元素的位置信息
            x: rect.left - this.canvasRect.left,
            y: rect.top - this.canvasRect.top,
            width: rect.width,
            height: rect.height
          };
        }
      });
      // console.log("-----------------------------");
    },

    /**
     * 鼠标按下事件处理函数
     * 开始绘制连线，记录起始选项并添加鼠标移动和鼠标抬起事件监听
     * @param {MouseEvent} event - 鼠标按下事件对象
     * @param {Object} item - 被按下的选项对象
     */
    onMousedown(event, item) {
      this.resizeCanvas();
      // console.log("this.localMessage", this.localMessage);

      // console.log("down");

      // 阻止默认事件
      event.preventDefault();
      // 标记开始绘制连线
      this.isDrawing = true;
      // 记录起始选项
      this.startItem = item;
      // 清空结束选项
      this.endItem = null;
      // 清除所有选项的悬停状态
      this.clearHoverStates();
      // 标记起始选项为已连接
      this.startItem.connected = true;

      // console.log("item", item);

      // 设置连线的起始点坐标
      this.currentLine.x1 = this.startItem.x;
      this.currentLine.y1 = this.startItem.y;
      // console.log("this.currentLine.x1", this.currentLine.x1);

      // 添加鼠标移动事件监听
      document.addEventListener('mousemove', this.onMousemove);
      // 添加鼠标抬起事件监听
      document.addEventListener('mouseup', this.onMouseup);
    },

    /**
     * 鼠标移动事件处理函数
     * 在绘制连线过程中，更新连线终点位置，绘制临时连线，并检查鼠标悬停的选项
     * @param {MouseEvent} event - 鼠标移动事件对象
     */
    onMousemove(event) {
      //在 onMousemove(event) 方法里，event 代表原生的鼠标移动事件对象。虽然在代码里看起来没有显式传参，但这是浏览器事件监听机制自动处理的
      // 如果没有开始绘制连线，直接返回
      if (!this.isDrawing) return;



      // 清除所有选项的悬停状态
      this.clearHoverStates();

      // 计算鼠标相对于画布的 x 坐标
      const mouseX = event.clientX - this.canvasRect.left;
      // 计算鼠标相对于画布的 y 坐标
      const mouseY = event.clientY - this.canvasRect.top;


      // console.log("event.clientX", event.clientX);
      // console.log("event.clientY", event.clientY);
      // console.log("this.canvasRect.left", this.canvasRect.left);

      // console.log("this.canvasRect.top", this.canvasRect.top);

      // 获取画布元素
      const canvas = this.$refs.canvas;
      // 将鼠标 x 坐标限制在画布范围内
      const clampedX = Math.max(0, Math.min(mouseX, canvas.width));
      // 将鼠标 y 坐标限制在画布范围内
      const clampedY = Math.max(0, Math.min(mouseY, canvas.height));

      // 设置连线的终点 x 坐标
      this.currentLine.x2 = clampedX;
      // 设置连线的终点 y 坐标
      this.currentLine.y2 = clampedY;
      // console.log("this.currentLine.x2", this.currentLine.x2);


      // 清空画布上的临时内容
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      // 绘制临时连线
      // console.log(this.ctx);
      // console.log(this.currentLine);

      this.drawLine(this.ctx, this.currentLine, '#4CAF50', 3);

      // 检查鼠标悬停的选项
      this.checkHoverTarget(event);
      this.checkAnswer();

      // 如果处于调试模式，绘制检测区域
      // if (this.isDebug) this.drawDetectionCircles();
    },

    /**
     * 清除所有选项的悬停状态
     * 重置选项的悬停标志，并移除相关的 CSS 类名
     */
    clearHoverStates() {
      // 重置上方选项的悬停标志和悬停有效性标志为 false
      this.localMessage.imgU.forEach(item => { item.hover = false; item.hoverValid = false; });
      // 重置下方选项的悬停标志和悬停有效性标志为 false
      this.localMessage.imgD.forEach(item => { item.hover = false; item.hoverValid = false; });
      // 遍历所有带有 hover-valid 或 hover-invalid 类名的选项元素
      document.querySelectorAll('.option.hover-valid, .option.hover-invalid').forEach(el => {
        // 移除这些元素的 hover-valid 和 hover-invalid 类名
        el.classList.remove('hover-valid', 'hover-invalid');
      });
    },

    /**
     * 检查鼠标是否悬停在有效的选项上
     * 更新相关选项的悬停状态和连线终点
     * @param {MouseEvent} event - 鼠标移动事件对象，用于获取鼠标当前位置
     */
    checkHoverTarget(event) {

      // 计算鼠标相对于画布的 x 坐标
      const mouseX = event.clientX - this.canvasRect.left;
      // 计算鼠标相对于画布的 y 坐标
      const mouseY = event.clientY - this.canvasRect.top;
      // 清空结束选项
      this.endItem = null;

      // 合并上下两侧的选项数组并遍历
      [...this.localMessage.imgU, ...this.localMessage.imgD].forEach(item => {
        // 如果当前选项是起始选项，跳过
        if (item === this.startItem) return;
        // 获取选项的矩形区域信息
        const elementRect = item.rect;
        // 如果没有矩形区域信息，跳过
        if (!elementRect) return;

        // 矩形碰撞检测，判断鼠标是否在选项矩形区域内
        const isInRect =
          mouseX >= elementRect.x &&
          mouseX <= elementRect.x + elementRect.width &&
          mouseY >= elementRect.y &&
          mouseY <= elementRect.y + elementRect.height;

        if (isInRect) {
          // 标记选项为悬停状态
          item.hover = true;
          // 判断悬停的选项是否有效（与起始选项不在同一侧）
          const isValid = item.ownership !== this.startItem.ownership;
          // 标记选项的悬停有效性
          item.hoverValid = isValid;

          // 根据选项的值和所属区域查找对应的 DOM 元素
          const element = document.querySelector(`[data-value="${item.value}"][data-ownership="${item.ownership}"]`);
          if (element) {
            // 移除元素的 hover-valid 和 hover-invalid 类名
            element.classList.remove('hover-valid', 'hover-invalid');
            // 根据悬停有效性添加对应的类名
            element.classList.add(isValid ? 'hover-valid' : 'hover-invalid');
          }

          if (isValid) {
            // 记录有效的结束选项
            this.endItem = item;
            // 将连线终点设置为选项的中心
            this.currentLine.x2 = item.x;
            this.currentLine.y2 = item.y;
          }
        }
      });
    },
    // 此函数不需要，看起来不好看
    /**
     * 绘制选项的检测区域（调试用）
     * 该函数已被注释掉，不会执行
     */
    drawDetectionCircles() {
      // 调试：绘制选项矩形区域
      // this.ctx.save();
      // this.ctx.strokeStyle = 'rgba(0, 255, 0, 0.2)';
      // this.ctx.lineWidth = 2;
      // [...this.imgU, ...this.imgD].forEach(item => {
      //   if (item.rect) {
      //     this.ctx.strokeRect(
      //       item.rect.x,
      //       item.rect.y,
      //       item.rect.width,
      //       item.rect.height
      //     );
      //   }
      // });
      // this.ctx.restore();
    },

    /**
     * 鼠标抬起事件处理函数
     * 结束绘制连线，移除事件监听，根据结束选项创建或取消连线
     * @param {MouseEvent} event - 鼠标抬起事件对象
     */
    onMouseup(event) {
      // 阻止默认事件
      event.preventDefault();
      // 标记结束绘制连线
      this.isDrawing = false;
      // 清空画布上的临时内容
      this.ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
      // 移除鼠标移动事件监听
      document.removeEventListener('mousemove', this.onMousemove);
      // 移除鼠标抬起事件监听
      document.removeEventListener('mouseup', this.onMouseup);
      // 清除所有选项的悬停状态
      this.clearHoverStates();

      // 如果存在有效的结束选项
      if (this.endItem && this.endItem.ownership !== this.startItem.ownership) {
        // 如果结束选项已连接，断开相关连线
        if (this.endItem.connected) this.breakExistingConnections(this.endItem);
        // 创建新的连线
        this.createConnection(this.startItem, this.endItem);
      } else {
        // 取消起始选项的连接状态
        this.startItem.connected = false;
      }

      // 清空起始选项
      this.startItem = null;
      // 清空结束选项
      this.endItem = null;
    },

    /**
     * 创建新的连线
     * 确保连线从上方选项指向下方选项，断开相关的旧连线，并更新连线数组
     * @param {Object} startItem - 连线的起始选项对象
     * @param {Object} endItem - 连线的结束选项对象
     */
    createConnection(startItem, endItem) {
      // 确保连线从上方选项指向下方选项
      if (startItem.ownership === 'D' && endItem.ownership === 'U') {
        [startItem, endItem] = [endItem, startItem];
      }

      // 断开起始选项的旧连线
      this.breakExistingConnections(startItem);
      // 断开结束选项的旧连线
      this.breakExistingConnections(endItem);
      // 将新连线添加到连线数组中
      this.connections.push({ start: startItem, end: endItem });
      // 标记起始选项为已连接
      startItem.connected = true;
      // 标记结束选项为已连接
      endItem.connected = true;
      // 重新绘制所有已存在的连线
      this.drawConnections();
    },

    /**
     * 断开与指定选项相关的所有旧连线
     * 更新连线数组和选项的连接状态
     * @param {Object} item - 指定的选项对象
     */
    breakExistingConnections(item) {
      // 筛选出与指定选项相关的旧连线
      const oldConnections = this.connections.filter(connection =>
        (connection.start.value === item.value && connection.start.ownership === item.ownership) ||
        (connection.end.value === item.value && connection.end.ownership === item.ownership)
      );

      // 遍历旧连线，将相关选项的连接状态设置为未连接
      oldConnections.forEach(connection => {
        connection.start.connected = false;
        connection.end.connected = false;
      });

      // 从连线数组中移除旧连线
      this.connections = this.connections.filter(connection => !oldConnections.includes(connection));
    },

    /**
     * 绘制所有已存在的连线
     * 在背景画布上绘制所有连线
     */
    drawConnections() {
      // 清空背景画布
      this.backCtx.clearRect(0, 0, this.$refs.backCanvas.width, this.$refs.backCanvas.height);
      // 遍历所有连线并绘制
      // console.log("this.connections", this.connections);

      this.connections.forEach(connection => {
        // console.log("connection", connection);

        // 确保连线从上方选项指向下方选项
        const start = connection.start.ownership === 'U' ? connection.start : connection.end;
        const end = connection.start.ownership === 'U' ? connection.end : connection.start;
        // 绘制连线
        this.drawLine(this.backCtx, { x1: start.x, y1: start.y, x2: end.x, y2: end.y }, '#4CAF50', 3);
      });
    },

    /**
     * 在指定的画布上下文中绘制一条直线
     * @param {CanvasRenderingContext2D} context - 画布的 2D 绘图上下文
     * @param {Object} line - 包含直线起点和终点坐标的对象
     * @param {string} color - 直线的颜色
     * @param {number} width - 直线的宽度
     */
    drawLine(context, line, color, width) {

      // console.log("lxt line", line);


      // 开始一个新的路径
      context.beginPath();
      // 移动到直线的起点
      context.moveTo(line.x1, line.y1);
      // 绘制直线到终点
      context.lineTo(line.x2, line.y2);
      // 设置直线的颜色
      context.strokeStyle = color;
      // 设置直线的宽度
      context.lineWidth = width;
      // 绘制路径
      context.stroke();
      this.checkAnswer();
    },

    /**
     * 根据选项的值查找对应的选项对象
     * @param {string} value - 选项的值
     * @returns {Object|null} - 找到的选项对象，如果未找到则返回 null
     */
    getOptionByValue(value) {
      // 合并上下两侧的选项数组并查找匹配的选项
      return [...this.localMessage.imgU, ...this.localMessage.imgD].find(item => item.value === value);
    },

    /**
     * 检查用户的连线答案是否正确
     * 计算结果数组并弹出提示框显示检查结果
     */
    checkAnswer() {
      // 标记所有答案是否正确
      // let allCorrect = true;
      // 存储每个选项的检查结果
      this.result = [false, false, false, false];
      // let n=0;
      // 遍历上方选项
      this.localMessage.imgU.forEach((upItem, index) => {
        // 查找与当前选项相关的连线
        const connection = this.connections.find(conn =>
          conn.start.ownership === 'U' && conn.start.value === upItem.value
        );

        if (connection) {
          // 如果连线的结束选项值与起始选项值相同，结果为 1，否则为 0
          this.result[index] = (connection.end.value === upItem.value ? true : false);
        } else {
          // 如果没有连线，结果为 0
          this.result[index] = (false);
        }
        this.message.result=this.result;
        this.message.changed=true;
        // 如果当前选项的结果不为 1，说明有错误
        // if (this.message.result[index] !== 1) {
        //   allCorrect = false;
        // }
      });

      // 检查是否所有选项都已连接
      // const allConnected = this.message.connections.length === this.message.imgU.length;
      // 所有答案正确且所有选项都已连接才判定为全部正确
      // allCorrect = allCorrect && allConnected;

      // 打印结果数组
      // console.log("结果数组:", this.result);
      // 根据检查结果弹出提示框
      // alert(allCorrect ? '恭喜你，全部正确！' : '还有错误，请重试');
    },

    /**
     * 重置所有连线
     * 将所有选项的连接状态设置为未连接，并清空连线数组
     */
    resetAllConnections() {
      // 合并上下两侧的选项数组并将所有选项的连接状态设置为未连接
      [...this.localMessage.imgU, ...this.localMessage.imgD].forEach(item => { item.connected = false; });
      // 清空连线数组
      this.connections = [];
      // 重新绘制所有已存在的连线
      this.drawConnections();
    },

    /**
     * 重置最后一条连线
     * 如果存在最后一条连线，将相关选项的连接状态设置为未连接，并从连线数组中移除
     */
    resetLastConnection() {
      // 如果连线数组为空，直接返回
      if (this.connections.length === 0) return;
      // 移除最后一条连线
      const lastConnection = this.connections.pop();
      // 将最后一条连线的起始选项连接状态设置为未连接
      lastConnection.start.connected = false;
      // 将最后一条连线的结束选项连接状态设置为未连接
      lastConnection.end.connected = false;
      // 重新绘制所有已存在的连线
      this.drawConnections();
    }
  },
  /**
   * 监听数据变化
   * 当 imgU 或 imgD 发生变化时，重新绘制所有已存在的连线
   */
  watch: {
    'this.localMessage.imgU': {
      deep: true,
      handler() {
        this.drawConnections();
      }
    },
    // 使用字符串形式监听 allQuestions 中的 imgD 属性
    'this.localMessage.imgD': {
      deep: true,
      handler() {
        this.drawConnections();
      }
    }
  },
  /**
   * 组件销毁前的生命周期钩子函数
   * 移除窗口大小变化事件监听和鼠标事件监听
   */
  beforeDestroy() {
    // 移除窗口大小变化事件监听
    window.removeEventListener('resize', this.resizeCanvas);
    // 移除鼠标移动事件监听
    document.removeEventListener('mousemove', this.onMousemove);
    // 移除鼠标抬起事件监听
    document.removeEventListener('mouseup', this.onMouseup);
  }

}
</script>

<style>
.lxt_main_body .container {
  width: 1000px;
  height: 850px;
  margin: auto;
  border: 2px solid black;
  border-radius: 20px;
  position: relative;
}

.lxt_main_body .header {
  text-align: center;
  font-size: 50px;
  color: white;
  background-color: rgb(94, 211, 73);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px 0;
}



.lxt_main_body .questions {
  text-align: center;
  font-size: 30px;
  margin: 20px 0;
}

.lxt_main_body .content {
  width: 900px;
  height: 400px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  position: relative;
}

.lxt_main_body .options {
  display: flex;
  width: 80%;
  justify-content: space-around;
  margin: 20px 0;
  /* height: 120px; */
}

.lxt_main_body .option {
  width: 120px;
  height: 120px;
  margin: 10px;
  background-color: rgb(221, 254, 239);
  border: 2px solid black;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  transition: border-color 0.2s;
  border-radius: 20px;
    display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.lxt_main_body .option img {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

.lxt_main_body .option.active {
  border-color: #4CAF50;
}

.lxt_main_body .option.hover-valid {
  border-color: #4CAF50;
}

.lxt_main_body .option.hover-invalid {
  border-color: #F44336;
}

.lxt_main_body #canvas,
.lxt_main_body #backCanvas {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 0;
}

.lxt_main_body .buttons {
  text-align: center;
  margin: 0;
}

.lxt_main_body .button {
  width: 150px;
  height: 60px;
  padding: 10px 20px;
  margin: 0 20px;
  margin-bottom: 30px;
  font-size: 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.2s;

}

.lxt_main_body .button:hover {
  background-color: #45a049;
}

.lxt_main_body .submitDiv {
  text-align: center;
  margin: 10px 0;
}

.lxt_main_body .submit {
  width: 200px;
  height: 60px;
  padding: 10px 30px;
  font-size: 25px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 16px;
  cursor: pointer;
}
</style>