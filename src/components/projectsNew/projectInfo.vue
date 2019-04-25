<template>
  <div id="projectInfo">
    <!-- 搜索 -->
    <div class="section-search mb20 mt20">
      <el-row>
        <div class="fl mr20 mb20">
          <span class="c6">项目名称：</span>
          <el-input v-model="value" size="mini" clearable style="width:calc(100% - 100px);"></el-input>
        </div>
        <div class="fl mr20 mb20">
          <span class="c6">合同编号：</span>
          <el-input v-model="value1" size="mini" clearable style="width:calc(100% - 100px);"></el-input>
        </div>
        <div class="fl mr20 mb20">
          <span class="c6">导入日期：</span>
          <el-date-picker
            clearable style="width:calc(100% - 100px);"
            v-model="value2"
            type="datetimerange"
            format="yyyy-MM-dd"
            align="right"
            range-separator="-"
            :picker-options="pickerOptions"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
           size="mini">
          </el-date-picker>
        </div>
        <el-button type="primary" size="mini" icon="el-icon-search" class="fl" @click="searchCheck"></el-button>
      </el-row>
      <hr>
    </div>

    <!-- 表格 -->
    <div class="projectInfo_table">

      <!-- 内容 -->
      <el-table :data="tableData.content" border style="width: 100%;font-size:12px;" class="mt20 mb20" tooltip-effect="light"
                header-cell-class-name="header_cell table_header_shadow">
        <el-table-column fixed="left" type="index" label="序号" width="60" align="center" :index="(index) => this.$indexS(index, currentPage, size)"></el-table-column>

        <el-table-column prop="projectName" label="项目名称" width="120" align="center" :show-overflow-tooltip="tooltip"></el-table-column>

        <!--<el-table-column fixed label="制品图片" height="60" align="center">-->
        <!--<template slot-scope="scope">-->
        <!--<img :src="scope.row.imageUrl" alt="图片">-->
        <!--</template>-->
        <!--</el-table-column>-->

        <el-table-column prop="mouldNumber" label="模具数量" width="100" align="center"></el-table-column>

        <el-table-column prop="createTime" label="导入时间" width="160" align="center"></el-table-column>
        <el-table-column prop="createProjectNo" label="已分配模具" width="160" align="center"></el-table-column>

        <el-table-column prop="customerName" label="客户公司名称" width="120" align="center" :show-overflow-tooltip="tooltip"></el-table-column>
        <el-table-column prop="contractNo" label="合同编号" width="120" align="center"></el-table-column>

        <el-table-column prop="salesDept" label="销售负责人" width="100" align="center" :show-overflow-tooltip="tooltip"></el-table-column>

        <el-table-column prop="salesTelephone" label="销售联系方式" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="t1Date" label="T1时间" width="100" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button class="underline" type="text" @click="$setVuex('/projectInfoDetail', 'projectInfoDetail', scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @current-change="handleCurrentChange"
                     :current-page="currentPage" :page-size="size"
                     layout="total, prev, pager, next"
                     :total="tableData.totalCount" v-if="tableData.totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { Message, MessageBox, Loading } from 'element-ui';
  /** 导入api.js */
  import {queryProjectInformation,} from '../../axios/api.js'

  export default {
    name: "projectInfo",
    created: async function() {
      this.getInfo();
    },
    methods: {
      //接口调用
      async getInfo() {
        let params = {
          page: this.currentPage,
          size: this.size,
        };
        if(this.value) {
          params.projectName = this.value;
        }
        if(this.value1) {
          params.contractNo = this.value1;
        }
        if(this.value2) {
          params.createTime1 = this.value2[0];
          params.createTime2 = this.value2[1];
        }
        let res = await queryProjectInformation(params);
        if(res.status === 1) {
          this.tableData = res.msg;
        }
      },

      searchCheck() {
        this.getInfo();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getInfo();
      },
    },
    data() {
      return {
        currentPage: 1,
        size: 10,
        //搜索
        value: '',
        value1: '',
        value2: [],  //返回值是一个数组，每一项都是时间对象（标准时间），可以通过change事件获取
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        tableData: {
          content: [
            {
              // projectName: 'MAS861--9087766',
              // 1: '5',
              // 2: '2019-1-20 12:30',
              // 3: '芜湖市常春汽车内饰件有限公司',
              // 4: 'MHT201812163',
              // 5: '注塑模具',
              // 6: '2019-05-24',
              // 7: '0553-5815222',
              // 8: 'huzhenhe@caip.com.cn',
            }
          ],
          totalCount: 22,
        },

        //设置上传时的token
        // importHeaders: {
        //   Authorization: localStorage.getItem('token'),
        // },

        //是否开启tooltip
        tooltip: true,
      }
    },
  }
</script>

<style scoped>

</style>

<style>
  @import "../../style/common.css";
</style>
