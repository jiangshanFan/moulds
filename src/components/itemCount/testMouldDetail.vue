<template>
    <div id="testMouldDetail">
      <el-button type="primary" size="mini" @click="$goback">返回</el-button>
      <!-- 试模统计 -->
      <div style="width:1080px;overflow: hidden;">
        <div class="items mt20" style="padding-left:30px;">
          <el-tag type="info">试模详情：</el-tag>
          <el-table :data="tableData" border  max-height="800" size="small" :cell-style="cellStyle" style="width: 1080px;margin-top:30px;">
            <el-table-column prop="mouldNo" label="模号(MBS)" width="180"></el-table-column>
            <el-table-column prop="projectName" label="项目名称" width="180"></el-table-column>
            <el-table-column prop="partName" label="制品名称" width="180"></el-table-column>
            <el-table-column prop="date" label="日期" width="180"></el-table-column>
            <el-table-column prop="board" label="机台" width="180"></el-table-column>
            <el-table-column prop="holeCount" label="穴数"></el-table-column>
          </el-table>
          <el-table :data="tableData" border  max-height="800" size="small" :cell-style="cellStyle" style="width: 1080px;">
            <el-table-column prop="material" label="材料" width="180"></el-table-column>
            <el-table-column prop="colour" label="颜色" width="180"></el-table-column>
            <el-table-column prop="debugStartTime" label="调试开始时间" width="180"></el-table-column>
            <el-table-column prop="debugEndTime" label="调试终止时间" width="180"></el-table-column>
            <el-table-column prop="debugDuration" label="试模时长(小时)" width="180"></el-table-column>
            <el-table-column prop="startingUpNumOfPeople" label="开机人数"></el-table-column>
          </el-table>
          <el-table :data="tableData" border  max-height="800" size="small" :cell-style="cellStyle" style="width: 1080px;">
            <el-table-column prop="testMouldCause" label="试模原因" width="180"></el-table-column>
            <el-table-column prop="planQty" label="计划数量" width="180"></el-table-column>
            <el-table-column prop="rejectsQty" label="不良数" width="180"></el-table-column>
            <el-table-column prop="finishQty" label="完成数量" width="180"></el-table-column>
            <el-table-column prop="productQty" label="生产数量" width="180"></el-table-column>
            <el-table-column prop="yieldRate" label="达成率"></el-table-column>
          </el-table>
          <el-table :data="tableData" border  max-height="800" size="small" :cell-style="cellStyle" style="width: 1080px;">
            <el-table-column prop="makeModeGroupLeader" label="制模组长" width="180"></el-table-column>
            <el-table-column prop="orNotTestMode" label="是否试模" width="180"></el-table-column>
            <el-table-column prop="operator" label="操作员" width="180"></el-table-column>
            <el-table-column prop="projectManager" label="项目负责人" width="180"></el-table-column>
            <el-table-column prop="taskRemark" label="备注"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "testMouldDetail",
    created() {
      this.tableData[0] = this.$store.getters.itemCheck_testMouldDetail;
    },

    // beforeRouteLeave (to, from, next) {
    //   // 导航离开该组件的对应路由时调用
    //   // 可以访问组件实例 `this`
    //   if(to.path !== '/testMould') {
    //     this.$store.dispatch('itemCheck_item',{});
    //   }
    //
    //   console.log(to.path);
    //   next();
    // },

    methods: {
      // goto() {
      //   this.$router.push({path: '/testMould', query: {isMouldNo: true,}})
      // }
    },
    data() {
      return {
        cellStyle: {height: '40px',},//修改表格样式
        currentPage: 1,
        tableData: [],
      }
    }
  }
</script>

<style scoped>

</style>
