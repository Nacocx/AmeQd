const sidebar = {
  template: `
    <el-aside width="200px" id="sidebar">
        <p v-for="(value, key) in studentInfo" :key="key">{{key}}:{{value}}</p>
        <!--侧边栏之后可以像学习通一样显示题目作答情况  -->                         
    </el-aside>
  `,
  props: {
    studentInfo: {
      type: Object,
      required: true,
    }
  }
};
