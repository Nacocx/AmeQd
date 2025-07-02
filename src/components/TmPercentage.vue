<template>
  <span>整体对了{{ countTm.rightCnt }}题,正确率: <el-progress :percentage="countTm.allP" /></span>
  <span v-if="questions.xzt && questions.xzt.length">选择题对了{{ countTm.xzt.right }}题,正确率: <el-progress
      :percentage="countTm.xzt.percentage" /></span>
  <span v-if="questions.tkt && questions.tkt.length">填空题对了{{ countTm.tkt.right }}题,正确率: <el-progress
      :percentage="countTm.tkt.percentage" /></span>
  <span v-if="questions.lxt && questions.lxt.length">连线题对了{{ countTm.lxt.right }}题,正确率: <el-progress
      :percentage="countTm.lxt.percentage" /></span>
  <span v-if="questions.htt && questions.htt.length">画图题对了{{ countTm.htt.right }}题,正确率: <el-progress
      :percentage="countTm.htt.percentage" /></span>
  <span v-if="questions.htt_tuo && questions.htt_tuo.length">画图题对了{{ countTm.htt_tuo.right }}题,正确率: <el-progress
      :percentage="countTm.htt_tuo.percentage" /></span>
  <span v-if="questions.tht">涂画题对了{{ countTm.tht.right }}题,正确率: <el-progress
      :percentage="countTm.tht.percentage" /></span>
  <span v-if="questions.sst && questions.sst.length">数数题对了{{ countTm.sst.right }}题,正确率: <el-progress
      :percentage="countTm.sst.percentage" /></span>
  <span v-if="questions.qst && questions.qst.length">画圈题对了{{ countTm.qst.right }}题,正确率: <el-progress
      :percentage="countTm.qst.percentage" /></span>
  <span v-if="questions.lzt && questions.lzt.length">连字题对了{{ countTm.lzt.right }}题,正确率: <el-progress
      :percentage="countTm.lzt.percentage" /></span>
  <span v-if="questions.pyt && questions.pyt.length">拼音题对了{{ countTm.pyt.right }}题,正确率: <el-progress
      :percentage="countTm.pyt.percentage" /></span>
</template>

<script>
export default {
  props: {
    questions: {
      type: Object,
      required: true
    },countTm:{
      type: Object,
      required: true
    }
  }

}
</script>