<template>
  <div class="main_body">
    <div class="title">


      <h1>{{ message.title }}</h1>
      <img :src="message.audio_img" alt="" class="laba" @click="playAudio(0, $event)" @touchend="playAudio(0, $event)">
    </div>
    <div class="options">
      <div v-for="(i, index) in message.num" :key="index" class="option block" ref="option"
        @mousedown="mouseDown(index, $event)">

      </div>
    </div>

    <div v-for="(i, index) in message.num" :key="index" class="option word" ref="word"
      @mousedown="mouseDown(index, $event)">
      <img :src="message.t_imgs[index]" alt="图片丢失">
    </div>
    <div class="btns">
      <button class="btn" @click="return0()">返回上一步</button>
      <button class="btn" @click="clear()">回到初始状态</button>

    </div>





  </div>
  <hr>
  <br>

</template>
<script>
export default {
  name: 'a',
  data() {
    return {
    };
  },
  props: {
    message: {}
  },
  methods: {
    playAudio(index, e) {
      if (e.touches) {
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
        // url_now = this.message.allQuestions[0].;
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

    getOption() {
      this.$refs.option.forEach((e) => {
        // console.log(e.getBoundingClientRect());
        const l = e.offsetLeft - 50;
        const t = e.offsetTop - 50;
        // 计算相对于父元素的右和下的距离
        const r = l + 100;
        const b = t + 100;
        this.message.pos_block.push({ t, l, b, r });
        // console.log(l,r,t,b);


      })
    },
    getWordPos() {
      this.$refs.word.forEach((e) => {
        let left, top;
        let isValidPosition = false;

        while (!isValidPosition) {
          left = Math.random() * 700 + 50;
          const t1 = Math.ceil(Math.random() * 2);
          if (t1 === 1) {
            top = Math.floor(Math.random() * 50 + 50);
          } else {
            top = Math.floor(Math.random() * 100 + 330);
          }

          // 检查新位置与已有位置的距离
          isValidPosition = true;
          for (const pos of this.message.pos_word) {
            const dx = left - pos.left;
            const dy = top - pos.top;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
              isValidPosition = false;
              break;
            }
          }
        }
        // console.log(left,top);
        e.style.left = `${left}px`;
        e.style.top = `${top}px`;
        e.style.position = 'absolute';
        this.message.pos_word.push({ left, top, x: left + 50, y: top + 50 });
        this.message.pos_history.push([{ left, top },])
        this.message.userAnswer.push(0);
      });
    },
    mouseDown(index, e) {
      if (this.message.draggingIndex !== -1) {
        return;
      }
      e.preventDefault();
      this.message.draggingIndex = index; // 记录当前拖动元素的索引
      const len = this.message.pos_history[index].length;
      this.message.startX = e.clientX - this.message.pos_history[index][len - 1].left;
      this.message.startY = e.clientY - this.message.pos_history[index][len - 1].top;
      // 绑定鼠标移动和抬起事件
      document.addEventListener('mousemove', this.mouseMove);
      document.addEventListener('mouseup', this.mouseUp);
      // 获取要拖动的元素
      this.message.wordElement = this.$refs.word[this.message.draggingIndex];
    },
    mouseMove(e) {
      if (this.message.draggingIndex !== -1 && this.message.wordElement) {
        const left = e.clientX - this.message.startX;
        const top = e.clientY - this.message.startY;
        this.message.wordElement.style.left = `${left}px`;
        this.message.wordElement.style.top = `${top}px`;
      }
    },
    mouseUp(e) {
      if (this.message.draggingIndex === -1 || !this.message.wordElement) {
        return;
      }

      let targetBlockIndex = -1;
      const left = e.clientX - this.message.startX;
      const top = e.clientY - this.message.startY;

      // 检查是否拖动到某个 block 区域
      this.message.pos_block.forEach((e1, index) => {
        if (left > e1.l && left < e1.r && top > e1.t && top < e1.b) {
          targetBlockIndex = index;
        }
      });

      let swappedWordIndex = -1; // 记录交换的另一个 word 的索引

      if (targetBlockIndex !== -1) {
        const l = this.message.pos_block[targetBlockIndex].l + 50;
        const t = this.message.pos_block[targetBlockIndex].t + 40;

        // 检查目标 block 是否已有 word
        const targetWordIndex = this.message.userAnswer[targetBlockIndex];
        // 检查当前拖动的 word 是否原本就在 block 中
        const sourceBlockIndex = this.message.userAnswer.indexOf(this.message.draggingIndex + 1);

        if (targetWordIndex !== 0 && sourceBlockIndex !== -1) {
          // 两个 block 里都有 word，交换位置
          const targetWordElement = this.$refs.word[targetWordIndex - 1];
          const sourcePos = this.message.pos_block[sourceBlockIndex];
          const targetPos = this.message.pos_block[targetBlockIndex];

          // 交换位置
          targetWordElement.style.left = `${sourcePos.l + 50}px`;
          targetWordElement.style.top = `${sourcePos.t + 40}px`;
          this.message.wordElement.style.left = `${targetPos.l + 50}px`;
          this.message.wordElement.style.top = `${targetPos.t + 40}px`;

          // 更新历史记录
          this.message.pos_history[targetWordIndex - 1].push({
            left: sourcePos.l + 50,
            top: sourcePos.t + 40
          });
          this.message.pos_history[this.message.draggingIndex].push({
            left: targetPos.l + 50,
            top: targetPos.t + 40
          });

          // 更新 userAnswer
          [this.message.userAnswer[sourceBlockIndex], this.message.userAnswer[targetBlockIndex]] = [
            targetWordIndex,
            this.message.draggingIndex + 1
          ];

          swappedWordIndex = targetWordIndex - 1; // 记录交换的另一个 word 的索引
        } else if (targetWordIndex !== 0) {
          // 目标 block 有 word，当前拖动的 word 不在 block 中
          const initialPos = this.message.pos_history[targetWordIndex - 1][0];
          const targetWordElement = this.$refs.word[targetWordIndex - 1];
          targetWordElement.style.left = `${initialPos.left}px`;
          targetWordElement.style.top = `${initialPos.top}px`;
          this.message.pos_history[targetWordIndex - 1].push({ ...initialPos });
          this.message.userAnswer[targetBlockIndex] = 0;

          this.message.wordElement.style.left = `${l}px`;
          this.message.wordElement.style.top = `${t}px`;
          this.message.pos_history[this.message.draggingIndex].push({ left: l, top: t });
          this.message.userAnswer[targetBlockIndex] = this.message.draggingIndex + 1;
        } else {
          // 目标 block 没有 word
          this.message.wordElement.style.left = `${l}px`;
          this.message.wordElement.style.top = `${t}px`;
          this.message.pos_history[this.message.draggingIndex].push({ left: l, top: t });
          this.message.userAnswer[targetBlockIndex] = this.message.draggingIndex + 1;
        }
      } else {
        // 若未拖动到 block 区域，回到上一个位置
        const len = this.message.pos_history[this.message.draggingIndex].length;
        const prevPos = this.message.pos_history[this.message.draggingIndex][len - 1];

        // const sourceBlockIndex = this.message.userAnswer.indexOf(this.message.draggingIndex + 1);
        // if (sourceBlockIndex !== -1) {
        //   this.message.userAnswer[sourceBlockIndex] = 0;
        // }
        this.message.wordElement.style.left = `${prevPos.left}px`;
        this.message.wordElement.style.top = `${prevPos.top}px`;
      }

      if (swappedWordIndex !== -1) {
        // 打印日志，检查索引值
        console.log('Dragging Index:', this.message.draggingIndex, 'Swapped Word Index:', swappedWordIndex);
        this.message.swapHistory.push([this.message.draggingIndex, swappedWordIndex]); // 记录交换操作
      }

      this.message.draggingIndex = -1;
      this.message.wordElement = null;
      console.log(this.message.userAnswer);
      this.check();

      // 移除事件监听
      document.removeEventListener('mousemove', this.mouseMove);
      document.removeEventListener('mouseup', this.mouseUp);
    },
    return0() {
      if (this.message.swapHistory.length > 0) {
        const [index1, index2] = this.message.swapHistory.pop(); // 获取最后一次交换的两个 word 的索引

        // 撤销第一个 word 的位置
        const history1 = this.message.pos_history[index1];
        if (history1.length > 1) {
          const lastPos1 = history1.pop();
          const prevPos1 = history1[history1.length - 1];
          const wordElement1 = this.$refs.word[index1];
          wordElement1.style.left = `${prevPos1.left}px`;
          wordElement1.style.top = `${prevPos1.top}px`;

          // 更新 userAnswer
          const currentBlockIndex1 = this.message.userAnswer.indexOf(index1 + 1);
          if (currentBlockIndex1 !== -1) {
            this.message.userAnswer[currentBlockIndex1] = 0;
          }
          let prevBlockIndex1 = -1;
          for (let j = 0; j < this.message.pos_block.length; j++) {
            const block = this.message.pos_block[j];
            if (prevPos1.left > block.l && prevPos1.left < block.r && prevPos1.top > block.t && prevPos1.top < block.b) {
              prevBlockIndex1 = j;
              break;
            }
          }
          if (prevBlockIndex1 !== -1) {
            this.message.userAnswer[prevBlockIndex1] = index1 + 1;
          }
        }

        // 撤销第二个 word 的位置
        const history2 = this.message.pos_history[index2];
        if (history2.length > 1) {
          const lastPos2 = history2.pop();
          const prevPos2 = history2[history2.length - 1];
          const wordElement2 = this.$refs.word[index2];
          wordElement2.style.left = `${prevPos2.left}px`;
          wordElement2.style.top = `${prevPos2.top}px`;

          // 更新 userAnswer
          const currentBlockIndex2 = this.message.userAnswer.indexOf(index2 + 1);
          if (currentBlockIndex2 !== -1) {
            this.message.userAnswer[currentBlockIndex2] = 0;
          }
          let prevBlockIndex2 = -1;
          for (let j = 0; j < this.message.pos_block.length; j++) {
            const block = this.message.pos_block[j];
            if (prevPos2.left > block.l && prevPos2.left < block.r && prevPos2.top > block.t && prevPos2.top < block.b) {
              prevBlockIndex2 = j;
              break;
            }
          }
          if (prevBlockIndex2 !== -1) {
            this.message.userAnswer[prevBlockIndex2] = index2 + 1;
          }
        }
      } else {
        // 从后往前遍历历史记录，找到最近一次移动的元素
        for (let i = this.message.pos_history.length - 1; i >= 0; i--) {
          const history = this.message.pos_history[i];
          // 若历史记录长度大于 1，说明有可撤销的步骤
          if (history.length > 1) {
            // 移除最后一条历史记录
            const lastPos = history.pop();
            const prevPos = history[history.length - 1];

            // 更新元素位置
            const wordElement = this.$refs.word[i];
            wordElement.style.left = `${prevPos.left}px`;
            wordElement.style.top = `${prevPos.top}px`;

            // 找到当前元素所在的 block 索引
            const currentBlockIndex = this.message.userAnswer.indexOf(i + 1);
            if (currentBlockIndex !== -1) {
              this.message.userAnswer[currentBlockIndex] = 0;
            }

            // 检查上一个位置是否在某个 block 中
            let prevBlockIndex = -1;
            for (let j = 0; j < this.message.pos_block.length; j++) {
              const block = this.message.pos_block[j];
              if (prevPos.left > block.l && prevPos.left < block.r && prevPos.top > block.t && prevPos.top < block.b) {
                prevBlockIndex = j;
                break;
              }
            }

            if (prevBlockIndex !== -1) {
              this.message.userAnswer[prevBlockIndex] = i + 1;
            }

            // 只撤销最近一次移动，找到后退出循环
            break;
          }
        }
      }
      this.check();
    },
    check() {
      let flag = false; // 初始化 flag 为 false
      // 使用 for...of 循环替代 forEach
      for (const e of this.message.trueAnswer) {
        let isMatch = true; // 标记当前子数组是否匹配
        const len = e.length; // 获取当前子数组的长度
        for (let i = 0; i < len; i++) {
          if (e[i] !== this.message.userAnswer[i]) {
            isMatch = false; // 不匹配，标记为 false
            break;
          }
        }
        if (isMatch) {
          flag = true; // 找到匹配的子数组，标记为 true
          break; // 跳出外层循环
        }
      }
      // 可以根据 flag 的值进行后续操作
      this.message.flag = flag
      console.log(flag);
    },
    clear() {
      this.message.pos_history = [];
      this.message.userAnswer = Array(this.message.num).fill(0); // 重置 userAnswer
      for (let i = 0; i < this.message.num; i++) {
        this.message.pos_history.push([{ left: this.message.pos_word[i].left, top: this.message.pos_word[i].top }]);
        this.$refs.word[i].style.left = `${this.message.pos_word[i].left}px`;
        this.$refs.word[i].style.top = `${this.message.pos_word[i].top}px`;
      }
      this.message.startX = 0;
      this.message.startY = 0;
      this.message.draggingIndex = -1;
      this.message.wordElement = null;
      console.log(this.message.userAnswer);

      this.check();
    },
  },
  mounted() {
    this.getWordPos();
    this.getOption();
    document.removeEventListener('mousemove', this.mouseMove);
    document.removeEventListener('mouseup', this.mouseUp);

  },
}

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.title {
  position: absolute;
  top: 20px;
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

.main_body {
  width: 850px;
  height: 600px;
  text-align: center;
  /* border: 1px solid black; */
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 50px;
  margin-top: 20px;
}

.options {
  width: 700px;
  display: flex;

  flex-wrap: wrap;
}

.options .block {
  width: 100px;
  height: 100px;
  border: 1px solid black;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
}

.word {
  width: 100px;
  height: 100px;
  /* border: 1px solid black; */
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;

}

.option img {
  width: 100%;
  height: 100%;
}

.btns {
  position: absolute;
  bottom: 20px;
}

.btn {

  height: 40px;
  padding-left: 10px;
  padding-right: 10px;
  line-height: 40px;
  margin: 0 20px;

  font-size: 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.2s;
}
</style>