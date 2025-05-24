const xzt = {
  template: `
   <div>
    <h1>选择题部分</h1>
    <div
      class="question-item"
      v-for="(question, index) in questions"
      :key="question.id"
    >
      <h2>第{{ index + 1 }}题: {{ question.title }}</h2>
      <img v-if="question.img" v-bind:src="question.img" class="tmImg" />
      <div class="options">
        <el-radio-group v-model="question.selected">
          <el-radio
            v-for="option in question.options"
            :key="option.value"
            :label="option.value"
            :name="'question_' + question.id"
          >
            <!-- 若有img，就渲染img，若无就渲染label -->
            <img v-if="option.img" :src="option.img" />
            <span v-else style="font-size: 30px"
              >{{ option.value }}:{{ option.label }}</span
            >
          </el-radio>
        </el-radio-group>
      </div>
    </div>
    <hr />
  </div>
  
  `,
  props: {
    questions: {
      type: Array,
      required: true,
    },
  },
};
