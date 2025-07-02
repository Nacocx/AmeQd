<template>
  <template v-if="isInVideo">
    <span style="font-size: large;">下面请小朋友自己动手做一做吧 </span>
    <img src="../static/static2/assets/laba.png" alt="" class="laba" @click="playAudio(0, $event)"
         @touchend="playAudio(0, $event)">
  </template>
  <hr>
  <!-- part1_选择题 -->
  <xzt :questions="questions.xzt" v-if="questions.xzt && questions.xzt.length" />
  <!-- part2_填空题 -->
  <tkt :all-questions="questions.tkt" v-if="questions.tkt && questions.tkt.length" />
  <!-- 涂画题 部分 -->
  <template v-if="questions.tht">
    <tht :items="questions.tht.items" :tuxing-path="questions.tht.tuxingpath"
         :another="questions.tht.another" />
  </template>
  <!-- 画图题 部分 -->
  <template v-if="questions.htt && questions.htt.length">
    <div v-for="htt in questions.htt" :key="htt">
      <htt :message="htt" />
    </div>
  </template>

  <!-- htt_tuo 部分 -->
  <template v-if="questions.htt_tuo && questions.htt_tuo.length">
    <div v-for="htt_tuo in questions.htt_tuo" :key="htt_tuo">
      <htt_tuo :message="htt_tuo" />
    </div>
  </template>

  <!-- lxt 部分 -->
  <template v-if="questions.lxt && questions.lxt.length">
    <div v-for="lxt in questions.lxt" :key="lxt">
      <lxt :message="lxt" />
    </div>
  </template>

  <!-- sst 部分 -->
  <template v-if="questions.sst && questions.sst.length">
    <div v-for="sst in questions.sst" :key="sst">
      <sst :item="sst" />
    </div>
  </template>

  <!-- qst 部分 -->
  <template v-if="questions.qst && questions.qst.length">
    <div v-for="qst in questions.qst" :key="qst">
      <qst :message="qst" />
    </div>
  </template>

  <!-- lzt 部分 -->
  <template v-if="questions.lzt && questions.lzt.length">
    <div v-for="lzt in questions.lzt" :key="lzt">
      <lzt :message="lzt" />
    </div>
  </template>

  <pyt v-if="questions.pyt && questions.pyt.length" :pinyin-data="questions.pyt" />


</template>
<script>

import {defineComponent} from "vue";
import Htt from "@/components/htt.vue";
import Sst from "@/components/sst.vue";
import Tht from "@/components/tht.vue";
import xzt from "@/components/xzt.vue";
import tkt from "@/components/tkt.vue";
import pyt from "@/components/pyt.vue";
import Qst from "@/components/qst.vue";
import Lzt from "@/components/lzt.vue";
import Htt_tuo from "@/components/htt_tuo.vue";
import Lxt from "@/components/lxt.vue";

export default defineComponent({
  components: {Lxt, Htt_tuo, Lzt, Qst, pyt, tkt, xzt, Tht, Sst, Htt},
  props:{
    questions:{
      type: Object,
      required: true
    }
  }
})
</script>