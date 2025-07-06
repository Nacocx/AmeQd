<template>
  <div class="main_body" ref="main_body">
    <div class="begin" ref="begin">
      <div class="be"></div>
      <button class="btn" @click="start">点击开始游戏</button>
      <audio :src="message.yin" ref="yin" autoplay loop volume="0.5"></audio>
      <audio :src="message.win" ref="win"></audio>
      <audio :src="message.fail" ref="fail"></audio>
    </div>

    <div class="container" ref="container">
    </div>
    <div class="up">
      <div class="up1"></div>
      <div class="up2"></div>
      <div class="up3"></div>
    </div>
    <div class="down">
      <div class="down1"></div>
      <div class="down2"></div>
      <div class="down3"></div>
    </div>
    <div class="Lan" ref="Lan"></div>
    <div class="Ren" ref="r"></div>
    <div>
      <div class="t_img" ref="t">
      </div>
      <div class="t" v-for="(e, index) in message.questions">
        <img :src="e" alt="" v-show="message.now_t == index">
      </div>
    </div>
    <div>
      <!-- 绑定 tiao 元素高度样式 -->
      <div class="tiao"
        :style="{ height: message.tiaoHeight, left: message.tiaoLeft, transition: message.transitionStyleTiao }"
        ref="tiao">
      </div>
      <!-- 绑定 Gou 元素位置样式和动画类 -->
      <div class="Gou" :style="{ left: message.gouLeft, top: message.gouTop, transition: message.transitionStyleGou }"
        ref="Gou"></div>
    </div>

    <div class="options" v-for="(e, index) in message.questions" :key="index" ref="options"
      v-show="message.now_t == index">
      <div class="option" v-for="(e1, index1) in message.reply[index]">
        <div class="o_img" :ref="`oImg_${index}_${index1}`">
          <img :src="message.reply_img[index][index1]" alt="">
        </div>
        <div class="o" @click="dian(index, index1)">
          <div class="pd">
            <img :src="message.pd[0]" alt="" v-show="message.p[index][index1] == 1">
          </div>
          <div class="pd">
            <img :src="message.pd[1]" alt="" v-show="message.p[index][index1] == 0" ref="cuo" class="cuo">
          </div>
          <img :src="e1" alt="" class="reply">
        </div>
      </div>
    </div>
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

