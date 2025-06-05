<template id="xzt">
  <div>
    <h1>选择题部分</h1>
    <div
      class="xzt_question-item"
      v-for="(question, index) in questions"
      :key="question.id"
    >
      <h2>第{{ index + 1 }}题: {{ question.title }}</h2>
      <img v-if="question.img" v-bind:src="question.img" class="tmImg" alt="Image Missing!"/>
      <div class="options">
        <el-radio-group v-model="question.userAnswer">
          <el-radio
            v-for="option in question.options"
            :key="option.value"
            :value="option.value"
            :name="'question_' + question.id"
          >
            <!-- 若有img，就渲染img，若无就渲染label -->
            <img v-if="option.img" :src="option.img" alt="Image Missing!"/>
            <span v-else style="font-size: 30px"
              >{{ option.value }}:{{ option.label }}</span
            >
          </el-radio>
        </el-radio-group>
      </div>

    </div>
    <br>
    <hr />
  </div>
</template>

<script>
export default  {
  name:'Xzt',
  props: {
    questions: {
      type: Array,
      required: true,
    },
  },

};

</script>
<style>
.el-radio__inner {
  transform: scale(1.22);
}
.xzt_question-item{
  width: 80%;
}
</style>