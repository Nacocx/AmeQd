<template>
  <div class="main_body" ref="main">
    <div class="begin" ref="begin">
      <div class="be"></div>
      <button class="btn" @click="start">点击开始游戏</button>
      <audio :src="message.yin" ref="yin" autoplay loop volume="0.5"></audio>
      <audio :src="message.win" ref="win"></audio>
      <audio :src="message.fail" ref="fail"></audio>
    </div>
    <div class="ques">
      <img :src="e" alt="" v-for="(e, index) in message.question_img" v-show="index == message.t_num">
    </div>


    <div class="ren">
      <img :src="message.r_img[0]" alt="" v-show="message.is_show_ren == 1">
      <img :src="message.r_img[1]" alt="" v-show="message.is_show_ren == 0">
    </div>
    <div class="questions" v-for="(e, index) in message.questions" v-show="index == message.t_num">
      {{ e }}
    </div>
    <div class="options" v-for="(e, index) in message.options" v-show="index == message.t_num">
      <div class="o1 o" @click="xuan(index, 1)" :ref="`yu${index}`">
        <img :src="message.yu[index][0]" alt="" class="yu" :ref="`yuy${index}`">
        <img :src="e[0]" alt="" class="op">
      </div>
      <div class="o2 o" @click="xuan(index, 2)" :ref="`yu${index}`">
        <img :src="message.yu[index][1]" alt="" class="yu" :ref="`yuy${index}`">
        <img :src="e[1]" alt="" class="op">

      </div>
      <div class="o3 o" @click="xuan(index, 3)" :ref="`yu${index}`">
        <img :src="message.yu[index][2]" alt="" class="yu" :ref="`yuy${index}`">
        <img :src="e[2]" alt="" class="op">

      </div>

    </div>

    <!-- 最终结果 -->
    <div class="show" ref="show">
      <div class="final"></div>
      <div class="result">
        <div class="ws">
          <div class="word1">{{ message.mes[0] }}</div>
          <div class="word2">{{ message.mes[1] }}</div>
          <div class="word3">{{ message.mes[2] }}</div>
          <div class="word4" v-show="message.mes[3].length >= 1">{{ message.mes[3] }}</div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div><button @click="bian()">的风格</button></div> -->

</template>
<script>
export default {
  name: 'dyt',
  data() {
    return {
      yu_num: 0,
    }
  },
  props: {
    message: {}
  },
  mounted() {
    this.begin();
    this.$refs.main.style.backgroundImage = `url(${this.message.background_img})`;

  },
  methods: {
    start() {
      this.$refs.begin.style.display = 'none';
      this.$refs.yin.play();
    },
    async begin() {
      console.log(1);


      if (this.message.t_num == this.message.ts) {
        return;
      }
      var yus = this.$refs[`yu${this.message.t_num}`]
      console.log(yus);
      yus.forEach((e, index) => {
        e.style.position = 'absolute';
        e.style.transition = "left 2s ease";
        e.style.left = `${this.message.yu_bpos[index] + 1200}px`;
        // console.log(e);

      })
      setTimeout(() => {
        yus.forEach((e, index) => {
          e.style.position = 'absolute';
          e.style.transition = "left 2s ease";
          e.style.left = `${this.message.yu_bpos[index] + 500}px`;
          // console.log(e);
          this.message.is_xun = false;

        })
      }, 500)
      // yus.style.left = `${this.message.yu_bpos[this.message.t_num]+500}px`;

    },
    async xuan(index, ans) {
      const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
      if (this.message.is_xun) {
        console.log(1);

        return;
      }
      this.message.is_xun = true;
      this.message.userAnswer[index] = this.message.trueAnswer[index] == ans;
      this.message.trueNum += this.message.trueAnswer[index] == ans;
      if (this.message.trueAnswer[index] == ans) {
        this.$refs.win.play();
        var yus = this.$refs[`yu${this.message.t_num}`][ans - 1];
        console.log(1);
        yus.position = 'absolute';
        yus.style.transition = "left 2s ease, top 2s ease,opacity 0.2s ease";
        yus.style.left = `0px`;
        yus.style.top = `-50px`;
        await wait(2000)
        this.message.is_show_ren = 0;
        yus.style.left = `0px`;
        yus.style.top = `50px`;
        var c = 0;
        var t1 = setInterval(() => {
          c++;
          yus.style.opacity = 1 - c * 0.2;
          if (c == 5) {
            clearInterval(t1);
          }
        }, 200)
        await wait(1000)
        this.message.is_show_ren = 1;

      }
      else {
        this.$refs.fail.play();
        var yus = this.$refs[`yuy${this.message.t_num}`][ans - 1];
        yus.style.transition = "transform 1s ease,opacity 1s ease";
        yus.style.opacity = '1';
        yus.style.transform = 'rotate(0deg) translate(0px)';
        yus.style.transform = 'rotate(20deg) translate(-30px)';
        await wait(500);
        yus.style.transition = "transform 4s ease,opacity 1.5s ease";
        // 向左旋转 120 度
        yus.style.transform = 'rotate(-120deg) translate(-200px)';
        yus.style.opacity = '0';
        await wait(2000);



      }
      this.message.userAnswer
      this.message.is_xun = false;
      this.message.t_num++;
      if (this.message.t_num == this.message.ts) {
        this.show_result();
      }
      this.begin();
      console.log(this.message.userAnswer);


    },
    bian() {
      if (this.message.is_show_ren == 1) {
        this.message.is_show_ren = 0;
      }
      else {

        this.message.is_show_ren = 1;
      }
    },
    show_result() {
      this.$refs.show.style.display = 'block';

      if (this.message.trueNum >= this.message.ts * 0.8) {
        this.message.mes[0] = "恭喜你"
        this.message.mes[1] = `成功答对${this.message.trueNum}题`
        this.message.mes[2] = `通过！`
      }
      else {
        this.message.mes[0] = "很遗憾"
        this.message.mes[1] = `只答对${this.message.trueNum}题`
        this.message.mes[2] = `未通过`
        let n = 3;
        
        // setTimeout(() => {
        //   this.message.mes[3] = `即将重新开始 ${n}`;
        //   n--;
        // }, 1000)
      }
    }
  }
}

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main_body {
  width: 960px;
  height: 600px;
  text-align: center;
  border: 1px solid black;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-image: url('/img_game2/all.png'); */
  background-size: 100% 100%;
  background-repeat: no-repeat;
  overflow: hidden;
  margin-bottom: 20px;

}

