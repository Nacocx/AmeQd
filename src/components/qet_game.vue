<template>
  <div class="main_body" ref="main_body">
    <div class="begin" ref="begin">
      <div class="be"></div>
      <button class="btn" @click="start">点击开始游戏</button>
      <audio :src="message.yin" ref="yin" autoplay loop volume="0.5"></audio>
      <audio :src="message.win" ref="win"></audio>
      <audio :src="message.fail" ref="fail"></audio>
    </div>
    <div class="timu">
      <div class="t" v-for="(e, index) in message.questions_img" v-show="message.t_num == index">
        <div v-for="(e1, index1) in e" class="block" @click="xuan(index, index1 + 1)" :ref="`blo${index}${index1}`">
          <img :src="e1" alt="">
        </div>
      </div>
    </div>
    <div class="jia">
      <div v-for="index1 in 3">
        <img :src="message.place" alt="">
      </div>
    </div>
    <div class="kuang">
      <div class="ques" v-for="(e, index) in message.questions_title" v-show="message.t_num == index">
        <img :src="e" alt="">
      </div>
      <img :src="message.kuang" alt="">
    </div>
    <div class="qi" ref="qi">
      <img :src="message.cha" alt="">
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
  name: 'qet',
  data() {
    return {


    }
  },
  props: {
    message: {}
  },
  mounted() {


    this.$refs.main_body.style.backgroundImage = `url(${this.message.background_img})`;

  },
  methods: {
    start() {
      this.$refs.begin.style.display = 'none';
      this.$refs.yin.play();
    },
    async xuan(index, index1) {
      if (this.message.is_xuan) {
        return;
      }
      this.message.is_xuan = true;
      console.log(index1);
      console.log(this.message.trueAnswer[index]);

      this.message.userAnswer[index] = this.message.trueAnswer[index] == index1;
      this.message.trueNum += this.message.trueAnswer[index] == index1;
      console.log(this.message.userAnswer);
      const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
      if (this.message.trueAnswer[index] == index1) {
        var qi = this.$refs.qi;
        // 先获取元素的初始位置
        this.$refs.win.play();
        qi.style.position = 'absolute';
        qi.style.transition = 'all 1s ease,opacity 2s ease';
        qi.style.opacity = 0;
        qi.style.bottom = this.message.goPlace[index1 - 1].bottom + 'px';
        qi.style.left = this.message.goPlace[index1 - 1].left + 'px';
        qi.style.transform = "scale(0.5)";
        await wait(2500)
        qi.style.position = 'absolute';
        qi.style.transition = '0s';
        qi.style.bottom = '5px';
        qi.style.left = '450px';
        qi.style.transform = "";
        await wait(1)
        qi.style.transition = 'all 1s ease,opacity 1s ease';
        qi.style.opacity = 1;

      }
      else {
        this.$refs.fail.play();
        var blo = this.$refs[`blo${index}${index1 - 1}`][0]
        blo.style.transition = 'all 1s ease,opacity 1s ease';
        blo.style.position = 'relative';
        blo.style.transform = "translateY(-100px)";
        blo.style.opacity = 0;
        await wait(2000);
        blo.style.transition = '0s,opacity 1s ease';
        blo.style.transform = "";
        blo.style.opacity = 1;


      }
      this.message.is_xuan = false;
      this.message.t_num++;
      if (this.message.t_num == 4) {
        this.show_result()
      }


    },

    show_result() {
      this.$refs.show.style.display = 'block';

      if (this.message.trueNum >= 3) {
        this.message.mes[0] = "恭喜你"
        this.message.mes[1] = `成功答对${this.message.trueNum}题`
        this.message.mes[2] = `通过！`
      }
      else {
        this.message.mes[0] = "很遗憾"
        this.message.mes[1] = `只答对${this.message.trueNum}题`
        this.message.mes[2] = `未通过`
        let n = 3;

        //未通过模块 待完善
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
  /* background-image: url('/img_game3/back.jpeg'); */
  background-size: 100% 100%;
  background-repeat: no-repeat;
  overflow: hidden;

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

.show {
  width: 1050px;
  height: 600px;
  position: absolute;
  left: 0px;
  top: 0px;
  display: none;
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

img {
  width: 100px;
}

.t {
  width: 700px;
  height: 200px;
  /* background-color: antiquewhite; */
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  top: 120px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.block {
  /* background-color: aqua; */
  width: 170px;
  height: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 4px solid rgb(47, 34, 170);
  background-color: whitesmoke;
  position: relative;


}

.jia {
  width: 700px;
  height: 200px;
  /* background-color: antiquewhite; */
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  top: 310px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.pd {
  position: absolute;
  left: 100px;
  top: 46px;
  width: 50px;
  height: 50px;
  z-index: 189;
}

.pd img {
  width: 100%;
  height: 100%;
}

.jia img {
  width: 190px;
}

.qi {
  position: absolute;
  bottom: 5px;
  left: 450px;
  transition: left 2s ease, top 2s ease;
}

.qi img {
  width: 100px;
}

.kuang {
  position: absolute;
  width: 300px;
  bottom: 45px;
  left: 250px;
}

.ques {
  position: absolute;
  left: 47%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.ques img {
  width: 70px;
}
</style>