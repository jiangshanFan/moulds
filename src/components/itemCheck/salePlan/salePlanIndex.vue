<template>
  <div id="salePlanIndex">
    <!--<div v-if="show">-->
      <!-- 搜索 -->
      <div class="section-search mb20 mt20">
        <el-row>
          <div class="fl mr20 mb20">
            <span>项目名称：</span>
            <el-input v-model="value" clearable size="mini" style="width:calc(100% - 100px);"></el-input>
          </div>
          <el-button type="primary" size="mini" icon="el-icon-search" class="fl" @click="searchCheck"></el-button>
        </el-row>
        <hr>
      </div>

      <div>
        <el-button type="primary" size="mini" plain @click="exportSalePlan">销售计划表导出</el-button>
        <el-table :data="table.content" border  max-height="800" size="small"
                  header-cell-class-name="header_cell table_header_shadow"
                  tooltip-effect="light"
                  style="width: 100%;margin-top:15px;">
          <el-table-column fixed type="index" label="序号" width="60" align="center" :index="(index) => this.$indexS(index, currentPage, size)"></el-table-column>
          <el-table-column fixed prop="contractNo" label="合同号" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column fixed prop="mouldNo" label="模具编号" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="mouldReachCountry" label="模具到达国家" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="customerName" label="客户名称" width="120" show-overflow-tooltip></el-table-column>

          <el-table-column prop="projectName" label="项目名称" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="projectDept" label="项目部门" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="projectManager" label="项目经理" width="80" show-overflow-tooltip></el-table-column>
          <el-table-column prop="saleManager" label="销售经理" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="makeFactory" label="加工工厂" width="80" show-overflow-tooltip></el-table-column>
          <el-table-column prop="projectStartPlan" label="项目启动计划日期" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="projectStartFinish" label="项目启动实际时间" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="projectStartReport" label="项目启动报告日期" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="contractReviewPlan" label="合同评审表计划日期" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="contractReviewFinish" label="合同评审表实际时间" width="100" show-overflow-tooltip></el-table-column>

          <el-table-column label="合同审批表是否准时" width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.contractReviewPlan && scope.row.contractReviewFinish ?scope.row.contractReviewPlan < scope.row.contractReviewFinish? '是' : '否' :''}}</span>
            </template>
          </el-table-column>
          <el-table-column label="FMEA" width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.fmea === 1? '是' : scope.row.fmea === 0? '否' : scope.row.fmea === -1? 'NA' : ''}}</span>
            </template>
          </el-table-column>

          <el-table-column label="第一次传图是否满足需求" width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.firstUploadPic? '是' : scope.row.firstUploadPic === false? '否' : ''}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="steelOrderConfirmationPlan" label="订料确认计划日期" width="100" show-overflow-tooltip></el-table-column>

          <el-table-column prop="steelOrderConfirmationFinish" label="订料确认实际时间" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="roughMillingApprovalPlan" label="加工确认计划日期" width="100" show-overflow-tooltip></el-table-column>

          <el-table-column prop="roughMillingApprovalFinish" label="加工确认实际时间" width="100" show-overflow-tooltip></el-table-column>

          <el-table-column prop="t0Plan" label="T0计划日期" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="t0Finish " label="T0实际时间" width="100" show-overflow-tooltip></el-table-column>

          <el-table-column prop="t1Plan" label="T1计划日期" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="t1Finish" label="T1实际时间" width="100" show-overflow-tooltip></el-table-column>

          <el-table-column prop="t2Plan" label="T2计划日期" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="t2Finish" label="T2实际时间" width="100" show-overflow-tooltip></el-table-column>

          <el-table-column prop="t3Plan" label="T3计划日期" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="t3Finish" label="T3实际时间" width="100" show-overflow-tooltip></el-table-column>

          <el-table-column prop="t4Plan" label="T4计划日期" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="t4Finish" label="T4实际时间" width="100" show-overflow-tooltip></el-table-column>

          <el-table-column prop="t5Plan" label="T5计划日期" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="t5Finish" label="T5实际时间" width="100" show-overflow-tooltip></el-table-column>

          <el-table-column prop="moldDepartureFromBasisPlan" label="走模计划日期" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="moldDepartureFromBasisFinish" label="走模实际时间" width="100" show-overflow-tooltip></el-table-column>

          <el-table-column prop="finalValidationPlan" label="终检验收单计划日期" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="finalValidationFinish" label="终检验收单实际时间" width="100" show-overflow-tooltip></el-table-column>

          <el-table-column prop="invoicePlan" label="开票日期计划日期" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="invoiceFinish" label="开票日期实际时间" width="100" show-overflow-tooltip></el-table-column>

          <el-table-column fixed="right" label="是否实现销售" width="60" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.saleOrNot? '是' : scope.row.saleOrNot === false? '否' : ''}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" prop="remark" label="备注" width="100" show-overflow-tooltip></el-table-column>

          <el-table-column label="操作" width="60" fixed="right">
            <template slot-scope="scope">
              <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination fr ovw-h mt20">
          <el-pagination @current-change="handleCurrentChange"
                         :current-page="currentPage" :page-size="size"
                         layout="total, prev, pager, next"
                         :total="table.totalCount" v-if="table.totalCount">
          </el-pagination>
        </div>
      </div>
    <!--</div>-->
    <!--<router-view v-if="!show"></router-view>-->
  </div>
</template>

<script>
  import { Message } from 'element-ui'
  /** 导入api.js */
  import {getSalePlanList,salesPlanDetailsExport} from '../../../axios/api.js'
  export default {
    name: "salePlanIndex",
    // beforeRouteEnter (to,from,next) { //防止刷新时重置this.show的值
    //   next(vm => {
    //     // 通过 `vm` 访问组件实例
    //     if (to.path !== '/salePlan') {
    //       vm.show = false;
    //       next();
    //     } else {
    //       vm.show = true;
    //       next();
    //     }
    //   });
    //
    // },
    // beforeRouteUpdate (to,from,next) { //更新路由时更改this.show的值
    //   if(to.path !== '/salePlan') {
    //     this.show = false;
    //     next();
    //   }else {
    //     this.show = true;
    //     this.getInfo(); //更新路由时更新列表的数据
    //     next();
    //   }
    // },
    created() {
      this.getInfo();
    },
    methods: {
//导出销售计划表
      async exportSalePlan() {
        let res = await salesPlanDetailsExport();
        Message({showClose: true, type: 'success', message: '导出成功！'})
      },
//获取表格数据
      async getInfo() {
        let params = {
          page: this.currentPage,
          size: this.size,
        };

        if(this.value) {
          params.projectName = this.value;
        }
        let res = await getSalePlanList(params);
        if(res.status === 1) {
          this.table = res.msg;
        }
      },
//搜索表格
      searchCheck() {
        this.currentPage = 1;
        this.getInfo();
      },

//点击页码调用列表接口
      async handleCurrentChange(val) {
        this.currentPage = val;
        this.getInfo();
        console.log(`当前页: ${val}`);
      },

      //跳转编辑
      edit(row) {
        this.$store.dispatch('salePlan',row);
        this.$router.push('/salePlan/salePlanEdit');
      },
    },
    data() {
      return {
        //搜索
        value: '',
        //表格数据
        table: {
          content: [
            {}
          ],
        },
        currentPage: 1,
        size: 10,
        //点击详情时隐藏当前的组件
        show: true,
      }
    }
  }
</script>

<style scoped>

</style>