</template>
<script>
export default {
  name: 'zww',
  data() {
    return {

    };
  },
  props: {
    message: {}
  },
  mounted() {
    this.message.options = this.$refs.options;
    this.$refs.main_body.style.backgroundImage = `url(${this.message.background_img})`;
    this.$refs.Gou.style.backgroundImage = `url(${this.message.gou_img})`;
    this.$refs.tiao.style.backgroundImage = `url(${this.message.tiao_img})`;
    this.$refs.r.style.backgroundImage = `url(${this.message.r_img})`;
    this.$refs.Lan.style.backgroundImage = `url(${this.message.Lan_img})`;
    this.$refs.t.style.backgroundImage = `url(${this.message.t1_img})`;
  },
  methods: {
    start() {
      this.$refs.begin.style.display = 'none';
      this.$refs.yin.play();
    },
    async dian(index, index1) {
      this.$refs.yin.play();
      console.log("index=", index, "t=", this.message.now_t);

      if (this.message.is_click) {
        return;
      }
      this.message.userAnswer[this.message.now_t] = (index1 + 1) == this.message.true_answer[this.message.now_t];
      this.message.trueNum += (index1 + 1) == this.message.true_answer[this.message.now_t];

      console.log(this.message.userAnswer);
      if ((index1 + 1) == this.message.true_answer[this.message.now_t]) {

        this.message.is_click = true;
        var oImgElement = this.$refs[`oImg_${index}_${index1}`][0];
        var dis = 267 * index1 + 134;
        console.log(index1);
        var t = 0.5 + index1 * 0.5;
        this.message.transitionStyleGou = `left ${t}s ease, top 1s ease`
        this.message.transitionStyleTiao = `left ${t}s ease, top 1s ease, height 1s ease`
        this.message.gouLeft = `${dis}px`;//247-77=170
        this.message.tiaoLeft = `${dis + 40}px`;
        const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        //其实感觉异步并没有清晰多少

        await wait(t * 1000);
        setTimeout(() => {

          this.message.tiaoHeight = '10px'
        }, 1000);
        this.message.gouTop = '320px';
        this.message.tiaoHeight = '110px'

        await wait(1000);
        this.message.gouTop = '220px';
        this.show_yanhua();

        this.message.p[index][index1] = (index1 + 1) == this.message.true_answer[this.message.now_t];
        this.$refs.win.play();
        oImgElement.style.position = 'relative';
        oImgElement.style.transition = `left ${t}s ease, top 1s ease`
        oImgElement.style.top = '-90px';
        // oImgElement.style.transition = `left ${t}s ease, top 1s ease`
        await wait(1000);
        this.message.transitionStyleGou = `left ${2 - t}s ease, top 1s ease`;
        this.message.transitionStyleTiao = `left ${2 - t}s ease, top 1s ease, height 1s ease`;
        oImgElement.style.transition = `left ${2 - t}s ease, top 1s ease`

        this.message.gouLeft = `1035px`;
        this.message.tiaoLeft = `1075px`;
        oImgElement.style.left = `${900 - 267 * index1}px`
        await wait(1500);
        oImgElement.style.top = `270px`
        await wait(5500 - (t * 1000 + 3000));
        this.message.transitionStyleGou = `left 2s ease, top 1s ease`;
        this.message.transitionStyleTiao = `left 2s ease, top 1s ease, height 1s ease`;
        this.message.gouLeft = this.message.gouLeft_begin;
        this.message.tiaoLeft = this.message.tiaoLeft_begin;
      }
      else {
        this.message.is_click = true;
        var oImgElement = this.$refs[`oImg_${index}_${index1}`][0];
        var dis = 267 * index1 + 134;
        console.log(index1);
        var t = 0.5 + index1 * 0.5;
        this.message.transitionStyleGou = `left ${t}s ease, top 1s ease`
        this.message.transitionStyleTiao = `left ${t}s ease, top 1s ease, height 1s ease`
        this.message.gouLeft = `${dis}px`;//247-77=170
        this.message.tiaoLeft = `${dis + 40}px`;
        const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        //其实感觉异步并没有清晰多少
        await wait(t * 1000);
        setTimeout(() => {

          this.message.tiaoHeight = '10px'
        }, 1000);
        this.message.gouTop = '320px';
        this.message.tiaoHeight = '110px'

        await wait(1000);
        this.message.p[index][index1] = (index1 + 1) == this.message.true_answer[this.message.now_t];
        this.$refs.fail.play();
        var cuo = this.$refs.cuo[index * 3 + index1];
        console.log(cuo);
        cuo.style.transform = `scale(1)`;
        cuo.style.transform = '';
        cuo.style.transition = 'transform 1s ease';
        setTimeout(() => {
          cuo.style.transform = `scale(1.5)`;
          console.log(2);
        }, 0);
        setTimeout(() => {
          cuo.style.transform = `scale(1)`;
          console.log(2);
        }, 500);
        setTimeout(() => {
          cuo.style.transform = `scale(1.5)`;
          console.log(2);
        }, 1000);
        setTimeout(() => {
          cuo.style.transform = `scale(1)`;
          console.log(2);
        }, 1500);
        this.message.gouTop = '220px';
        await wait(5500 - (t * 1000 + 3000));
        this.message.transitionStyleGou = `left 2s ease, top 1s ease`;
        this.message.transitionStyleTiao = `left 2s ease, top 1s ease, height 1s ease`;
        this.message.gouLeft = this.message.gouLeft_begin;
        this.message.tiaoLeft = this.message.tiaoLeft_begin;
        // clearInterval(time);
        // cuo.style.transform = 'scale(1)';
      }


      this.message.now_t++;
      this.message.is_click = false;
      this.message.p[index][index1] = -1;
      if (this.message.now_t >= this.message.tnum) {
        this.show_result();
        console.log(1);

      }


      // setTimeout(() => {
      //     this.message.gouTop = '210px';
      //     this.message.tiaoHeight = '90px'
      //     setTimeout(() => {

      //       this.message.tiaoHeight = '10px'
      //     }, 1000);
      //   }, t * 1000);
      //   setTimeout(() => {
      //     this.message.gouTop = '140px'
      //   }, t * 1000 + 1000);
      //   setTimeout(() => {
      //     this.message.transitionStyleGou = `left ${2 - t}s ease, top 1s ease`;
      //     this.message.transitionStyleTiao = `left ${2 - t}s ease, top 1s ease, height 1s ease`;
      //     this.message.gouLeft = `635px`;
      //     this.message.tiaoLeft = `663px`
      //   }, t * 1000 + 2000);
      //   setTimeout(() => {
      //     this.message.transitionStyleGou = `left 2s ease, top 1s ease`;
      //     this.message.transitionStyleTiao = `left 2s ease, top 1s ease, height 1s ease`;
      //     this.message.gouLeft = this.message.gouLeft_begin;
      //     this.message.tiaoLeft = this.message.tiaoLeft_begin;
      //   }, 4500);



    },
    show_result() {
      this.$refs.show.style.display = 'block';

      if (this.message.trueNum >= this.message.tnum * 0.6) {
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


    },
    show_no(index) {

    },
    show_yanhua(e) {
      console.log(1);

      var a = 10;
      var time = setInterval(() => {
        a--;
        if (a < 0) {
          clearInterval(time);
        }
        this.launchFirework(e);
      }, 200)
    },
    launchFirework(e) {
      const firework = document.createElement('div');
      const container = this.$refs.container;
      firework.className = 'firework';

      // 随机位置或指定位置

      const rect = container.getBoundingClientRect();
      console.log(container);

      // 生成随机的 x 坐标，范围保持不变
      const x = Math.random() * rect.width;
      // 生成随机的 y 坐标，范围限定在容器高度的上 1/3 部分
      const y = Math.random() * (rect.height / 3) + 100;
      console.log(x, y);



      // 随机颜色
      const red = Math.floor(Math.random() * 256);
      const green = Math.floor(Math.random() * 256);
      const blue = Math.floor(Math.random() * 256);
      const color = `rgb(${red}, ${green}, ${blue})`;
      firework.style.position = "absolute";
      firework.style.backgroundColor = color;

      firework.style.width = '5px';

      firework.style.height = '5px';

      firework.style.borderRadius = '50%';

      // 设置位置
      firework.style.left = `${x}px`;
      firework.style.bottom = '0px';
      console.log(firework);

      container.appendChild(firework);

      // 显示烟花
      setTimeout(() => {
        console.log(2);

        firework.style.opacity = '1';
        // 发射动画
        firework.animate([
          { bottom: '0px' },
          { bottom: `${y}px` }
        ], {
          duration: 800 + Math.random() * 400,
          easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });

        // 到达顶部后爆炸
        setTimeout(() => {
          firework.style.opacity = '0';
          this.explodeFirework(x, y, color);

          // 移除烟花元素
          setTimeout(() => {
            container.removeChild(firework);
          }, 500);
        }, 800 + Math.random() * 400);
      }, 50);
    },
    explodeFirework(x, y, baseColor) {

      const container = this.$refs.container;
      const particleCount = 50 + Math.floor(Math.random() * 30);
      const particles = [];

      // 创建粒子
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // 基于基础颜色生成随机颜色变化
        const hue = baseColor;
        const luminance = Math.max(50, Math.min(90, 70 + Math.random() * 40));
        const color = hue; // 这里简化处理，实际项目中可以更复杂地生成颜色变化

        particle.style.backgroundColor = color;
        particle.style.left = `${x}px`;
        particle.style.bottom = `${y}px`;

        particle.style.width = '3px';

        particle.style.height = '3px';

        particle.style.borderRadius = '50%';

        particle.style.position = 'absolute';

        particle.style.opacity = '0';

        particle.style.zIndex = '120';
        container.appendChild(particle);
        particles.push(particle);
      }
      // 粒子散开动画
      particles.forEach(particle => {
        // 随机角度和距离
        const angle = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * 100;

        // 计算目标位置
        const targetX = x + Math.cos(angle) * distance;
        const targetY = y + Math.sin(angle) * distance;

        // 随机动画持续时间
        const duration = 800 + Math.random() * 700;

        // 粒子动画
        const animation = particle.animate([
          { left: `${x}px`, bottom: `${y}px`, opacity: '1' },
          { left: `${targetX}px`, bottom: `${targetY}px`, opacity: '0' }
        ], {
          duration: duration,
          easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });

        // 动画结束后移除粒子
        animation.onfinish = () => {
          if (container.contains(particle)) {
            container.removeChild(particle);
          }
        };
      });
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


.up {
  z-index: 6;
  position: absolute;
  left: 0px;
  top: 80px;
  height: 840px;
  background-color: aqua;
  /* z-index: 200; */
}

.up .up1 {
  width: 1200px;
  height: 12px;
  position: absolute;
  top: 130px;
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
  background-color: rgb(121, 152, 255);
}

.up .up2 {
  width: 900px;
  height: 240px;
  position: absolute;
  bottom: 0px;
  border-right: 6px solid rgb(121, 152, 255);
  border-top: 6px solid rgb(121, 152, 255);

  background-color: rgb(218, 237, 255);
}

.up .up3 {
  width: 6px;
  height: 470px;
  position: absolute;
  top: 130px;
  left: 894px;
  background-color: rgb(121, 152, 255);
}


.down {
  width: 780px;
  z-index: 1;
  position: absolute;
  left: 0px;
  top: 80px;
  height: 600px;
}

.down .down1 {
  position: absolute;
  left: 0px;
  top: 490px;
  height: 120px;
  width: 850px;
  background-color: rgb(218, 237, 255);
  border-top: 6px solid rgb(165, 182, 240);
  overflow: hidden;

}

.down .down2 {
  position: absolute;
  left: 830px;
  top: 490px;
  transform: skew(20deg);
  height: 120px;
  width: 50px;
  background-color: rgb(218, 237, 255);
  border-right: 6px solid rgb(165, 182, 240);
  border-top: 6px solid rgb(165, 182, 240);
  overflow: hidden;

}

.down .down3 {
  position: absolute;
  left: 853px;
  top: 130px;
  height: 363px;
  width: 6px;
  background-color: rgb(165, 182, 240);

}

.main_body {
  height: 923px;
  width: 1680px;
  text-align: center;
  border: 1px solid black;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-image: url('/img/back.jpeg'); */
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin-bottom: 20px;
}

.show {
  height: 923px;
  width: 1680px;
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
  height: 923px;
  width: 1680px;
}

.result {
  position: absolute;
  left: 53%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 750px;
  height: 600px;
  background-color: rgb(255, 255, 255);
  border-radius: 20px;
  position: absolute;
  z-index: 10;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}


.begin .be {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9;
  background-color: aliceblue;
  opacity: 0.7;
  height: 923px;
  width: 1680px;
}

.begin .btn {
  position: absolute;
  width: 380px;
  height: 80px;
  font-size: 30px;
  left: 680px;
  top: 400px;
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

.result .ws {
  width: 600px;
  height: 340px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

}

.ws .word1 {
  width: 600px;
  font-size: 70px;
  font-weight: 750px;

}

.ws .word2 {
  width: 600px;
  font-size: 60px;
  font-weight: 10px;
}

.ws .word3 {
  text-align: center;
  width: 600px;
  font-size: 60px;
  font-weight: 10px;
}

.Lan {
  width: 220px;
  height: 160px;
  /* background-image: url('/img/L.png'); */
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  right: 480px;
  bottom: 60px;
  z-index: 6;
}

.reply {
  height: 38px;
}

.Ren {
  width: 310px;
  height: 430px;
  /* background-image: url('/img/r.png'); */
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  right: 50px;
  bottom: 60px;
}

.t_img {
  width: 300px;
  height: 300px;
  /* background-image: url('/img/t1.png'); */
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  right: 120px;
  bottom: 460px;
}


.t {
  width: 100px;
  height: 100px;
  position: absolute;
  right: 220px;
  bottom: 558px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.t img {
  /* width: 100px; */
  height: 37px;
}


.tiao {
  width: 19px;
  /* background-image: url('/img/tiao.png'); */
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 58px;
  top: 220px;
  transition: height 3s ease;
  transition: left 0.5s ease, top 0.5s ease;
}

.Gou {
  width: 100px;
  height: 100px;
  /* background-image: url('/img/g.png'); */
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 10px;
  top: 220px;
  transition: left 0.5s ease, top 0.5s ease;
}


.o_img {
  width: 160px;
  height: 190px;
  margin-left: 15px;
  position: relative;
  top: 10px;
  left: 0px;
  transition: top 1s ease;
  /* 添加过渡效果 */
}

.o_img img {
  width: 100%;
  height: 100%;
}

.o {
  width: 190px;
  height: 130px;
  background-color: rgb(255, 255, 255);
  border-radius: 15px;
  border: 3px solid rgb(157, 155, 34);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.o img {
  /* width: 50%;
  height: 60%; */
}

.options {
  position: absolute;
  left: 50px;
  top: 350px;
  width: 800px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 2;
  display: flex;
}

.container {
  margin: auto;
  width: 1680px;
  height: 200px;
  /* background-color: rgba(0, 0, 0, 0.8); */
  overflow: hidden;
  position: absolute;
  z-index: 10;
  cursor: pointer;
  top: 0px;
}

.firework {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  position: absolute;
  opacity: 0;
  z-index: 120;
}

.particle {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  position: absolute;
  opacity: 0;
  z-index: 120;

}

.pd {
  position: absolute;
  left: 160px;
  top: 76px;
  width: 50px;
  height: 50px;
  z-index: 189;
}

.pd img {
  width: 100%;
  height: 100%;
}

.cuo {
  transform: scale(1);

}
</style>