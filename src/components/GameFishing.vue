<template>
  <div class="game-container">
    <div ref="gameContainer" class="phaser-container"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { ElMessage } from "element-plus";
import Phaser from "phaser";

const props = defineProps({
  GameFishingJsonArray: {
    type: Array,
    required: true
  }
});

const gameContainer = ref(null);
let game = null;

onMounted(() => {
  let currentQuestionIndex = 0;
  let hp = 3;
  let maxTries = 5;
  let successCount = 0;
  let questionQueue = [...props.GameFishingJsonArray];

  const preload = function () {
    props.GameFishingJsonArray.forEach((q, qi) => {
      q.fishImages.forEach((url, idx) => {
        const key = `fish_${qi}_${idx}`;
        this.load.image(key, url.replace("VITE_RES_BASE_PATH", import.meta.env.VITE_RES_BASE_PATH));
      });

      if (q.bubbleImage) {
        const bubbleKey = `bubble_${qi}`;
        this.load.image(bubbleKey, q.bubbleImage.replace("VITE_RES_BASE_PATH", import.meta.env.VITE_RES_BASE_PATH));
      }
    });
  };


  const create = function () {
    // 将 Vue 层变量挂到 Phaser this 上
    this.hp = 3;
    this.successCount = 0;
    this.maxTries = 5;
    this.currentQuestionIndex = 0;
    this.questionQueue = [...props.GameFishingJsonArray];

    this.fishGroup = this.add.group();
    this.questionText = this.add.text(350, 50, "", {
      fontSize: "28px",
      color: "#000",
      backgroundColor: "#fff",
      padding: 10
    }).setOrigin(0.5);

    loadNextQuestion.call(this);
  };


  const loadNextQuestion = function () {
    this.fishGroup.clear(true, true);

    if (this.hp <= 0) {
      ElMessage.error("游戏失败，重新开始");
      this.hp = 3;
      this.successCount = 0;
      this.currentQuestionIndex = 0;
      this.questionQueue = [...props.GameFishingJsonArray];
    }

    if (this.successCount >= this.maxTries) {
      ElMessage.success("钓鱼成功！");
      this.hp = 3;
      this.successCount = 0;
      this.currentQuestionIndex = 0;
      this.questionQueue = [...props.GameFishingJsonArray];
      return;
    }
    console.log(this.currentQuestionIndex)
    console.log(this.questionQueue)
    console.log(props.GameFishingJsonArray);
    const current = this.questionQueue[this.currentQuestionIndex];
    console.log(current);
    this.questionText.setText(current.question);

    const positions = [150, 300, 450, 600];
    Phaser.Utils.Array.Shuffle(positions);

    current.answers.forEach((ans, i) => {
      const x = positions[i];
      const y = 500;
      const fishKey = `fish_${this.currentQuestionIndex}_${i}`;

      const fish = this.add.image(x, y, fishKey).setInteractive();
      const text = this.add.text(x, y, ans, {
        fontSize: "20px",
        color: "#fff"
      }).setOrigin(0.5);

      fish.on("pointerdown", () => {
        if (ans === current.correct) {
          ElMessage.success("鱼上钩了！");
          this.successCount++;
        } else {
          ElMessage.warning("鱼脱钩了！");
          this.hp--;
          this.questionQueue.push(current);
        }

        this.currentQuestionIndex++;
        if (this.currentQuestionIndex >= this.questionQueue.length) {
          this.currentQuestionIndex = 0;
        }

        loadNextQuestion.call(this);
      });

      this.fishGroup.add(fish);
      this.fishGroup.add(text);
    });

    const bubbleKey = current.bubbleImage ? `bubble_${this.currentQuestionIndex}` : "defaultBubble";
    const bubble = this.add.image(100, 120, bubbleKey);
    const questionText = this.add.text(100, 120, current.question, {
      fontSize: "24px",
      color: "#000"
    }).setOrigin(0.5);

    this.fishGroup.add(bubble);
    this.fishGroup.add(questionText);
  };



  const config = {
    type: Phaser.AUTO,
    width: 700,
    height: 600,
    parent: gameContainer.value,
    scene: {
      preload,
      create
    }
  };

  game = new Phaser.Game(config);
});
</script>

<style scoped>
.game-container {
  width: 700px;
  height: 600px;
  position: relative;
}

.phaser-container {
  width: 100%;
  height: 100%;
}
</style>
