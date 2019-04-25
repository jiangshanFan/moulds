<template>
    <div id="testMould">
      <el-button type="primary" plain class="el-button_plain_mini" @click="$goback">返回</el-button>

      <hr class="border_solid_bottom_c">
      <!-- 试模统计 -->
      <div class="items mt20" style="padding-left:30px;">
        <!--<el-tag type="info">试模统计：</el-tag>-->
        <el-table :data="table.content" border  max-height="800" stripe style="width: 100%;margin-top:30px;"
                             header-cell-class-name="header_cell table_header_shadow" tooltip-effect="light" :cell-style="cellStyle">
        <el-table-column fixed type="index" label="序号" width="60" align="center" :index="(index) => this.$indexS(index, currentPage, size)"></el-table-column>
        <el-table-column prop="testModeCause" label="试模次数/Tn" width="100" align="center"></el-table-column>
        <el-table-column prop="testModeTime" label="模具到达/试模时间" width="100" align="center"></el-table-column>
        <el-table-column prop="projectName" label="项目名称" width="180" align="center"></el-table-column>
        <el-table-column prop="mouldNo" label="模具编号" width="100" align="center"></el-table-column>
        <el-table-column prop="partName" label="制品名称" width="90" align="center" :show-overflow-tooltip="tooltip"></el-table-column>
        <el-table-column prop="board" label="机台" width="70" align="center"></el-table-column>
        <el-table-column prop="material" label="材料" width="70" align="center" :show-overflow-tooltip="tooltip"></el-table-column>
        <el-table-column prop="colour" label="颜色" align="center" width="60" show-overflow-tooltip></el-table-column>
        <el-table-column prop="debugDuration" label="试模时长（小时）" align="center" width="82"></el-table-column>
        <el-table-column prop="qty" label="数量PCS/套" width="100" align="center"></el-table-column>
        <!--<el-table-column prop="planTestModeTime" label="计划试模时间" width="100"></el-table-column>-->

        <!--<el-table-column prop="debugStartTime" label="调试开始时间"></el-table-column>-->
        <!--<el-table-column prop="debugEndTime" label="调试终止时间"></el-table-column>-->

        <!--<el-table-column prop="operator" label="操作人"></el-table-column>-->
        <el-table-column prop="projectManager" label="项目负责人" align="center" width="91"></el-table-column>
        <!--<el-table-column prop="orNotTestMode" label="是否试模"></el-table-column>-->
        <el-table-column prop="finishQty" label="完成数量" align="center" width="80" show-overflow-tooltip></el-table-column>
        <el-table-column prop="rejectsQty" label="不良数量" align="center" width="80" show-overflow-tooltip></el-table-column>

        <el-table-column prop="productQty" label="生产数量" align="center" width="80" show-overflow-tooltip></el-table-column>
        <!--<el-table-column prop="yieldRate" label="达成率"></el-table-column>-->
        <el-table-column prop="taskRemark" label="备注" align="center" :show-overflow-tooltip="tooltip"></el-table-column>
        <el-table-column fixed="right" label="详情" width="60" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" size="small" type="text" class="underline">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
      <div class="pagination fr ovw-h mt20">
        <el-pagination @current-change="handleCurrentChange"
                       :current-page="currentPage" :page-size="size"
                       layout="total, prev, pager, next"
                       :total="table.totalCount" v-if="table.totalCount">
        </el-pagination>
      </div>
    </div>
</template>

<script>
  import { Message } from 'element-ui';
  /** 导入api.js */
  import {getTestMouldInfoList,} from '../../axios/api.js'
  export default {
    name: "testMould",
    created: async function() {
      let params = {page: 1, size: this.size, mark: 1};
      if(this.$store.getters.itemCheck_item.mouldNo) {
        params.mouldNo = this.$store.getters.itemCheck_item.mouldNo;
      }
//调用试模统计列表接口
      let res = await getTestMouldInfoList(params);
      if(res.status === 1) {
        this.table = res.msg;
        if(!this.table.content.length) {
          this.$message({showClose: true, type: 'warning', message: '暂无数据！！！'})
        }
      }
    },


    // beforeRouteLeave (to, from, next) {
    //   // 导航离开该组件的对应路由时调用
    //   // 可以访问组件实例 `this`
    //   if(to.path !== '/testMouldDetail') {
    //     this.$store.dispatch('itemCheck_item',{});
    //   }
    //
    //   console.log(to.path);
    //   next();
    // },

    methods: {
//点击页码调用列表接口
      async handleCurrentChange(val) {
        this.currentPage = val;
        let params = {page: val, size: this.size, mark: 1};
        if(this.$store.getters.itemCheck_item.mouldNo) {
          params.mouldNo = this.$store.getters.itemCheck_item.mouldNo;
        }

        let res = await getTestMouldInfoList(params);
        if(res.status === 1) {
          this.table = res.msg;
        }
        console.log(`当前页: ${val}`);
      },

//点击查看详情
      handleClick(row) {
        this.$store.dispatch('itemCheck_testMouldDetail',row);
        this.$router.push('/testMouldDetail');
      }
    },
    data() {
      return {
        currentPage: 1,
        value: '',
        value1: '',

        cellStyle: {
          maxHeight: '50px !important',
        },

        tooltip: true,
        // router: this.$router,

        size: 10,

        //表格数据
        table: {},

        //是否显示返回按钮
        testMould_ifAll: true,
      }
    }
  }
</script>

<style>
  @import "../../style/common.css";
</style>