.show {
  width: 1000px;
  height: 600px;
  position: absolute;
  left: 0px;
  top: 0px;
  display: none;
}

.begin .be {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9;
  background-color: aliceblue;
  opacity: 0.7;
  width: 1000px;
  height: 600px;
}

.begin .btn {
  position: absolute;
  width: 200px;
  height: 50px;
  left: 400px;
  top: 250px;
  background-color: whitesmoke;
  border-radius: 20px;
  border: 2px solid rgb(121, 152, 255);
  z-index: 100;
  cursor: pointer;
  animation: scaleAnimation 1s infinite alternate ease-in-out;
}

@keyframes scaleAnimation {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.5);
  }
}

.final {
  position: absolute;
  z-index: 9;
  background-color: aliceblue;
  opacity: 0.7;
  width: 1000px;
  height: 600px;
}

.result {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 400px;
  background-color: rgb(255, 255, 255);
  border-radius: 20px;
  position: absolute;
  z-index: 10;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.result .ws {
  width: 300px;
  height: 250px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

}

.ws .word1 {
  width: 300px;
  font-size: 60px;
  font-weight: 750px;

}

.ws .word2 {
  width: 300px;
  font-size: 40px;
  font-weight: 10px;
}

.ws .word3 {
  width: 300px;
  font-size: 40px;
  font-weight: 10px;
}

.ren {
  position: absolute;
  left: 60px;
  top: 230px;
  width: 300px;
}

.ren img {
  width: 100%;
}

.ques {
  position: absolute;
  top: 20px;
  right: 200px;
  width: 300px;
  height: 300px;
  background-color: rgb(255, 255, 255);
  border-radius: 20px;
  border: 4px solid;
  display: flex;
  justify-content: center;
  align-items: center;

}

.questions {
  font-size: 30px;
  position: absolute;
  left: 380px;
  top: 340px;
}

.ques img {
  width: 200px;
  height: 250px;
}

.options {
  width: 630px;
  height: 130px;
  /* background-color: antiquewhite; */
  position: absolute;
  bottom: 10px;
  right: 10px;

}

.o {

  /* background-color: aqua; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
}

.op {
  width: 60px;
  height: 60px;
}

.yu {
  width: 60px;
}

.o1 {
  position: absolute;
  left: -400px;
  top: 10px;
  transition: left 2s ease;
}

.o2 {
  position: absolute;
  left: -250px;
  top: 70px;
  transition: left 2s ease;
}

.o3 {
  position: absolute;
  left: -100px;
  top: 0px;
  transition: left 2s ease;
}
</style>