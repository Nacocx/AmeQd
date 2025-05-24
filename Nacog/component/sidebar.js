const sidebar = {
  template: `
    <el-aside width="200px" id="sidebar">
        <p v-for="(value, key) in StudentInfo" :key="key">{{key}}:{{value}}</p>
        <!--侧边栏之后可以像学习通一样显示题目作答情况  -->                         
    </el-aside>
  `,
  data() {
    return {
      StudentInfo: {
        name: "Jack",
        class: "202",
        teacher: "Bob",
      },
    };
  },
  
};
