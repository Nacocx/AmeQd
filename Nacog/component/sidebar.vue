<template>
  <el-aside width="350px" id="sidebar">
    <el-progress
      :text-inside="true"
      :stroke-width="26"
      :percentage="percentage"
    ></el-progress>
    <span>已作答:{{ answeredCount }}题</span>
    <span>剩余:{{ totalTm }}题</span>
    <p v-for="(value, key) in studentInfo" :key="key">{{ key }}:{{ value }}</p>
    <!--侧边栏之后可以像学习通一样显示题目作答情况  -->
  </el-aside>
</template>

<script>
const sidebar = {
  props: {
    studentInfo: {
      type: Object,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
    totalTm: {
      type: Number,
      required: true,
    },
    answeredCount: {
      type: Number,
      required: true,
    },
  },
};
module.exports = sidebar;
</script>
