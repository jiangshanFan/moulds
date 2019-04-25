<template>
  <div id="productPlanTableIndex">
    <div v-if="ifShow">
      <!-- 搜索 -->
      <div class="section-search mb20 mt20">
        <el-row>
          <div class="fl mr20">
            <span>项目名称：</span>
            <el-input v-model="value1" size="mini" clearable style="width:calc(100% - 70px);"></el-input>
          </div>
          <div class="fl mr20">
            <span>模具编号：</span>
            <el-input v-model="value" size="mini" clearable style="width:calc(100% - 70px);"></el-input>
          </div>
          <el-button type="primary" size="mini" icon="el-icon-search" class="fl" @click="search"></el-button>
          <!--</el-col>-->
        </el-row>
      </div>

      <hr class="border_solid_bottom_c">
      <!-- 试模统计 -->
      <div class="items mt20" style="padding-left:30px;">
        <!--<el-tag type="info">试模统计：</el-tag>-->
        <el-table :data="table.content" border  max-height="800" stripe style="width: 100%;margin-top:30px;"
                  header-cell-class-name="header_cell table_header_shadow" tooltip-effect="light" :cell-style="cellStyle">
          <el-table-column fixed type="index" label="序号" width="60" align="center" :index="(index) => this.$indexS(index, currentPage, size)"></el-table-column>
          <el-table-column prop="projectName" label="项目名称" width="160" align="center"></el-table-column>

          <el-table-column prop="mouldNo" label="模具编号" width="160" align="center"></el-table-column>
          <el-table-column prop="partName" label="制品名称" width="180" align="center" :show-overflow-tooltip="tooltip"></el-table-column>
          <el-table-column prop="contractNo" label="合同编号" width="160" align="center"></el-table-column>
          <el-table-column prop="customerName" label="客户公司名称" align="center" :show-overflow-tooltip="tooltip"></el-table-column>
          <el-table-column prop="updateTime" label="修改时间" align="center" width="100" show-overflow-tooltip></el-table-column>

          <el-table-column fixed="right" label="操作" width="60" align="center">
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
    <router-view></router-view>
  </div>
</template>

<script>
  import { Message } from 'element-ui'
  /** 导入api.js */
  import {queryProcessTable,} from '../../axios/api.js'
  export default {
    name: "productPlanTableIndex",
    created: async function () {
      this.ifShow = true;
      this.getInfo();
    },

    methods: {
      //获取表格数据
      async getInfo() {
        let params = {
          page: this.currentPage,
          size: this.size,
        };

        if(this.value) {
          params.mouldNo = this.value;
        }
        if(this.value1) {
          params.projectName = this.value1;
        }

        let res = await queryProcessTable(params);
        if(res.status === 1) {
          this.table = res.msg;
        }
      },
      //搜索表格
      search() {
        this.currentPage = 1;
        this.getInfo();
      },

//点击页码调用列表接口
      async handleCurrentChange(val) {
        this.currentPage = val;
        this.getInfo();
        console.log(`当前页: ${val}`);
      },

      //点击查看按钮跳转
      handleClick(row) {
        this.$store.dispatch('itemCheck_item',row);
        this.$router.push('/productPlan/productPlanTable');
      },
    },
    data() {
      return {
        ifShow: true,

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
      }
    }
  }
</script>

<style scoped>

</style>
